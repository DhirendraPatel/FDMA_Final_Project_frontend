// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import moment from 'moment';

// const Stats = () => {
//   const [formData, setFormData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:9090/api/displaysellingreport')
//       .then(response => {
//         setFormData(response.data);
//       })
//       .catch(error => {
//         setError(error.message);
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (formData.length > 0) {
//       createCharts();
//     }
//   }, [formData]);

//   const createCharts = () => {
//     const januaryData = formData.filter(item => moment(item.lastUpdate).format('MM') === '01');
//     const daysInJanuary = Array.from({ length: 31 }, (_, i) => i + 1);
    
//     daysInJanuary.forEach(day => {
//       const dailyData = januaryData.filter(item => moment(item.lastUpdate).format('DD') === String(day));
//       const totalCosts = {};

//       dailyData.forEach(item => {
//         if (!totalCosts[item.dishes]) {
//           totalCosts[item.dishes] = item.cost;
//         } else {
//           totalCosts[item.dishes] += item.cost;
//         }
//       });

//       renderChart(day, totalCosts);
//     });
//   };

//   const renderChart = (day, data) => {
//     const ctx = document.getElementById(`myChart${day}`);
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: Object.keys(data),
//         datasets: [{
//           label: `Total Cost for ${moment().month(0).date(day).format('MMMM DD')}`,
//           data: Object.values(data),
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2 style={{marginLeft: "40%"}}>Stats for January</h2> <br/>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
//           <div key={day} style={{ width: '300px', margin: '10px' }}>
//             <canvas id={`myChart${day}`} width="300" height="300"></canvas>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Stats;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Chart from 'chart.js/auto';

const OrderDetails = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [yearlyStats, setYearlyStats] = useState({});

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8079/carts/itemsWithOrderIds');
            setCartItems(response.data);
            calculateYearlyStats(response.data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
        }
    };

    const calculateYearlyStats = (data) => {
        const yearlyStats = {};

        // Initialize stats for each day of the year
        for (let day = 1; day <= 365; day++) {
            const date = moment().dayOfYear(day).format('YYYY-MM-DD');
            yearlyStats[date] = {};
        }

        // Calculate stats based on actual sales data
        data.forEach(item => {
            const orderDate = moment(item.orderBookingTime).format('YYYY-MM-DD');
            const itemName = item.name;
            const itemCost = item.price * item.quantity;

            if (!yearlyStats[orderDate][itemName]) {
                yearlyStats[orderDate][itemName] = itemCost;
            } else {
                yearlyStats[orderDate][itemName] += itemCost;
            }
        });

        setYearlyStats(yearlyStats);
    };

    useEffect(() => {
        renderCharts();
    }, [yearlyStats]);

    const renderCharts = () => {
        const dates = Object.keys(yearlyStats);
        dates.forEach(date => {
            const canvasId = `salesChart-${date}`;
            const ctx = document.getElementById(canvasId);

            if (ctx) {
                const products = Object.keys(yearlyStats[date]);
                const datasets = [{
                    label: 'Sales',
                    data: products.map(product => yearlyStats[date][product]),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }];

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: products,
                        datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Sales Amount'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 style={{marginLeft: "40%", fontSize: "2rem"}}>Yearly Stats</h2> <br/>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {Object.keys(yearlyStats).map(date => (
                    <div key={date} style={{ width: 'calc(33.33% - 20px)' }}>
                        <h3>{moment(date).format('MMMM DD, YYYY')}</h3>
                        <canvas id={`salesChart-${date}`} width="400" height="200"></canvas>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
