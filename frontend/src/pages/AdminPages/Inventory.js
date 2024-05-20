import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
        <div className="bg-fttWhite w-full font-Roboto text-fttGreen">
            <div className="border-fttGreen border-b mb-10 flex items-center h-28">
                <h1 className=' ml-12 text-4xl font-medium'>Inventory</h1>
                <div className='flex justify-end items-center w-full '>
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
                    </svg></button>

                    <Link to={`/admin/create-listing`}>
                    <button className='bg-fttGreen py-3 px-6 ml-4 mr-12 rounded-full text-fttWhite transition hover:scale-105 hover:bg-green-900 ease-out duration-150'>Create Listing 
                    <svg className="inline-block stroke-fttWhite ml-2 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L12 18" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18 12L6 12" strokeWidth="2" strokeLinecap="round"/>
                    </svg></button></Link>

                </div>
            </div>

            <div className='grid lg:grid-cols-4 md:grid-cols-2 pb-32 sm:grid-flow-cols-1 gap-4 mx-16'>
                {
                products.map((prod) =>{
                    return(
                        <div  key= {prod._id} className='p-4 border-slate-400 border hover:shadow-md shadow rounded-md w-full overflow-hidden leading-tight transition delay-150 flex flex-col' id={prod._id}>
                            <img className= "w-full h-56 shadow object-cover mb-2 rounded" src = {prod.imageURL}></img>
                            <h4 className='font-medium text-2xl'> {prod.name}</h4>
                            <h6  className='font-xs text-light '> {handleType(prod.type)}</h6>
                            <h3 className='font-sm text-light' > {prod.stock} in stock</h3>
                            <h3  className='font-md  '> PHP {prod.price}</h3>
                            
                            <div className='flex justify-end'> 
                           
                            <Link to={`/admin/edit-product/${prod._id}`}><button className='ml-2  bg-fttGreen  hover:bg-green-900 text-fttWhite text-sm px-4 py-1 rounded-3xl'>
                                Edit</button></Link>

                            <button className='ml-2  bg-fttGreen  hover:bg-green-900 text-fttWhite text-sm px-4 py-1 rounded-3xl' onClick={()=> handleDelete(prod._id)}>Delete </button>
                            {activeDelete === prod._id && (
                                <div>
                                <DeleteProduct 
                                    id={prod._id} 
                                    setShow={handleCloseDelete} 
                                    currentFilter={sorter}
                                    setFilter={handleFilter} 
                                />
                                </div>
                            )}</div>
                           
                        </div>
                   
                    )
                })
                }
            </div>
           
        </div>
    )
}