import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slotsdate from "../src/Slotsdates";
import "./AdminSlots.css";

const BookTable = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    fetchData(selectedDate); 
  }, [selectedDate]);

  const fetchData = async (date) => {
    const slotsdata = Slotsdate.map((d) => ({
      ...d,
      bBookdate: date
    }));

    try {
      const resp = await axios.post(
        `http://localhost:8078/getslots/${date}`,
        slotsdata
      );
      setData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = async (e) => {
    setSelectedDate(e.target.value); 
  };

  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setTimeSlot(timeSlot);
  };

  return (
    <div className='admin' style={{marginTop: "20%"}}>
    <div> <br/>
      <input
        type='date'
        name='date'
        placeholder='Choose Date'
        value={selectedDate}
        onChange={handleDateChange}
      style={{marginLeft: "35%", height: "5vh", width: "40%"}}/>
      <div className="slot-buttons" style={{width: "75%", marginLeft: "10%"}}>
      {data.map((slot) => (
        <button
            key={slot.bBooktime}
            className={`btn ${slot.bStatus === "booked" ? "btn-booked" : "btn-primary"}`}
            disabled={slot.bStatus === "booked"}
            onClick={() => handleSelectTimeSlot(slot.bBooktime)}
            style={{ borderRadius: "2rem", width: "20%"}}>
            <span>{slot.bBooktime}-{slot.bBooktime + 1}</span>
        </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BookTable;
