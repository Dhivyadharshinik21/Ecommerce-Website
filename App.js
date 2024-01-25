import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import { Navbar, NavbarBrand, Container, Button, Nav } from 'react-bootstrap';
import { Row ,Col,Form, NavDropdown, NavLink}from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Women from './Components/Women';
import Men from './Components/Men';
import Kids from './Components/Kids';
import Productview from './Components/Productview';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';
import Mobile from './Components/Mobile';
import { Link } from 'react-router-dom';
import { useCart } from './Components/CartContext';
import Laptop from './Components/Laptop';

const CartButton = () => {
  const username= sessionStorage.getItem("username")
  const { cart } = useCart();
 

  return (
     <Link to="/cart">
      <Button variant="outline-info" ><i className="bi bi-cart"></i>
     ({cart.length})</Button>
    </Link>

  );
};

function App() {
  const [search, setSearch] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(`http://localhost:4000/api/searchGet?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSearch = () => {
    fetchData(search);
  };


  return (
    <CartProvider>
        <BrowserRouter>
    <div className="App">
    
      <div>
        <Navbar expand="lg" className="home_navbar">
          <Container fluid>
            <NavbarBrand href='/allproduct'><span className='Brand_name'>Shopping Wonders</span></NavbarBrand>
           
        
            <Nav.Link href="/login" className='login'><Button variant="outline-info"><i className="bi bi-person-circle"></i>Login</Button></Nav.Link>
           
            {/* <Nav.Link href="/cart"></Nav.Link> */}
            <CartButton />
        
          </Container>
        </Navbar>
      </div>
      <div className='home_navbar2'>

       <Navbar  expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background:"white"}}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="b1">
            <Nav.Link href="/allproduct" style={{ color: "white" }}>All-Products</Nav.Link>
            <Nav.Link href="/Women" style={{ color: "white" }}>Women</Nav.Link>
            <Nav.Link href="/Men" style={{ color: "white" }}>Men</Nav.Link>
            <Nav.Link href="/Kids" style={{ color: "white" }}>Kids</Nav.Link>
            <NavDropdown title={<span className='p3'>Electronics</span>} >
        <NavDropdown.Item href='/mobile'>Mobiles</NavDropdown.Item>
        <NavDropdown.Item href='/laptop'>Laptops</NavDropdown.Item>
       </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allproduct' element={<Home />} />
          <Route path='/women' element={<Women />} />
          <Route path='/men' element={<Men />} />
          <Route path='/kids' element={<Kids />} />
          <Route path='/product/:_id' element={<Productview />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mobile' element={<Mobile/>}></Route>
          <Route path='/laptop' element={<Laptop/>}></Route>
        </Routes>
      
    </div>
    </BrowserRouter>
      </CartProvider>
  );
}

export default App;
