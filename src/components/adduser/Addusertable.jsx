import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Addusertable ({rows}) {
  
  const [data, setData] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
      axios.get('http://localhost:8201/api/users/user')
          .then(result => {
              setData(result.data.users);
          })
          .catch(err => console.log(err));
  }, []);
 

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>USER LIST</h3>
      </div>
      <Link to="/Adduser" className="btn btn-success">
         + Addnew
      </Link>
      <div className="mt-3">
       <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
              <th>  </th>
          
            </tr>
          </thead>
          <tbody>
            {data.map( user => (
              <tr>
                <td>{user.fname}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                
                
                <td>
                  <Link
                    to={`/Adduser/` + user.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                   >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div> 
      </div>
    </div>
  );
}

export default Addusertable;
