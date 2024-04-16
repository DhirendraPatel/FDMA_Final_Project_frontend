import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BookedTable.css"

const BookedTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:8078/slots'); // Adjust URL as per your backend API
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  return (
    <div>
      <h1>Booked Tables</h1>
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Booking Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Number of Persons</th>
            <th>Email</th>
            {/* <th>Booking Time</th> */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.bId}</td>
              <td>{table.bookingId}</td>
              <td>{table.bBookdate}</td>
              <td>{table.bBooktime}</td>
              <td>{table.bPpl}</td>
              <td>{table.bEmail}</td>
              {/* <td>{table.bookingDateTime}</td> */}
              <td>{table.bStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedTables;
