import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your Modal component
import "./AdminProduct.css";
import AdminAddProducts from "./AdminAddProducts"

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the update modal
  const [showAdminAddProducts, setAdminAddProducts] = useState(false); // State to control the add modal

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      console.log("Fetching all products...");
      const response = await axios.get(`http://localhost:8081/listProduct`);
      console.log("All products response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/${productId}`);
      console.log("Product deleted:", response.data);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    console.log("Modal should be shown now");
  };

  const handleAddProduct = () => {
    setAdminAddProducts(true);
  };

  const addProduct = async (newProduct) => {
    try {
      
      console.log("New product added:", newProduct);
      setAdminAddProducts(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const formData = new FormData();
  
      formData.append('name', updatedProduct.name);
      formData.append('description', updatedProduct.description);
      formData.append('price', updatedProduct.price);
      formData.append('category', updatedProduct.category);
      formData.append('vegetarian', updatedProduct.vegetarian);
  
      const response = await axios.put(`http://localhost:8081/updateProduct/${updatedProduct.id}`, formData);
      console.log("Product updated:", response.data);
      setProducts(prevProducts =>
          prevProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  




  const closeModal = () => {
    setShowModal(false);
    setAdminAddProducts(false); 
  };

  let srno = 1; 

  return (
    <>
      <div>
        <div style={{display: "flex"}}>
          <div style={{marginLeft: "40%"}}>
            <h1>All Products</h1>
          </div>
          <div style={{marginLeft: "25%"}}>
            <button onClick={handleAddProduct} style={{borderRadius: "2rem"}}>Add Product</button>
          </div>
        </div> <br/>
        <table>
          <thead style={{backgroundColor: "gray", color: "whitesmoke", fontFamily: "Arial, sans-serif"}}>
            <tr>
              <th>Sr No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{srno++}</td> 
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td><img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{borderRadius: "2rem"}}>Delete</button>
                </td>
                <td>
                  <button onClick={() => handleUpdateProduct(product)} style={{borderRadius: "2rem"}}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <Modal product={selectedProduct} updateProduct={updateProduct} closeModal={closeModal} showModal={showModal} />}
      {showAdminAddProducts && <AdminAddProducts addProduct={addProduct} closeModal={closeModal} />}
    </>
  );
};

export default AdminProducts;