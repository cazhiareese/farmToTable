import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cart from '../../icons/header_cart.png';
import add from '../../icons/home_a_plus.png';
import basket from '../../icons/home_a_basket.png';
import fresh from '../../icons/home_fresh_products.png';
import support from '../../icons/home_support.png';
import sustainable from '../../icons/home_sustainable.png';
import shop from '../../icons/home_shop.png';

function Home (props){
    let filters = {
        orderBy : 1,
        sortBy: 'name'
    }

    const [userId, count, setCount] = useOutletContext();
    const [ products, setProducts ] = useState([])
    const [pushCart, setCart] = useState([]);
    const [totalItems, setVal] = useState(0);
    const [sorter, setSort] = useState(filters)
    const [selectedOption, setSelectedOption] = useState(filters.sortBy);

    useEffect(() => {    
        handleFilter(filters)    
        
    },[])

    useEffect(() =>{
        fetchCart()
    }, [pushCart])

    useEffect(() =>{
        setCount(totalItems)
    }, [totalItems])

    function fetchCart (){
        let url = `http://localhost:3001/getCart/` + userId
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setCart(body.cart)
               countItems(body.cart)
            })
        }
    function handleFilter(sorter){
        let url = 'http://localhost:3001/products?sortBy='+sorter.sortBy+'&orderBy='+String(sorter.orderBy)
        console.log(url);
        fetch(url)
          .then(response => response.json())
          .then(body => {
            setProducts(body)
        })
    }

    function handleType(type) {
        if (type === 1){
            return 'Crop'
        }else if (type === 2){
            return 'Poultry'
        }
    }

    function handleFilterChange(filter){
        console.log(filter)
        console.log(typeof filter)
        var newSorter = {...sorter, sortBy: filter}
        setSort(newSorter)
        handleFilter(newSorter)
    }

    function countItems(cart) {
        let newTotal = 0;
        cart.map((prod) => {
            newTotal += prod.qty;
        })
        setVal(newTotal)
    }

    function handleCartChange(cart){

        console.log(cart)
        fetch('http://localhost:3001/updateCart',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            //   add tayo dito ng authenticator token
            },
            body: JSON.stringify({ 
                    // authenticator dapat ang ipapasa ko ha
                    userId: userId,
                    cart: cart

            })
        }).then(response => response.text())
                .then(body => {
                    console.log(body)
        })
    }

    function addToCart (prod)
    {       
        let i = 0;
        let found = false;
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === prod.productId) {
                found = true;
                i= j;
            break;
        }
        }       
        if (!found)
        {
            setCart( (pushCart) =>{
                const newCart = [...pushCart, {...prod, qty : 1}]
               
                handleCartChange(newCart)
                return newCart
            })

        }else
        {              
            setCart((pushCart) =>{
                const updateCart = [...pushCart];
                updateCart[i]  =  { ...updateCart[i], qty: updateCart[i].qty + 1}
                // console.log(updateCart)
                handleCartChange(updateCart)
                return updateCart
            })
        }

        
    }

    return(
        <div className='bg-fttWhite font-Roboto text-fttGreen shadow-md min-h-screen' >
            {/* FLOATING CART WIIIIIII */}
            <button className= 'hover:bg-green-900  hover:shadow-3xl p-4 bottom-4 right-6 bg-fttGreen/75 fixed rounded-full shadow-lg'>
                <Link className="link" to={`cart/${userId}`}>
                <img className='w-7 h-7 mr-1 inline-block' src={cart} id='header_cart'>
                </img><p className="inline-block  text-fttWhite">{count}</p></Link>
            </button>
            
            <div className='px-44 py-32 flex-col bg-fttShadow border-b-fttGreen border-3'>
                <div className='flex lg:flex-row flex-col'>
                <img src={shop} className='h-16 mr-10 mb-4 object-contain'></img>
                <p>Shop for more agri deals now and make a difference. transactions between farmers and customers directly. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>
                <div className='flex w-full mt-12'>
                    <ul className='flex lg:flex-row sm:flex-col justify-between w-full font-bold px-16'>
                        <li className='flex sm:my-2 flex-col items-center'> <img className="h-8 mb-1 mt-3" src={fresh}></img>Fresh Products</li>
                        <li className='flex sm:my-2 flex-col items-center'> <img className="h-8 mb-1 mt-3" src={sustainable}></img>Sustainable</li>
                        <li className='flex sm:my-2 flex-col items-center'> <img className="h-8 mb-1 mt-3" src={support}></img>Support Local Farmers</li>
                    </ul>
                </div>
            </div>

            <div className='flex justify-end px-56 my-10'>
                <div className='mr-1'>
                <label>Sort by: </label>
                <select className='border mr-1 ml-2 py-3 px-4 font-medium border-fttGreen rounded-full ' name="filters" id="filters" value={selectedOption}
                                onChange={e => {
                                    setSelectedOption(e.target.value)
                                    handleFilterChange(e.target.value)
                                }}>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                </select>

                    <button className=' hover:border-fttGreen border-slate-500 border p-4 rounded-full mr-1' id="home-asc" onClick={()=>{
                                var newSorter = {...sorter, orderBy:1}
                                setSort(newSorter)
                                handleFilter(newSorter)
                        }}><svg width="16" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.27787 1.04679C7.67437 0.459683 8.53879 0.459683 8.93529 1.04679L15.3161 10.4949C15.7646 11.159 15.2888 12.0545 14.4874 12.0545L1.72579 12.0545C0.924383 12.0545 0.448551 11.159 0.897079 10.4949L7.27787 1.04679Z" fill="#074528"/>
                        </svg></button>

                    <button className='hover:border-fttGreen border-slate-500 border p-4 rounded-full'  id="home-desc" onClick={()=>{
                                var newSorter = {...sorter, orderBy:-1}
                                setSort(newSorter)
                                handleFilter(newSorter)
                    }}><svg width="16" height="11" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.72213 11.5587C8.32563 12.1458 7.46121 12.1458 7.06471 11.5587L0.683919 2.11059C0.235391 1.44645 0.711223 0.55092 1.51263 0.55092L14.2742 0.550921C15.0756 0.550921 15.5515 1.44646 15.1029 2.11059L8.72213 11.5587Z" fill="#074528"/>
                    </svg>       
                        </button>
                </div>
            </div>
            
            <div className='grid lg:grid-cols-4 md:grid-cols-2 pb-32 gap-4 mx-20'>
                {
                products.map((prod) =>{
                    return(
                        <div  key= {prod._id} className=' rounded-md p-2 w-full overflow-hidden leading-tight ' id={prod._id}>
                            <Link  to={`/product/${prod._id}`}>
                            <img className= "w-full h-56 object-cover mb-2 rounded transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 " src = {prod.imageURL}></img>
                            <p className='font-medium text-2xl'> {prod.name}</p>
                            <p className='font-bold text-2xl '> PHP {prod.price}</p>
                            <p className='inline-block float-left'> {handleType(prod.type)}</p>
                            </Link>
                            <button className= "transition ease-in-out duration-300 hover:bg-green-800 hover:shadow-lg inline-block float-right bg-fttGreen w-14 rounded-3xl p-1.5" onClick={()=> addToCart({productId : prod._id})}>
                                <img className= "inline-block w-5" src={add}></img>
                                <img className= "inline-block w-5" src={basket}></img></button> 
                        </div>
                   
                    )
                })
                }
            </div>

        </div>
    )
}

export default Home