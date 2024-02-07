
import React from 'react'
import {  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
import { BsMastodon } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const nanvigate = useNavigate()
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsMastodon className='icon_header' /> 99X
        </div>
        <span className='icon close_icon'onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to ='/Adduser'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='HS/Addusertable'>
                    <BsFillArchiveFill className='icon'/> Registration
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Evaluation
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Profile Create
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> CV Management
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Profile
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Security
                </a>
            </li>
        </ul>

    </aside>
  )
}

export default Sidebar