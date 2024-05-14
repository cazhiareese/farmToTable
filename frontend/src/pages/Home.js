import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import add from '../icons/home_a_plus.png';
import basket from '../icons/home_a_basket.png';
import asc_a from '../icons/asc_active.png';
import desc_a from '../icons/desc_active.png';

function Home (props){
    const [ products, setProducts ] = useState([])
    let filters = {
        orderBy : 1,
        sortBy: 'name'
    }

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

    return(
        <div className='main-div'>
            <div className='shop-welcome'>
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
                <div className='col-sm-1 col-md-1 col-lg-3'>
                <label>Sort by:</label>
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
                    <Link  key= {prod._id} className='item' to={`/products/${prod._id}`}>
                        <div  id={prod._id}>
                            <img src = {prod.imageURL}></img>
                            <h4> {prod.name}</h4>
                            <h6> {handleType(prod.type)}</h6>
                            <h3> PHP {prod.price}</h3>
                            <button class="add_cart_button"><img class= "home_add_cart" src={add}></img><img class= "home_add_cart" src={basket}></img></button>  
                        </div>
                    </Link>
                    )
                })
                }
            </div>

     </div>
    )
}

export default Home