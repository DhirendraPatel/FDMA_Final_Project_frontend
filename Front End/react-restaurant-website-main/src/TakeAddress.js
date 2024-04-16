import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeAddress.css'; 
import Navbar from './components/Navbar/Navbar';

export default function TakeAddress() {
  const defaultAddress = {
    address: "Cyber Towers",
    house: "Floor No.: 5",
    area: "Madhapur, Hyd",
    landmark: "Cyber Towers Building",
  };

  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedOrderId = localStorage.getItem('orderId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }
  }, []);

  const handleProceed = async () => {
    try {
      const addressData = {
        ...defaultAddress,
        userId: userId,
        orderId: orderId
      };
      const response = await axios.post("http://localhost:9094/address/save", addressData);
      if (response.status === 200) {
        console.log("Default address saved successfully!");
        // Redirect to the next page after saving the address
        window.location.assign("/Payment");
      } else {
        console.error("Failed to save default address");
      }
    } catch (error) {
      console.error("Error saving default address:", error);
    }
  };

  return (
    <>
      <Navbar/> <br/> <br/> <br/> <br/> <br/> <br/>
      <div className='address-container'>
        <div className="address-card">
          <h3 className='address-heading' style={{fontSize: "1.5rem", fontWeight: "bolder"}}>PickUp Location</h3>
          <div className="address-details">
            <p style={{fontSize: "1.3rem"}}><strong style={{fontSize: "1.3rem"}}>Address:</strong> {defaultAddress.address}</p>
            <p style={{fontSize: "1.3rem"}}><strong style={{fontSize: "1.3rem"}}>House / Flat No:</strong> {defaultAddress.house}</p>
            <p style={{fontSize: "1.3rem"}}><strong style={{fontSize: "1.3rem"}}>Area:</strong> {defaultAddress.area}</p>
            <p style={{fontSize: "1.3rem"}}><strong style={{fontSize: "1.3rem"}}>Landmark:</strong> {defaultAddress.landmark}</p>
          </div>
          <button className="btn btn-warning" onClick={handleProceed}>
            <b>Proceed</b>
          </button>
        </div>
      </div>
    </>
  );
}
