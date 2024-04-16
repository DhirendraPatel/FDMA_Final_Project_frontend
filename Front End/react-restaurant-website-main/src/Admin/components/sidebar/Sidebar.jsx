// import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
// import logo from "../../../assets/logo.png";

// const Sidebar = () => {
//   const { dispatch } = useContext(DarkModeContext);
//   return (
//     <div className="sidebar">
//       <div className="top">
//         <Link to="/" style={{ textDecoration: "none" }}>
//         <div style={{ display: "flex" }}>
//               <div>
//                 <img src={logo} alt="logo" width={40} />
//               </div>
//               <div>
//                 <h1 style={{ color: "white", fontSize: "1.4rem" }}>FOODIE</h1>
//               </div>
//             </div>        </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           {/* <p className="title">MAIN</p> */}
//           <Link to="">
//           <li>
//             <DashboardIcon className="icon" />
//             <span>Dashboard</span>
//           </li>
//           </Link>
          
//           <Link to="/AdminAddProducts" style={{ textDecoration: "none" }}>
//             <li>
//               <StoreIcon className="icon" />
//               <span>Add-Products</span>
//             </li>
//           </Link>


//           {/* <p className="title">LISTS</p> */}
          
//           <Link to="/User" style={{ textDecoration: "none" }}>
//             <li>
//               <PersonOutlineIcon className="icon" />
//               <span>User</span>
//             </li>
//           </Link>

//           <Link to="/AdminProducts" style={{ textDecoration: "none" }}>
//             <li>
//               <StoreIcon className="icon" />
//               <span>Products</span>
//             </li>
//           </Link>

//           <Link to="/AdminOffersPage">
//           <li>
//             <CreditCardIcon className="icon" />
//             <span>Offers</span>
//           </li> 
//           </Link>

//           <Link to="/SellingReport">
//           <li>
//             <TrendingUpIcon className="icon" />
//             <span> Selling Report</span>
//           </li>
//           </Link>

//           <Link to="Drivers">
//           <li>
//             <LocalShippingIcon className="icon" />
//             <span>Delivery Drivers</span>
//           </li>
//           </Link>

//           <Link to="FeedbackReport">
//           <li>
//             <ChatBubbleOutlineIcon />
//             <span>Feedback Report</span>
//           </li>
//           </Link>
//           <Link to="BookedTables">
//           <li>
//             <InsertChartIcon  />
//             <span>Booking Tables</span>
//           </li>
//           </Link>
//           {/* <p className="title">USEFUL</p> */}
//           <Link to="Stats">
//           <li>
//             <InsertChartIcon className="icon" />
//             <span>Stats</span>
//           </li>
//           </Link>
//           {/* <Link to="/Notification">
//           <li>
//             <NotificationsNoneIcon className="icon" />
//             <span>Notifications</span>
//           </li>
//           </Link> */}
//           <Link to="OrderDetails">
//           <li>
//             <PsychologyOutlinedIcon className="icon" />
//             <span>Order Details</span>
//           </li>
//           </Link>
//           {/* <p className="title">SERVICE</p> */}
//           {/* <p className="title">USER</p> */}
//           <Link to="AdminProfile">
//           <li>
//             <AccountCircleOutlinedIcon className="icon" />
//             <span>Profile</span>
//           </li>
//           </Link>
//           <Link to="/">
//           <li>
//             <ExitToAppIcon className="icon" />
//             <span>Logout</span>
//           </li>
//           </Link>
//         </ul>
//       </div>
//       {/* <div className="bottom">
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "LIGHT" })}
//         ></div>
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "DARK" })}
//         ></div>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;





import React, { useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import Emp from '../../../assets/emplogo.jpg'
import dashboard from '../../../assets/dashboard.png'
import notification from '../../../assets/notification.svg'
import vendor from '../../../assets/emplogo.jpg'
import management from '../../../assets/emplogo.jpg'
import charts from '../../../assets/charts.png'
import Logo from '../../../assets/logo.png'
import profile from '../../../assets/emplogo.jpg'
import Bars from '../../../assets/menubar.png'
import "./sidebar.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminDashbord() {
  return (
    <div className='Dashboard'>

      <Sidebar />
      <Header />

    </div>
  )
}

