import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
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
        <div className="account-container">
            <h1>User Accounts</h1>
            <h4>Total Registered Users: {userCount}</h4>
            <div className='account-container'>
                {
                    users.map((user)=>{
                        return(
                            <div className='user-card'>
                            <h5>First Name: {user.firstName}</h5>
                            {user.middleName !== ''? <h5>Middle Name : {user.middleName}</h5> :null}
                            <h5>Last Name: {user.lastName}</h5>
                            <h5>Email: {user.email}</h5>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}