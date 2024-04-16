import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Statshome = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [topSellingProduct, setTopSellingProduct] = useState(null);
  const [topSellingProductImage, setTopSellingProductImage] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    createCharts();
    fetchTopSellingProduct();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8079/carts/itemsWithOrderIds');
      setCartItems(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  const fetchTopSellingProduct = async () => {
    if (cartItems.length === 0) return;
  
    // Get today's date
    const today = moment().format('YYYY-MM-DD');
  
    // Group cart items by item name and calculate total quantity sold for each item
    const itemStats = {};
    cartItems.forEach(item => {
      const { name, quantity, date } = item;
      if (moment(date).isSame(today, 'day')) {
        if (!itemStats[name]) {
          itemStats[name] = {
            totalQuantity: quantity
          };
        } else {
          itemStats[name].totalQuantity += quantity;
        }
      }
    });
  
    // Find top selling product
    let maxQuantity = 0;
    let topProduct = null;
    Object.keys(itemStats).forEach(name => {
      if (itemStats[name].totalQuantity > maxQuantity) {
        maxQuantity = itemStats[name].totalQuantity;
        topProduct = name;
      }
    });
  
    setTopSellingProduct(topProduct);
  
    // Fetch the list of products to find the image URL of the top-selling product
    try {
      const response = await axios.get('http://localhost:8081/listProduct');
      const productList = response.data;
      const topProductObject = productList.find(product => product.name === topProduct);
      if (topProductObject) {
        setTopSellingProductImage(topProductObject.image);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching product list:', error);
    }
  };
  

  const createCharts = () => {
    if (cartItems.length === 0) return;
  
    // Group cart items by item name and calculate total cost and total quantity for each item
    const itemStats = {};
    cartItems.forEach(item => {
      const { name, price, quantity } = item;
      const subtotal = price * quantity;
      if (!itemStats[name]) {
        itemStats[name] = {
          totalQuantity: quantity,
          totalCost: subtotal
        };
      } else {
        itemStats[name].totalQuantity += quantity;
        itemStats[name].totalCost += subtotal;
      }
    });
  
    // Prepare data for rendering charts
    const labels = Object.keys(itemStats);
    const totalCosts = labels.map(label => itemStats[label].totalCost);
    const totalQuantities = labels.map(label => itemStats[label].totalQuantity);
  
    // Render chart
    renderChart(labels, totalCosts, totalQuantities);
  };
  
  const renderChart = (labels, costs, quantities) => {
    const ctx = document.getElementById('myChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Total Cost by Item',
            data: costs,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: quantities,
            label: 'Total Quantity by Item',

          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div> <br/> <br/> <br/> <br/>
      <h2 style={{ marginLeft: "5%" }}>Top Selling Product: {topSellingProduct}</h2> <br/>
      {/* {topSellingProductImage && (
        <div style={{ textAlign: 'center',width: "30%" }}>
          <img src={topSellingProductImage} alt="Top Selling Product" style={{ maxWidth: '1000px' }} />
        </div>
      )} */}
      <div style={{ width: '600px', margin: '10px auto' }}>
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>
  );
};

export default Statshome;
