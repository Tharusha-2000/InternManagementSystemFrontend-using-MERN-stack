import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Adduser from "./Adduser";

function Addusertable ({rows}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false); // Add this state variable
    
  const navigate = useNavigate()
    
    useEffect(() => {
      axios.get('http://localhost:8000/api/users/user')
          .then(result => {
              setData(result.data.users);
          })
          .catch(err => console.log(err));
  }, []);

  function openModal(userId) {
    setSelectedUserId(userId);
    setModalIsOpen(true);
  }
  
  function closeModal() {
    setModalIsOpen(false);
    
  }
  
  function handleRoleChange() {
    axios.put(`http://localhost:8000/api/users/user/${selectedUserId}`, { role: selectedRole })
      .then(result => {
        setData(data.map(user => user._id === selectedUserId ? { ...user, role: selectedRole } : user));
        console.log(result.data.msg);
        closeModal();
      })
      .catch(err => console.log(err));
   }

  function handleDelete(id) {
       if (window.confirm("Are you sure you want to delete this user?")) {
        axios.delete(`http://localhost:8000/api/users/user/${id}`)
        .then(result => {
        setData(data.filter(user => user._id!==id));
        console.log(result.data.msg); 
        })
        .catch(err => console.log(err));
    }
  }
  const handleAddNew = () => {
    setShowAddUser(true); // Set the state variable to true when the button is clicked
  }
  return (
  <div>
      {showAddUser ? <Adduser setShowAddUser={setShowAddUser}/>:
      
      <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>USER LIST</h3>
      </div>      
      <button onClick={handleAddNew}>
        + Addnew
      </button>
      {showAddUser ? <Adduser /> : (
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
                {data.map(user => (
                  <tr key={user._id}>
                    <td>{user.fname} { user.lname }</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => openModal(user._id)} className="btn btn-info btn-sm me-2">
                        Change Role
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Change Role"
                        style={{
                          content: {
                            width: '30%',
                            height: '30%',
                            margin: 'auto',
                            backgroundColor: 'lightpink',
                          },
                        }}
                      >
                        <h2>Change Role</h2>
                        <div>
                          <input type="radio" value="intern" name="role" onChange={(e) => setSelectedRole(e.target.value)} /> Intern
                          <br />
                          <input type="radio" value="manager" name="role" onChange={(e) => setSelectedRole(e.target.value)} /> Manager
                          <br />
                          <input type="radio" value="admin" name="role" onChange={(e) => setSelectedRole(e.target.value)} /> Admin
                          <br />
                        </div>
                        <button onClick={handleRoleChange}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                      </Modal>
                      <button onClick={() => handleDelete(user._id)} className="btn btn-warning btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        </div>
      )}
    </div>
      
      }
      
    </div>

  )

}

export default Addusertable;

