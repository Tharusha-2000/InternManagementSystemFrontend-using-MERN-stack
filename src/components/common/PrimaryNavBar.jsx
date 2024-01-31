
import React from 'react';
import './PrimaryNavBar.css';
//import LOGO from './assets/logo.png';
//import LOGO2 from './assets/logopart2.png';
//import PrimaryButton from '../Buttons/PrimaryButton'
//import '../../vars.css';

function PrimaryNavBar() {
    console.log("PrimaryNavBar");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light cpadding">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" style={{ color: 'var(--color-text-dark)' }}>Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: 'var(--color-text-dark)' }}>About us</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0 ">
            <div className='pr-3'>
              <button type="button" className="btn btn-outline-primary btn-sm">SIGN UP</button>
            </div>
            <Button type="button" value="SIGN IN" color="third" IsSmall={true}/>
          </form>
        </div>
      </nav>
    </>
  );
}

export default PrimaryNavBar;
