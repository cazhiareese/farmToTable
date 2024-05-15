import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import add from '../icons/home_a_plus.png';
import basket from '../icons/home_a_basket.png';
import asc_a from '../icons/asc_active.png';
import desc_a from '../icons/desc_active.png';

function Home (props){


    let filters = {
        orderBy : 1,
        sortBy: 'name'
    }

    const [ products, setProducts ] = useState([])

    const [pushCart, setCart] = useState([]);
    
    const [sorter, setSort] = useState(filters)
    const [selectedOption, setSelectedOption] = useState(filters.sortBy);

    useEffect(() => {    
        handleFilter(filters)
    },[])


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

    function handleCartChange(cart){
        fetch('http://localhost:3001/updateCart',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        //   add tayo dito ng authenticator token
        },
        body: JSON.stringify({ 
                // authenticator dapat ang ipapasa ko ha
                userId: '6638db055b73b79302282273',
            cart : cart
        })
      }).then(response => response.text())
            .then(body => {
                console.log(body)
      })
    }

    // If a user clicks add to cart append it to the pushCart array and add a qty field.
    //If it's already in the array, incement the qty. 
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
                
                handleCartChange(updateCart)
                return updateCart
            })
        }

        
    }

    

    return(
        <div className='main-div'>
            <div className='row'>
                <h1>Shop agri products with us.</h1>
                <p>Shop for more agri deals now and make a difference. transactions between farmers and customers directly. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>

                <div className='icons'>
                    <ul className='descriptors'>
                        <li>Fresh Products</li>
                        <li>Sustainable</li>
                        <li>SupportLocalFarmers</li>
                    </ul>
                </div>
            </div>

            <div className='row'>
            
                <div className='col-sm-6 col-md-6 col-lg-6'></div>
                <div className='col-sm-3 col-md-3 col-lg-3'>
                <label>Sort by: </label>
                <select name="filters" id="filters" value={selectedOption}
                                onChange={e => {
                                    setSelectedOption(e.target.value)
                                    handleFilterChange(e.target.value)
                                }}>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                </select>
                </div>
                <div className='col-sm-3 col-md-3 col-lg-3'>
                    <button className='btn-sm' onClick={()=>{
                                var newSorter = {...sorter, orderBy:1}
                                setSort(newSorter)
                                handleFilter(newSorter)
                        }}><img src={asc_a}></img></button>
                    <button className='btn-sm' onClick={()=>{
                                var newSorter = {...sorter, orderBy:-1}
                                setSort(newSorter)
                                handleFilter(newSorter)
                    }}><img src={desc_a}></img></button>
                </div>
            </div>
            
            <div className='row'>
                {
                products.map((prod) =>{
                    return(
                    
                        <div  key= {prod._id} className='col-sm-6 col-md-4 col-lg-3' id={prod._id}>
                            <Link  to={`/products/${prod._id}`}>
                            <img src = {prod.imageURL}></img>
                            <h4> {prod.name}</h4>
                            </Link>
                            <h6> {handleType(prod.type)}</h6>
                            <h3> {prod.price}</h3>
                           
                            <button onClick={()=> addToCart({productId : prod._id})} class="add_cart_button"><img class= "home_add_cart" src={add}></img><img class= "home_add_cart" src={basket}></img></button> 
                        </div>
                   
                    )
                })
                }
            </div>

        </div>
    )
}

export default Home