import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Addusertable = ({ rows }) => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()
 
    
 




 /*
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  */
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>USER LIST</h3>
      </div>
      <Link to="/Adduser" className="btn btn-success">
         + Addnew
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
            
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.roll}</td>
                <td>{e.email}</td>
                
                
                <td>
                  <Link
                    to={`/Adduser/` + e.id}
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
  );
};

export default Addusertable;
