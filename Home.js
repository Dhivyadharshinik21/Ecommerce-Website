import React from 'react';
import { useState , useEffect} from 'react';
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, NavbarBrand,Row ,Col,Form,Button, Nav ,NavDropdown,Container, NavLink, Carousel}from 'react-bootstrap';
import Img5 from "../Images/Img5.jpg";
import Img2 from "../Images/Img2.jpg";
import Img4 from "../Images/Img4.jpg";
import electronics from"../Images/electronics.png";
import { Link } from 'react-router-dom';


function Home() {
  const username= sessionStorage.getItem("username")
  const [alldata, setAlldata] = useState([]);

    useEffect(() => {
        const fetchAllproduct= async () => {
          try {
            const response = await fetch('http://localhost:4000/api/Sampleget');
            const data = await response.json();
            setAlldata(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }; 
      
        fetchAllproduct();
      }, []);
  return (
    <div>

    
    <div className='carousel'>
    
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
         <Carousel>
         <Carousel.Item interval={1000}>
         <img src={Img5} className='img5'></img>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
         <img src={Img2} className='img2'></img>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
         <img src={Img4} className='img4'></img>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
         <img src={electronics} className='img4'></img>
      </Carousel.Item>
      </Carousel>
      <div className='session_storage'>
        <Row>
        <Col md={3}></Col>
        <Col md={6}>
      <hr></hr>
      <br></br>
      <h1>Welcome {username}</h1>
      <br></br>
      <hr></hr>
      </Col>
      <Col md={3}></Col>
      </Row>
      </div> 
      </Col>
      <Col md={3}></Col>
      </Row>
      </Container>
    </div>
    <div className="products">
    <Row>
        {alldata.map((product, ) => (
          <Col xs={12} md={4} lg={2.5}>
            <div style={{ border: '1px solid #ddd', padding: '10px', margin: '20px' }}>
           <Link to={`/product/${product._id}`}><img src={product.image} alt={`Product`} style={{ maxWidth: '100%', height: '350px' }} />
             <h4>{product.title}</h4></Link> 
             <h4>₹{product.price}/-</h4>
            </div>
          </Col>
        ))}
      </Row>
      </div>

   </div>
   
        
   
  )
}

export default Home
