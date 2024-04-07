import React, { useState, useEffect } from 'react';
import { BASE_URL } from './config';
import axios from 'axios';
import Input from '@mui/joy/Input';


function test() {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  const [data, setData] = useState({
    image: "",
    lname: "",
  });
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      setData(result.data.user);
      console.log(result.data.user);  
      //setImageUrl(result.data.user.image);
    }).catch(err => console.log(err));
  }, []);

  function onInputChange(e) {
    const file = e.target.files[0];
    setImage(file);

    setImageUrl(URL.createObjectURL(file));
  };

  const submitImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
   
    formData.append('image', image);
    const response = await axios.post(`${BASE_URL}uploadImage`, formData, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });
    console.log(response.data);
  }
  
console.log(imageUrl);
  return (
    <div>
      <form onSubmit={submitImage}>
        <input
          type="file"
          accept='image/*'
          onChange={onInputChange}
        />
        <img src={imageUrl} style={{width:'100px',height:'100px'}} />
        <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} value={data.lname} onChange={e => setData(data => ({...data, lname: e.target.value}))}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default test;