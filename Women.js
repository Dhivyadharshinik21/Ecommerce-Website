import React from 'react'
import "./Women.css";
import { useState, useEffect } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import womenbnr1 from "../Images/womenbnr1.png";

function Women() {
  const [alldata, setAlldata] = useState([]);

  useEffect(() => {
    const fetchWomen = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/category/women');
        const data = await response.json();
        setAlldata(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWomen();
  }, []);
  return (
    <div>
      <div className='women'> 
      
          <img src={womenbnr1} className='women_banner'></img> 
       
          </div>
     
      <div className="">
        <h1>Women's Clothings</h1>
        <Row>
          {alldata.map((product) => (
            <Col xs={12} md={4} lg={3}>
              <div style={{ border: '1px solid #ddd', padding: '10px', margin: '20px' }}>
                <Link to={`/product/${product._id}`}><img src={product.image} alt={`Product`} style={{ maxWidth: '100%', height: '350px' }} />
                  <h4>{product.title}</h4></Link>
                <h4>{product.price}</h4>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Women
