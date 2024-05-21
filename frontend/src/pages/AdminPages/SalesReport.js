import { useEffect, useState } from 'react';

export default function SalesReport (){

    const [selectedPeriod, setPeriod] = useState('weekly');
    const [salesReport, setReport] = useState([]);
    const [totalSales, setTotalSales] = useState(0)
    useEffect(() =>{
        handleOptionChange(selectedPeriod)
    }, [])

    function handleOptionChange(period) {
        let url = 'http://localhost:3001/salesreport?period='+period
        fetch(url)
          .then(response => response.json())
          .then(body => {
            setReport(body)
            handleTotalSales(body)
        })
    }

    function handleTotalSales (report) {
        let newTotal = 0
  
        report.map((prod) => {
            newTotal += prod.totalSales;
        })
        setTotalSales(newTotal)
        
    }

    return (
        <div className="bg-fttWhite w-full font-Roboto text-fttGreen min-h-screen">
            <div className="border-fttGreen border-b mb-10 flex items-center h-28">
                <h1 className=' ml-12 text-4xl font-medium w-full'>Sales Report</h1>
                <div className='flex justify-end items-center mr-12 w-full '>
                <select className='inline text bg-fttBg py-3 px-4 rounded-3xl border border-fttGreen' value={selectedPeriod}
                                onChange={e => {
                                    setPeriod(e.target.value)
                                    handleOptionChange(e.target.value)
                                }}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="annual">Annual</option>
                    </select>
                </div>
            </div>

            <h4 className='ml-16 font-bold text-2xl mb-4' >Total Sales: {totalSales}</h4>
            <div className="border-slate-400 border-t mb-10 pt-6 flex flex-col items-center" >
                {
                    salesReport.map((prod) => {
                        return(
                            <div className='leading-snug border border-gray-300  shadow-md rounded-2xl w-1/2 p-4 mb-2 pl-12' key={prod.productId}>
                                <h5 className=' font-medium'>Income generated: PHP {prod.totalSales}</h5>
                                <img  className="float-left w-20 mr-4 h-20 object-cover rounded" src={prod.imageURL} />
                                <h1 className=' font-medium'>{prod.name}</h1>
                                <p>PHP {prod.price}</p>
                                <p>Items sold: {prod.totalQty}</p>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}