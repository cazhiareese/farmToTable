/**
 * This component manages and displays the user's shopping cart. It fetches cart items from the server,
 * allows sorting and filtering of the items, updates item quantities, and handles item removal.
 * It also provides functionality for selecting items for checkout and updates the total item count.
 */

import { useParams, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckOutForm from '../../components/checkOutForm';
import { Link } from 'react-router-dom';
import arrow from '../../icons/view_product_arrow.png';
import cart from '../../icons/orders_cart.png';
import trash from '../../icons/cart_trash.png';
import add from '../../icons/add.png';
import sub from '../../icons/sub.png';
import your from '../../images/cart_your_cart.png';

function Cart({updateTotalItems}) {
    const token = localStorage.getItem('token');
    const [userId, count, setCount] = useOutletContext();
    const [pushCart, setCart] = useState([]);
    const [totalItems, setVal] = useState(0);
    const [selectedList, setSelected] = useState([])
    const [newCart, setNew] = useState([])
    const [filter, setFilter] = useState([])
    const [order, setOrder] = useState([])


    const sort_by = (field, reverse) => {
        const key = function(x) {
            return x[field]
          };

        reverse = !reverse ? 1 : -1;
        return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
      }


    useEffect(() => {
        const token = localStorage.getItem('token');
        let url = `http://localhost:3001/getCart/`
        fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }}).then(response => response.json())
        .then(body => {
            setCart(body.cart)
            countItems(body.cart)
            setFilter('name')
            setOrder(false)
        })  
            
    }, [])

    useEffect(() =>{
        setCount(totalItems)
    }, [totalItems])

    useEffect(() => {
        handleNew(pushCart);
    }, [pushCart])
 

    function handleNew(cartChange){
        Promise.all(cartChange.map(added => {
            let url = `http://localhost:3001/getProduct/${added.productId}`;
            return fetch(url)
                .then(response => response.json())
                .then(body => ({
                    imageURL: body.imageURL,
                    productId: body._id,
                    name: body.name,
                    type: body.type,
                    stock: body.stock,
                    price: body.price,
                    qty: added.qty
                }));
        })).then(updatedCart => {
            setNew(updatedCart);    
        });
    }

    function handleCartChange(cart) {
        fetch('http://localhost:3001/updateCart',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({                   // authenticator dapat ang ipapasa ko ha
                    // userId: userId,
                    cart: cart
                })
            }).then(response => response.text())
            .then(body => {
                //console.log(body)

            })
    }

    function removeFromCart(id) {
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === id) {
                i = j
                break;
            }
        }
        setCart((currentCart) => {
            const updateCart = [...currentCart];

            for (let x = 0; x < selectedList.length; x++){
                if (updateCart[i].productId === selectedList[x].productId){
                    const selectedRemove = [...selectedList];
                    selectedRemove.splice(x,1)
                    setSelected(selectedRemove)
                }
            }
            updateCart.splice(i, 1)
            countItems(updateCart)
            handleCartChange(updateCart)
            handleNew(updateCart)
            return updateCart
        })
    }

    function handleQuantity(id, num) {
        
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === id) {
                i = j
                break;
            }
        }

        setCart((currentCart) => {
            let updateCart = [...currentCart];
            let gotRemoved = false;
            updateCart[i] = { ...updateCart[i], qty: updateCart[i].qty + num };

            
            if (updateCart[i].qty === 0) {    
                for (let x = 0; x<selectedList.length; x++){
                    if(updateCart[i].productId === selectedList[x].productId){
                        let selectRemove = [...selectedList]
                        selectRemove = selectRemove.filter((item) => item.productId !== updateCart[i].productId)
                        setSelected(selectRemove)
                    }
                }
                updateCart = updateCart.filter((item, index) => index !== i);
                gotRemoved = true
            }
           
            if (!gotRemoved){
            for (let x = 0; x<selectedList.length; x++){
                if(updateCart[i].productId === selectedList[x].productId){
                    handleSelectChange(x, updateCart[i])
                    break   
                }
            }}

            countItems(updateCart)
            handleNew(updateCart)
            handleCartChange(updateCart)
            return updateCart
        })
    }

    function handleSelectChange(x, itemUpdated){
        //console.log('enterThis?')
        let updateSelect = [...selectedList]
        let updator = {}
        for (let j = 0; j<newCart.length; j++){
            if(newCart[j].productId === itemUpdated.productId){
                //console.log(newCart[j].productId)
                updator = {...newCart[j], qty: itemUpdated.qty}
                //console.log(updator)
            }
        }

        updateSelect[x] = {...updateSelect[x], qty : updator.qty}
        setSelected(updateSelect)
    }

    function countItems(cart) {
        let newTotal = 0;
        cart.map((prod) => {
            newTotal += prod.qty;
        })
        setVal(newTotal)
    }

    const handleSelect = (event) => {
        const { value, checked } = event.target;
        
        //console.log(value)
        if (checked) {
          let checkedObject = {}

        newCart.forEach((prod) => {
            if (prod.productId === value){
                checkedObject = prod
            }
        })
        //console.log(checkedObject)
            
          setSelected([...selectedList, checkedObject]);
        } else {
          
          setSelected(selectedList.filter(item => item.productId !== value));
        }
      }

    function handlePrice (price, qty){
        return (price * qty)
    }

    return (
        <div className='bg-fttBg text-fttGreen font-Roboto pb-16 min-h-screen pt-6'>
        { totalItems !== 0 ?
        <div className=' justify-between px-16 flex'>
            <div className=' w-2/3 self-start left m-6'>
            <div className='flex justify-between items-center'>
                <div className=' w-2/4'>
                    <img className='inline-block h-14 mr-2 mt-6' src={cart}></img>
            <img className='inline-block h-10 mt-6' src={your}></img>
            {totalItems > 1 ? <p className='ml-4 mb-6'>{totalItems} items in your cart</p> 
            : <p className='ml-4 mb-6'>1 item in your cart</p>}</div>
            <div>
                <div className='mr-1 flex items-center'>
                <label >Sort by: </label>
                <select className='border mr-1 ml-2 py-3 px-4 font-medium border-fttGreen bg-fttBg rounded-full ' name="filters" id="filters"
                                onChange={e => {
                                    setFilter(e.target.value)
                                }}>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                </select>

                    <button className=' hover:border-fttGreen border-slate-500 border p-4 rounded-full mr-1' id="home-asc" onClick={()=>{
                                setOrder(false)
                                //console.log(newCart.sort(sort_by(filter,order)))
                        }}><svg width="16" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.27787 1.04679C7.67437 0.459683 8.53879 0.459683 8.93529 1.04679L15.3161 10.4949C15.7646 11.159 15.2888 12.0545 14.4874 12.0545L1.72579 12.0545C0.924383 12.0545 0.448551 11.159 0.897079 10.4949L7.27787 1.04679Z" fill="#074528"/>
                        </svg></button>

                    <button className='hover:border-fttGreen border-slate-500 border p-4 rounded-full'  id="home-desc" onClick={()=>{
                                setOrder(true)
                                //console.log(newCart.sort(sort_by(filter,order)))
                    }}><svg width="16" height="11" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.72213 11.5587C8.32563 12.1458 7.46121 12.1458 7.06471 11.5587L0.683919 2.11059C0.235391 1.44645 0.711223 0.55092 1.51263 0.55092L14.2742 0.550921C15.0756 0.550921 15.5515 1.44646 15.1029 2.11059L8.72213 11.5587Z" fill="#074528"/>
                    </svg>       
                        </button>
            </div>
            </div>
            </div>
            

           

            <div className="cart-items">
            {
            newCart.sort(sort_by(filter,order)).map((prod)=> {
                return(
                    <div key={prod.productId} className="border-fttGreen border rounded-lg bg-fttWhite justify-between items-center my-4 flex p-4">
                        <div className="cart-name flex items-center ">
                        <input className='ml-5 mr-7 rounded-md accent-fttGreen' type='checkbox' 
                        onChange={handleSelect}
                         value={prod.productId} ></input>
                        <div className=' flex justify-items-center'>
                        <img className=' mr-4 w-20 h-20 rounded float-left object-cover' src={prod.imageURL}></img>
                        <div className='leading-tight flex flex-col justify-center '>
                        <h2 className='font-medium'> {prod.name}</h2>
                        <p >PHP {new Intl.NumberFormat().format(prod.price)}</p></div>    
                        </div>            
                        </div>

                        {/* Handle quantity depending on button clicked by user */}
                        <div className="cart-qty flex justify-center">
                        <button  className="hover:shadow mx-2 rounded-xl px-2 " onClick={()=>handleQuantity(prod.productId,-1)}>
                        <img className='w-6' src={sub}></img>
                        </button>
                        <p>Qty: {prod.qty}</p>
                
                        <button className="hover:shadow mx-2 rounded-xl px-2" onClick={()=> handleQuantity(prod.productId,1)}>
                        <img  className='w-6' src={add}></img>
                        </button>
                        </div>

                        <p className='font-medium'>PHP {new Intl.NumberFormat().format(handlePrice(prod.price, prod.qty))}</p>
                        {/* Remove an item regardless of quantity */}
                        <div className="remove">
                        <button className=" hover:shadow mx-2 rounded-2xl p-2 mr-5"  onClick={() => removeFromCart(prod.productId)}>
                            <img className='w-6' src={trash}></img> </button>
                        </div>
                    </div>
                )
            })
            }
            </div>
            <button className='group mt-4 hover:shadow py-2 px-8 rounded-full'><Link className="" to={'/'}>
                <img className='ease-out delay-150 group-hover:-translate-x-1 inline-block h-4 mr-4' src={arrow}></img>Back to Homepage</Link></button>
            </div>

            <div className='transition ease-in-out duration-300 border-fttGreen border rounded-md m-2 flex w-1/3 h-fit mt-40 py-16 bg-fttWhite'>
                <CheckOutForm list_selected={selectedList} state_selected={setSelected} cart={pushCart} cart_state = {setCart} setVal = {setVal} userId ={userId} token={token}/>
            </div> 
            
        </div> : <div className='empty-cart'> <h1>Empty Cart! Shop more!</h1></div>

        }

        </div>
    )

}

export default Cart