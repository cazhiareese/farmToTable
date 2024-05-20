import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useOutletContext } from 'react-router';
import AddStock from '../../components/AddStock';
import DeleteProduct from '../../components/DeleteProduct';
export default function Inventory(){

    let filters = {
        orderBy : 1,
        sortBy: 'name'
    }
   
    const [selectedOption, setSelectedOption] = useState(filters.sortBy);
    const [ products, setProducts ] = useState([])
    const [sorter, setSort] = useState(filters)
    const [activeProduct, setActiveProduct] = useState(null);
    const [activeDelete, setActiveDelete] = useState(null);
    

    useEffect(() => {    
        handleFilter(filters)    
        
    },[])

    const handleAddStockClick = (productId) => {
        setActiveProduct(productId);
    };

    const handleCloseAddStock = () => {
        setActiveProduct(null);
    }

    const handleDelete = (productId) => {
        setActiveDelete(productId);
    };

    const handleCloseDelete = () => {
        setActiveDelete(null);
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

    function handleFilterChange(filter){

        var newSorter = {...sorter, sortBy: filter}
        setSort(newSorter)
        handleFilter(newSorter)
    }
    function handleType(type) {
        if (type === 1){
            return 'Crop'
        }else if (type === 2){
            return 'Poultry'
        }
    }



    return(
        <div className="inventory-container">
            <div className="row">

                <h1>Inventory</h1>
                <div className='col-sm-6 col-md-6 col-lg-3'></div>
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
                        }}>Asc</button>
                    <button className='btn-sm' onClick={()=>{
                                var newSorter = {...sorter, orderBy:-1}
                                setSort(newSorter)
                                handleFilter(newSorter)
                    }}>Desc</button>
                </div>


                <Link to={`/admin/create-listing`}><button className='col-lg-3'>Create Listing</button></Link>
            </div>

            <div className='row'>
                {
                products.map((prod) =>{
                    return(
                    
                        <div  key= {prod._id} className='col-sm-6 col-md-4 col-lg-3' id={prod._id}>
                           
                            <img src = {prod.imageURL}></img>
                            <h4> {prod.name}</h4>
                            <h6> {handleType(prod.type)}</h6>
                            <h3> {prod.price}</h3>
                            <h3>Stock: {prod.stock}</h3>
                            <button onClick={() => handleAddStockClick(prod._id)}>Edit Stock</button>

                            
                            {activeProduct === prod._id && (
                                <div className='AddStock'>
                                <AddStock 
                                    id={prod._id} 
                                    stock={prod.stock} 
                                    setShow={handleCloseAddStock} 
                                    setFilter={handleFilter} 
                                    currentFilter={sorter}
                                />
                                </div>
                            )}
                            
                            <button onClick={()=> handleDelete(prod._id)}>Delete </button>
                            {activeDelete === prod._id && (
                                <div className='AddStock'>
                                <DeleteProduct 
                                    id={prod._id} 
                                    setShow={handleCloseDelete} 
                                    currentFilter={sorter}
                                    setFilter={handleFilter} 
                                />
                                </div>
                            )}
                        </div>
                   
                    )
                })
                }
            </div>
           
        </div>
    )
}