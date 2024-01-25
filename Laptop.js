import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Laptop() {
    const [allLaptop,setAllLaptop]=useState([""]);
    useEffect(()=>{
      const fetchLaptops= async ()=>{
         try{
             const response = await fetch ('http://localhost:4000/api/category/laptop');
             const data = await response.json();  
             setAllLaptop(data)  
         }
         catch(error){   
             console.error('Error fetching data:',error)  
         }
      }  
      fetchLaptops()    
     },[])
   return (
     <div>
         <div>
             <h1>Laptops</h1>
             <Row>
                 {allLaptop.map((product)=>(
                  <Col xs={12} md={3} lg={4}>
                     <div style={{ border: '1px solid #ddd', padding: '10px', margin: '20px'}}>
                         <Link to={`/product/${product._id}`}>
                             <img src={product.image} alt='product image' style={{maxWidth:"100%",height:"350px"}}></img>
                             <h4>{product.title}</h4>
                         </Link>
                         <h4>₹{product.price}/-</h4>
                     </div>
                  </Col>   
                 ))}
                 
             </Row>
         </div>
       
     </div>
   )
 }
 
 export default Laptop
 