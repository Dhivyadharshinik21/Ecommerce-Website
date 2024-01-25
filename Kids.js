import React from 'react';
import "./Kids.css";
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { Row,Col, Card } from 'react-bootstrap';
import kidsimg from "../Images/kidsimg.gif";

function Kids() {
    const [alldata, setAlldata] = useState([]);     
    useEffect(() => {
        const fetchKids= async () => {
          try {
            const response = await fetch('http://localhost:4000/api/category/kids');
            const data = await response.json();
            setAlldata(data);
          } catch (error){
            console.error('Error fetching data:', error);   
          }
        }; 
       fetchKids();
      }, []);
  return (
    <div>
    <Row>
      <Col md={4}></Col>
        <Col md={4} >
          <Card.Body className='kids_cardbody'><img src={kidsimg}></img></Card.Body>  
        </Col>
        <Col md={4}></Col>
      </Row>
      <div className="products">
      <h1>Kid's Clothings</h1>
    <Row>
        {alldata.map((product, ) => (
          <Col xs={12} md={4} lg={3}>
            <div style={{ border: '1px solid #ddd', padding:'10px', margin:'20px' }}>
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

export default Kids
