import React, { useState, useEffect } from 'react';
import moment from 'moment';

function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  async function fetchAllPayments() {
    try {
      const response = await fetch('http://localhost:8090/payments/all');
      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  }

  return (
    <div>
      <h1>Payment Details</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.NO.</th>
            <th>Order ID</th>
            <th>Payment Mode</th>
            {/* <th>UPI No.</th> */}
            <th>User ID</th>
            <th>Transaction ID</th>
            {/* <th>Total Cost</th> */}
            <th>Order Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.orderId}</td>
              <td>{payment.paymentMethod}</td>
              {/* <td>{payment.upiNumber}</td> */}
              <td>{payment.userId}</td>
              <td>{payment.transactionId}</td>
              {/* <td>{payment.totalCost}</td> */}
              <td>{moment(payment.orderBookingTime).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayments;
