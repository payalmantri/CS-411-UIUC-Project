import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import './styles/tournamentList.scss';
import './styles/admin.scss';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch(`${BASE_URL}/users`)
    //             let data = await response.json();
    //             // data = data.splice(0, 10);
    //             setUsers(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    return (
        // <div>
        //     <h1>Admin Page</h1>
        //     <div className='tournament-list'>
        //         <h2>User List</h2>

        //         <table className='tournament-table'>

        //             <thead>
        //                 <tr>
                        
        //                     <th>Name</th>
        //                     <th>Email</th>
        //                     <th>Role</th>
        //                     <th>Funds Availablr</th>
        //                 </tr>
        //             </thead>

        //             <tbody>
        //                 {users.map((user) =>
        //                     <>
        //                         <tr key={user.id}>
                                  
        //                             <td>{user.name}</td>
        //                             <td>{user.email}</td>
        //                             <td>{user.role}</td>
        //                             <td>{user.funds_available}</td>
        //                         </tr>
        //                     </>
        //                 )}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>

        <div className='image-container'>
        <div className='img background-img'></div>
        <div className='img foreground-img'></div>
        <input type="range" min="1" max="100" value="50" className="slider" name='slider' id="slider"></input>
      </div>

    );
};

export default AdminPage;
