import React from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Test() {
  const navigate = useNavigate();


  let timerInterval;
  Swal.fire({
    title: "NEW USER ?",
    text: "if this first logging change password!",
    icon: "question",
    timer: 2000,
    timerProgressBar: true,
    showCancelButton: true,
    confirmButtonText: "Yes, change it!",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    didOpen: () => {
      const swal2popup = document.querySelector('.swal2-popup');
      const swal2actions = document.querySelector('.swal2-actions');
      const swal2loading = document.querySelector('.swal2-loading');
      swal2popup.style.position = 'fixed';
      swal2popup.style.top = '5%';
      swal2popup.style.right = '1%';
      swal2popup.style.width = '300px'; // Adjust width as needed
      swal2popup.style.height = '270px'; // Adjust height as needed
      swal2popup.style.fontSize = '12px';
      swal2loading.style.position = 'absolute';
      swal2loading.style.bottom = `${swal2actions.offsetHeight}px`;
      timerInterval = setInterval(() => {
        const timeLeft = Swal.getTimerLeft();
        if (timeLeft !== undefined) {
          console.log(timeLeft);
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/security");
    } else if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });

  return (
    <div className="App container mt-3">
      <div className='d-flex coloum'>
        hi test
      </div>
    </div>
  );
}
export default Test;