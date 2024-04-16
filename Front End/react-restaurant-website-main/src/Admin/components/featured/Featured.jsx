// import "./featured.scss";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment'; 

// const Featured = () => {
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8079/carts/orders'); // Adjust URL as per your backend API
//         setFilteredData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (filteredData.length === 0) {
//       fetchData();
//     }
//   }, [filteredData.length]);

//   const calculateLastWeekRevenue = () => {
//     const startDate = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
//     const endDate = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');

//     const lastWeekData = filteredData.filter(
//       (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
//     );

//     return lastWeekData.reduce((total, item) => total + item.cost, 0);
//   };

//   const calculateLastMonthRevenue = () => {
//     const startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
//     const endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

//     const lastMonthData = filteredData.filter(
//       (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
//     );

//     return lastMonthData.reduce((total, item) => total + item.cost, 0);
//   };

//   const calculateTotalSalesToday = () => {
//     const today = moment().format('YYYY-MM-DD');

//     const todaySales = filteredData.filter(
//       (item) => moment(item.lastUpdate).isSame(today, 'day') && !isNaN(item.cost)
//     );

//     return todaySales.reduce((total, item) => total + item.cost, 0);
//   };

//   const totalSalesToday = calculateTotalSalesToday();
//   const targetSales = 10000; 

//   const percentage = Math.min((totalSalesToday / targetSales) * 100, 100);

//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Total Revenue</h1>
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//           <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
//         </div>
//         <p className="title">Total sales made today</p>
//         <p className="amount" style={{color: "blue", fontWeight: "bolder"}}>{totalSalesToday} Rs/-</p>
        
//         <h4>Last Week Revenue: {calculateLastWeekRevenue()} Rs/-</h4>
//         <h4>Last Month Revenue: {calculateLastMonthRevenue()} Rs/-</h4>
//       </div>
//     </div>
//   );
// };

// export default Featured;





// import "./featured.scss";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment'; 
// import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// const Featured = () => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
//   const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8079/carts/orders'); // Adjust URL as per your backend API
//         setFilteredData(response.data);
//         setLastWeekRevenue(calculateLastWeekRevenue(response.data));
//         setLastMonthRevenue(calculateLastMonthRevenue(response.data));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculateLastWeekRevenue = (data) => {
//     const startDate = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
//     const endDate = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');

//     const lastWeekData = data.filter(
//       (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
//     );

//     return lastWeekData.reduce((total, item) => total + item.cost, 0);
//   };

//   const calculateLastMonthRevenue = (data) => {
//     const startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
//     const endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

//     const lastMonthData = data.filter(
//       (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
//     );

//     return lastMonthData.reduce((total, item) => total + item.cost, 0);
//   };

//   const calculateTotalSalesToday = () => {
//     const today = moment().format('YYYY-MM-DD');

//     const todaySales = filteredData.filter(
//       (item) => moment(item.lastUpdate).isSame(today, 'day') && !isNaN(item.cost)
//     );

//     return todaySales.reduce((total, item) => total + item.cost, 0);
//   };

//   const totalSalesToday = calculateTotalSalesToday();
//   const targetSales = 10000; 
//   const percentage = Math.min((totalSalesToday / targetSales) * 100, 100);

//   // Prepare data for pie chart
//   const salesPerDay = filteredData.reduce((acc, curr) => {
//     const date = moment(curr.lastUpdate).format('YYYY-MM-DD');
//     acc[date] = acc[date] ? acc[date] + curr.cost : curr.cost;
//     return acc;
//   }, {});

//   const pieChartData = Object.keys(salesPerDay).map(date => ({
//     date,
//     value: salesPerDay[date]
//   }));

//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Total Revenue</h1>
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//           <PieChart width={400} height={400}>
//             <Pie
//               dataKey="value"
//               isAnimationActive={false}
//               data={pieChartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#8884d8"
//               label
//             >
//               {pieChartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>
//         <p className="title">Total sales made today</p>
//         <p className="amount" style={{color: "blue", fontWeight: "bolder"}}>{totalSalesToday} Rs/-</p>
        
