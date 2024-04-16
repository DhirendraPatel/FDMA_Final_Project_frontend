import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeroImage from './components/HeroImage/HeroImage';
import bgImage from "./assets/biryani.jpg";
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import "./BookTable.css";

import Slotsdate from "../src/Slotsdates"

const BookTable = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    bBookdate: "",
    bBooktime: null,
    bPpl: null,
    bEmail: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');



  const parsedTimeSlot = parseInt(timeSlot, 10); // Parse the string to an integer

  const handleBookSelectedSlot = async () => {
    try {
      const response = await axios.post('http://localhost:8078/book', {
        bBookdate: formData.bBookdate, 
        bBooktime: selectedTimeSlot, 
        bPpl: formData.numberOfPersons, 
        bEmail: formData.bEmail, 
      });

      if (response.status === 200) {
        toast.success('Booking successful');
        setTimeSlots((prevTimeSlots) => prevTimeSlots.filter(slot => slot !== selectedTimeSlot));
      } else {
        toast.error('Failed to book table');
      }
    } catch (error) {
      console.error('Error booking table:', error);
      toast.error('Failed to book table');
    }
  };


  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setTimeSlot(timeSlot);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // const email = formData.bEmail
      // console.log("---"+email)
      console.log(formData.bEmail)
      const response = await fetch('http://localhost:8078/table/emailotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body:JSON.stringify ({
          email: formData.bEmail
      }),
      });

      if (response.ok) {
        toast.success('OTP sent successfully to your MailId');
        setOtpSent(true);
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.otp)
      console.log(formData.bEmail)
      
      const response = await fetch('http://localhost:8078/table/emailcheck', {
        method: 'post',
        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.bEmail,
          otp: formData.otp,
          
        }),
        
      });
      

      if (response.ok) {
        toast.success('OTP verified successfully');
        setShowTimeSlots(true); // Set showTimeSlots to true after OTP verification
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(" ");

  const [selectPeople, setSelectPeople] = useState("");
  const [bookStatus, setBookStatus] = useState("");

  const [data, setData] = useState([]);


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Update selectedDate state
    setFormData({ ...formData, bBookdate: e.target.value });
    console.log(e.target.value);

    const slotsdata = Slotsdate.map((d) => {
      d.bBookdate = e.target.value;

      return d;
    });

    const fetchData = async () => {

      console.log("before try")
      try {


        console.log("after try")
        console.log(slotsdata);
        const resp = await axios.post(
          `http://localhost:8078/getslots/${e.target.value}`,
          slotsdata
        );
        setData(resp.data);


        console.log("response--" + resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  const validatebEmail = (bEmail) => {
    let error = '';
  
    if (!bEmail) {
      error = 'Email is required';
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bEmail))) {
      error = 'Email is not valid';
    }
  
    return error;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
  
    if (name === 'bEmail') {
      error = validatebEmail(value);
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  



  return (
    <>
      <Navbar />
      <HeroImage
        bgImage={bgImage}
        heading={["Book A ", <span style={{ color: "lightcyan" }}>Table</span>]}
      />
      <div id='table' className='min-h-screen container mx-auto flex justify-center'>
        <br /> <br />
        <div className='flex-wrap sm:flex-nowrap flex items-center sm:gap-20 lg:gap-20' style={{ display: "flex" }}>
          <div className='sm:w-1/2 lg:w-1/2 py-4 px-4' style={{ maxWidth: "40%", marginLeft: "4%" }}>
            <div className='flex flex-col gap-4 w-full'>
              <div className='w-full'>
                <h2 className=' text-[#FF6600] text-2xl font-mono' >Fresh From FOODIE</h2>
                <h1 className='text-5xl font-bold tracking-[6px]' style={{ fontSize: "3rem", marginLeft: "-40%" }}>Book 😋 <br /> <span style={{ marginLeft: "-5%" }}>Online</span></h1>
              </div>
              <p className='text-gray-700 text-medium ' style={{ marginLeft: "-10%" }}>"Experience the convenience of online table booking with just a few clicks. Secure your spot hassle-free and enjoy a seamless dining experience at your favorite restaurant."</p> <br />
              <p className='text-gray-700 text-medium ' style={{ marginLeft: "10%" }}>"Reserve your seat, indulge in flavors."</p>
            </div>
          </div>

          <div className='sm:w-1/2 lg:w-1/2  sm:p-2 lg:p-2 max-w-7xl mx-auto'>
            <p className='bold text-center text-3xl font-bold tracking-wide uppercase my-4' style={{ fontSize: "2rem", marginLeft: "20%" }}>Book a table</p>
            <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className='flex flex-col gap-y-6'>
              <input
                type='date'
                name='date'
                placeholder='Choose Date'
                value={selectedDate}
                onChange={handleDateChange}
                className='border border-[#FF6600]/60 rounded placeholder-gray-600 py-4 px-3 w-full'
                style={{ width: "80%", height: "7vh", marginTop: "3%", marginLeft: "18%" }}
                required
                min={new Date().toISOString().split('T')[0]}
              />

              <input
                type='number'
                name='numberOfPersons'
                placeholder='How Many Person ?'
                value={formData.numberOfPersons}
                onChange={handleChange}
                className='border border-[#FF6600]/60 rounded placeholder-gray-600 py-4 px-3 w-full'
                style={{ width: "80%", height: "7vh", marginTop: "3%", marginLeft: "18%" }}
                required
                min="1"
                max="10"
              />
              <input
                type='email'
                name='bEmail'
                placeholder='Your Email'
                value={formData.bEmail}
                onChange={handleChange}
                className='border border-[#FF6600]/60 rounded placeholder-gray-600 py-4 px-3 w-full'
                style={{ width: "80%", height: "7vh", marginTop: "3%", marginLeft: "18%" }}
                required
              />



              {!otpSent && (
                <button type='submit' className='self-center bg-[#FF6600] text-white rounded-full py-2 px-6 w-36 text-center' style={{ marginTop: "5%", marginLeft: "33%" }}>
                  Send OTP
                </button>
              )}
              {otpSent && (
                <>
                  <input
                    type='text'
                    name='otp'
                    placeholder='Enter OTP'
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "18%", width: "80%", height: "6vh", marginTop: "3%" }} />
                  <button type='submit' className='self-center bg-[#FF6600] text-white rounded-full py-2 px-6 w-36 text-center' style={{ marginTop: "5%", marginLeft: "33%" }}>
                    Submit OTP
                  </button>
                </>
              )}
              <ToastContainer position="bottom-right" autoClose={3000} />
            </form> <br />

            {showTimeSlots && (
              <>
                <div className="slot-buttons" >
                  {data.map((slot) => (
                    <button
                      key={slot.bBooktime}
                      className={`btn ${slot.bStatus === "booked" ? "btn-booked" : "btn-primary"}`}
                      disabled={slot.bStatus === "booked"}
                      onClick={() => handleSelectTimeSlot(slot.bBooktime)}
                      style={{borderRadius: "2rem"}}>
                      {slot.bBooktime}-{slot.bBooktime + 1}
                    </button>
                  ))}
                </div>
                {selectedTimeSlot && (
                  <div className="book-slot-button-container">
                    <button onClick={handleBookSelectedSlot} className="btn btn-primary" style={{ marginTop: "7%", marginLeft: "28%", backgroundColor: "green", backgroundColor: "#0000FF" }}>
                      Book Selected Slot
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div> <br /> <br />
      </div>
      <Footer />
    </>
  );
};

export default BookTable;

function generateTimeSlots() {
  const timeSlots = [];
  const startHour = 9; // Starting hour
  const endHour = 21; // Ending hour

  for (let hour = startHour; hour < endHour; hour++) {

    timeSlots.push(hour)
  }

  return timeSlots;
}















