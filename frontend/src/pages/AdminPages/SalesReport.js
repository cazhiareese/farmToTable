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
        <div className="Sales-Report-Container">
            <h1>Sales Report</h1>
            <h2>Total Sales: {totalSales}</h2>
            <div className="period-selector">
                <select value={selectedPeriod}
                                    onChange={e => {
                                        setPeriod(e.target.value)
                                        handleOptionChange(e.target.value)
                                    }}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                </select>


            </div>

            <div className='sales-product-container'>
                {
                    salesReport.map((prod) => {
                        return(
                            <div key={prod.productId}>
                                {/* <img src={prod.imageURL} /> */}
                                <h5>Income generated: {prod.totalSales}</h5>
                                <h1>{prod.name}</h1>
                                <p>Unit Price: {prod.price}</p>
                                <p>No. of {prod.name} sold: {prod.totalQty}</p>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}