function Header() {

  const [isChecked, setIsChecked] = useState(true);
  const [dropDown, setDropDown] = useState(false);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return <div className='headerDiv'style={{marginLeft: "-5%", width: "87%"}}>
    <header id='head'>
      <div className="containeradmin">
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          id="search_checkbox"
        style={{marginLeft: "1100%"}}/>
        <div className="mainbox">
          <label htmlFor="search_checkbox" className="iconContainer">
            <svg
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="search_icon"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
          <input
            id="search_input"
            className="search_input"
            placeholder="search"
            type="text"
            style={{marginLeft: "-300%"}}/>
        </div>
      </div>
      {/* <div className='notify'>
        <a href='#'><img src={notification} className='notify' /></a>
      </div> */}
      {/* <div className='profile' >
        <a href='#'><img src={profile} className='profileIcon' /></a>

      </div> */}
    </header>

  </div>
}

function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);



  return <div className='sideBaradmin' style={{ width: "110%", height: "115vh"}}>
    <div className='logoDiv'>
      <img src={Logo} className='logo' style={{ width: isOpen ? '40%' : '', height: isOpen ? '3vh' : '', marginTop: isOpen ? '50px' : '' }}></img>
    </div> <br/> <br/> <br/> <br/> <br/> 
    {/* <h6 className='menu'
      style={{ marginLeft: isOpen ? '-11%' : '-140px' }}>Menu</h6>
    <img src={Bars} className='bars' style={
      {
        width: isOpen ? '50%' : '',
        marginTop: isOpen ? '-120px' : '',
        marginLeft: isOpen ? '-35px' : '0px',
        filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)'
      }} onClick={toggle}></img> */}
    <div className='list' >

      <ul
        style={
          {
            marginLeft: isOpen ? '-50%' : '',
            width: isOpen ? '15vw' : '',
        

          }
        }
      >
        <Link to="/Home"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}  >
      
          <a href='#'><li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCGM6NZPeWjz0aJM8WmWjRmObKA2TOTpxqA&usqp=CAU" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }>Dashboard</span></li></a>
        </div></Link>

        <Link to="User"><div className='listDiv' style={{ paddingTop: isOpen ? '10px' : '' }}>
          <a href='#'><li><img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /> <span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Users</span></li></a>
        </div></Link>
        <Link to="AdminProducts"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://i.pinimg.com/564x/42/93/05/429305229f4b907a56b8a24a448830ed.jpg" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Products</span></li></a>
        </div></Link>
        <Link to="AdminOffersPage"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://cdn-icons-png.flaticon.com/512/2956/2956869.png" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Offers</span></li></a>
        </div></Link>
        <Link to="SellingReport"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://media.istockphoto.com/id/1091586586/vector/sales-report-icon.jpg?s=612x612&w=0&k=20&c=4LzvKzS3BCq2o9_K8cM0qxwefVtcF-xoJ3I3bIeQzGM=" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /><span style={ 
            {
              display: isOpen ? 'none' : 'block', marginRight: "-40%"
            }
          }
          >
            SalesReport</span></li></a>
        </div></Link>
        <Link to="OrderDetails"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://cdn-icons-png.freepik.com/512/2082/2082112.png" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(90%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            OrderDetails</span></li></a>
        </div></Link>
        <Link to="BookedTables"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://static.thenounproject.com/png/3128992-200.png" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            BookedTables</span></li></a>
        </div></Link>
        <Link to="Stats"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="data:image/png;base64,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" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Stats</span></li></a>
        </div></Link>
        <Link to="Drivers"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://static.vecteezy.com/system/resources/thumbnails/003/541/648/small/steering-wheel-icon-hands-on-steering-wheel-driver-driving-car-symbol-test-drive-outline-illustration-isolated-on-white-background-vector.jpg" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Drivers</span></li></a>
        </div></Link>
        <Link to="AdminAddProducts"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            AddProducts</span></li></a>
        </div></Link>
        <div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src={charts} className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Charts</span></li></a>
        </div>
        <Link to="/"><div className='listDiv' style={{ paddingTop: isOpen ? '15px' : '' }}>
          <a href='#'><li><img src="https://www.iconpacks.net/icons/2/free-sign-out-icon-3300-thumb.png" className='icon' style={{ filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(124deg) brightness(108%) contrast(100%)' }} /><span style={
            {
              display: isOpen ? 'none' : 'block'
            }
          }
          >
            Logout</span></li></a>
        </div></Link>
      </ul>
    </div>
  </div>



}


