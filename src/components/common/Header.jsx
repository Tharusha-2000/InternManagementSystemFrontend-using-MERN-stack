import React from 'react'
import { BsFillBellFill, BsPersonCircle, BsJustify }
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar}/>
      </div>
      <div className='header-left'>
        <BsFillBellFill className='icon'/>
        <BsPersonCircle className='icon' />
      </div>
    </header>
  )
}

export default Header