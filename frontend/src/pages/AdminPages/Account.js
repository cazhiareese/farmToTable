/**
 * Contains a React component for managing user accounts. 
 * It fetches user data from the server and displays it, including details like first name, last name, email, and user type.
 */

import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

// Component for displaying user accounts
export default function Account(){
   
    const [users, setUsers] = useState([])
    const [userCount, setUserCount] = useState(0)

    useEffect (() =>{
        let url = `http://localhost:3001/all-customer`
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setUsers(body)
               setUserCount(body.length)
               
        })   
    },[])

    return (
        <div className="bg-fttWhite w-full font-Roboto text-fttGreen">
            <div className="border-fttGreen border-b mb-10 flex items-center h-28">
            <h1 className=' ml-12 text-4xl font-medium'>User Accounts</h1></div>
            
            <h4 className='ml-16 font-bold text-xl mb-4' >Total Registered Users: {userCount}</h4>
            <div className="border-slate-400 border-t mb-10 pt-6 flex flex-col items-center" >
                {
                    users.map((user)=>{
                        return(
                            <div className='user-card border border-gray-300 shadow-md hover:scale-105 transition ease-out rounded-2xl w-1/2 p-4 mb-2 pl-12'>
                            <h5>First Name: <p className='inline-block font-medium'> {user.firstName}</p></h5> 
                            {user.middleName !== ''? <h5>Middle Name: <p className='inline-block font-medium'> {user.middleName}</p></h5> :null}
                            <h5>Last Name: <p className='inline-block font-medium'> {user.lastName}</p></h5>
                            
                            <h5>Email: <p className='inline-block font-medium'> {user.email}</p></h5> 
                            <h5 className='text-sm font-light uppercase'> {user.type}</h5> 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}