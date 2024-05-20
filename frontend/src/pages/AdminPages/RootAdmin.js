import { Outlet,Link } from 'react-router-dom';
import css from '../../style/output.css';
import da from '../../images/admin.png'
 function RootAdmin (){

    return (
    <div className='flex min-h-screen bg-fttShadow'>
        <div className="w-96 bg-fttGreen font-Roboto">
          <img className= "mx-auto my-10" src={da}></img>
          <nav>
            <div className='mx-10 border-t-slate-400 border-t'>
            <button className="dash-li" onClick={()=>{
                document.querySelector(".active-dash").classList.add('default-dash');
                document.querySelector(".active-dash").classList.remove('active-dash');
                document.getElementById('a_dash').classList.add('active-dash');
              }}>
                <Link className="link" to={`/admin/`} >
                <span id="a_dash" className='active-dash '>
                <svg  className='w-6 inline-block mr-4' stroke="currentColor" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 6.94C13.501 6.8012 13.473 6.66372 13.4179 6.53632C13.3628 6.40892 13.2818 6.29438 13.18 6.2L7.00002 0.5L0.820023 6.2C0.718248 6.29438 0.637236 6.40892 0.582143 6.53632C0.52705 6.66372 0.499084 6.8012 0.500023 6.94V12.5C0.500023 12.7652 0.60538 13.0196 0.792916 13.2071C0.980452 13.3946 1.23481 13.5 1.50002 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3947 13.0196 13.5 12.7652 13.5 12.5V6.94Z" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M7 13.5V9.5"strokeLinecap="round"strokeLinejoin="round"/>
                </svg> Dashboard </span></Link></button>

              <button className="dash-li " onClick={()=>{
                document.querySelector(".active-dash").classList.add('default-dash');
                document.querySelector(".active-dash").classList.remove('active-dash');
                document.getElementById('a_inv').classList.add('active-dash');
              }}>
                <Link className="link" to={`/admin/inventory`} >
                <span id="a_inv" className='default-dash'>
                <svg className=' inline-block h-6 mr-4' stroke="currentColor" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17V26C3 26.2652 3.10536 26.5196 3.2929 26.7072C3.48042 26.8946 3.73478 27 4 27H24C24.2652 27 24.5196 26.8946 24.7072 26.7072C24.8946 26.5196 25 26.2652 25 26V17" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M26 12H2C1.73478 12 1.48043 11.8947 1.29289 11.7072C1.10536 11.5196 1 11.2653 1 11V7.00004L3.44 2.10004C3.60772 1.76718 3.86514 1.4878 4.18318 1.29344C4.50124 1.09907 4.86728 0.997454 5.24 1.00005H22.76C23.1328 0.997454 23.4988 1.09907 23.8168 1.29344C24.1348 1.4878 24.3922 1.76718 24.56 2.10004L27 7.00004V11C27 11.2653 26.8946 11.5196 26.7072 11.7072C26.5196 11.8947 26.2652 12 26 12Z" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M16 17V27" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M3 20H16" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M1 7H27" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                </svg>Inventory </span></Link></button>

              <button className=" shadow-xl" onClick={()=>{
                document.querySelector(".active-dash").classList.add('default-dash');
                document.querySelector(".active-dash").classList.remove('active-dash');
                document.getElementById('a_ord').classList.add('active-dash');
              }}>
                <Link className="link" to={'/admin/active-orders'}>
              <span id="a_ord"  className='default-dash'>
                <svg className=' inline-block w-6 mr-4 ' stroke="currentColor" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 1V9" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M1 9H27V25C27 25.5304 26.7892 26.0392 26.4142 26.4142C26.0392 26.7892 25.5304 27 25 27H3C2.46956 27 1.96086 26.7892 1.58579 26.4142C1.21071 26.0392 1 25.5304 1 25V9Z"  strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M1 9L4 3.22C4.32342 2.56854 4.81834 2.0176 5.43152 1.62643C6.0447 1.23526 6.75292 1.01869 7.48 1H20.52C21.2642 1.00039 21.9934 1.20838 22.626 1.60056C23.2584 1.99274 23.7688 2.55358 24.1 3.22L27 9"  strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  <path d="M19 18H9" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                  </svg> Orders </span></Link></button>
                  
              <button className=" dash-li" onClick={()=>{
                document.querySelector(".active-dash").classList.add('default-dash');
                document.querySelector(".active-dash").classList.remove('active-dash');
                document.getElementById('a_rep').classList.add('active-dash');
              }}>
                <Link className="link" to={`/admin/sales-report`}>
              <span id="a_rep" className='default-dash'>
              <svg  className=' inline-block w-6 mr-4 ' stroke="currentColor" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 15H1V27H9.5" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                <path d="M18.5 9H9.5V27H18.5" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                <path d="M27 1H18.5V27H27V1Z" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
              </svg> Sales Report </span></Link></button>

              <button className=" dash-li" onClick={()=>{
                document.querySelector(".active-dash").classList.add('default-dash');
                document.querySelector(".active-dash").classList.remove('active-dash');
                document.getElementById('a_user').classList.add('active-dash');
              }}>
                <Link className="link" to={`/admin/active-accounts`}>
              <span id="a_user" className='default-dash'>
              <svg className=' inline-block w-6 mr-4 ' stroke="currentColor"  viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                <path d="M1 27H10H19V25.9158C18.9841 24.3914 18.582 22.8958 17.8315 21.569C17.0809 20.242 16.0062 19.127 14.7079 18.328C13.4095 17.529 11.9298 17.0721 10.407 17C10.2713 16.9936 10.1356 16.9903 10 16.99C9.86444 16.9903 9.72872 16.9936 9.59296 17C8.07018 17.0721 6.5905 17.529 5.29214 18.328C3.9938 19.127 2.91914 20.242 2.16854 21.569C1.41795 22.8958 1.01592 24.3914 1 25.9158V27Z" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                <path d="M18 13C20.7614 13 23 10.7614 23 8C23 5.23858 20.7614 3 18 3" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                <path d="M23 27.0002H27V25.9158C26.984 24.3914 26.582 22.8958 25.8314 21.569C25.0808 20.242 24.0062 19.127 22.7078 18.3281C21.8686 17.8116 20.9534 17.438 20 17.219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>User Accounts</span></Link></button>
            </div>
          </nav>
        </div>
            
        <Outlet  />
        
      </div>
    )
}

export default RootAdmin