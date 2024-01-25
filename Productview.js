import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from './CartContext';
import "./Productview.css";
import Swal from "sweetalert2";


function Productview() {
  const { _id } = useParams();
  const [product, setProduct] = useState();
  const { cart, dispatch } = useCart()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/samplegetbyId/${_id}`);
        const data = await response.json();
        console.log("Product Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [_id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    Swal.fire(
      {
        title:'Added!',
        text:'Item has been added to your cart.',
        timer: 2000,
        position: 'bottom-right',
        showCancelButton: false,
        showConfirmButton: false
      }
      
    );
  }

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={4}>
          <Card.Body className="product_view">
            <div  style={{ border: '1px solid #ddd', padding:'10px', margin:'20px' }}>
            <img
              src={product.image}
              alt={`Product`}
              style={{ maxWidth: "100%", height:"350px" }}
            />
            <h4>{product.title}</h4>
            <h2>
              <i className="bi bi-currency-rupee"></i>
              {product.price}/-
            </h2>
            
            <Button variant="warning" onClick={addToCart} >
              ADD TO CART
            </Button>
            </div>
          </Card.Body>
        </Col>
        <Col md={4}>
          <div className="product_details">
            <h2>{product.title}</h2>
            <h2>
              <i className="bi bi-currency-rupee"></i>
              {product.price}/-
            </h2>
            <Button variant="success">
              {product.rating} <i className="bi bi-star-fill"></i>
            </Button>
            <p>{product.description}</p>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
}

export default Productview;