//         <h4>Last Week Revenue: {lastWeekRevenue} Rs/-</h4>
//         <h4>Last Month Revenue: {lastMonthRevenue} Rs/-</h4>
//       </div>
//     </div>
//   );
// };

// export default Featured;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment'; 
// import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// const Featured = () => {
//   const [totalSalesToday, setTotalSalesToday] = useState(0);
//   const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
//   const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8079/carts/orders');
//         const orders = response.data;

//         // Calculate total sales made today
//         const todaySales = orders.filter(order => moment(order.orderbookingtime).isSame(moment(), 'day'));
//         const totalSalesToday = todaySales.reduce((total, order) => total + order.totalSum, 0);
//         setTotalSalesToday(totalSalesToday);

//         // Calculate last week revenue
//         // Calculate last week revenue
// const lastWeekSales = orders.filter(order =>
//   moment(order.orderbookingtime).isBetween(moment().subtract(1, 'week'), moment())
// );
// const lastWeekRevenue = lastWeekSales.reduce((total, order) => total + order.totalSum, 0);
// setLastWeekRevenue(lastWeekRevenue);

// console.log("Last Month Sales:", lastMonthSales);

// const lastMonthSales = orders.filter(order =>
//   moment(order.orderbookingtime).isBetween(moment().subtract(1, 'month'), moment())
// );
// const lastMonthRevenue = lastMonthSales.reduce((total, order) => total + order.totalSum, 0);
// setLastMonthRevenue(lastMonthRevenue);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Total Revenue</h1>
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//         <PieChart width={400} height={400}>
//   <Pie
//     dataKey="value"
//     isAnimationActive={false}
//     data={[
//       { name: 'Today', value: totalSalesToday }
//     ]}
//     cx="50%"
//     cy="50%"
//     outerRadius={80}
//     fill="#8884d8"
//     label
//   >
//     <Cell key={`cell-0`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
//   </Pie>
//   <Tooltip />
// </PieChart>

//         </div>
//         <p className="title">Total sales made today</p>
//         <p className="amount" style={{ color: "blue", fontWeight: "bolder" }}>{totalSalesToday} Rs/-</p>
//         <h4>Last Week Revenue: {lastWeekRevenue} Rs/-</h4>
//         <h4>Last Month Revenue: {lastMonthRevenue} Rs/-</h4>
//       </div>
//     </div>
//   );
// };

// export default Featured;





import "./featured.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8079/carts/orders');
        const orders = response.data;

        // Calculate total sales made today
        const todaySales = orders.filter(order => moment(order.orderbookingtime).isSame(moment(), 'day'));
        const totalSalesToday = todaySales.reduce((total, order) => total + order.totalSum, 0);
        setTotalSalesToday(totalSalesToday);

        // Calculate last week revenue
        const lastWeekSales = orders.filter(order =>
          moment(order.orderbookingtime).isBetween(moment().subtract(1, 'week'), moment())
        );
        const lastWeekRevenue = lastWeekSales.reduce((total, order) => total + order.totalSum, 0);
        setLastWeekRevenue(lastWeekRevenue);

        console.log("Last Month Sales:", lastMonthSales);

        const lastMonthSales = orders.filter(order =>
          moment(order.orderbookingtime).isBetween(moment().subtract(1, 'month'), moment())
        );
        const lastMonthRevenue = lastMonthSales.reduce((total, order) => total + order.totalSum, 0);
        setLastMonthRevenue(lastMonthRevenue);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const percentage = Math.min((totalSalesToday / 10000) * 100, 100).toFixed(2); // Limit to two decimal places

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount" style={{ color: "blue", fontWeight: "bolder" }}>{totalSalesToday} Rs/-</p>
        <h4>Last Week Revenue: {lastWeekRevenue} Rs/-</h4>
        <h4>Last Month Revenue: {lastMonthRevenue} Rs/-</h4>
      </div>
    </div>
  );
};

export default Featured;
