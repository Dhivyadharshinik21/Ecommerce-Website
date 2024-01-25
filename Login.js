import { Card, Form, InputGroup } from "react-bootstrap";
import React, {useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Shoppingimg from "../Images/Shoppingimg.gif"
function Login() {
  const [user, setUser] = useState({
    username:"",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username:yup.string().required("Username is required"),
    email: yup.string().required("Email is required").matches(
        /^(?=.*[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)|(?=^[0-9]{10}$)/,
        "Invalid email or phone number"
      ),
    password: yup.string().required("Password is required")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log("submit");
    const data = {
      username:"",
      email: user.email,
      password: user.password,
    };
    sessionStorage.setItem("username",user.username)
    console.log(data);
    navigate("/allproduct")
  };
  return (
    <div>
      <Formik
        initialValues={user}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange }) => (
          <Row>
            <Col md={2}></Col>
            <Col md={4}>
             
                  <Card className="login_card">
                <Card.Body>
              <Form noValidate className="">
                <Form.Label>User Name</Form.Label>
                      <InputGroup.Text>
                        <Form.Control
                          placeholder="User Name"
                          type="text"
                          name="username"
                          value={user.username}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }} 
                        />
                       
                      </InputGroup.Text>
                   
                    <ErrorMessage name="username" className="text-danger" />
                   
                      <Form.Label>Email or Mobile Number</Form.Label>
                      <InputGroup.Text>
                        <Form.Control
                          placeholder="Email/Mobile Number"
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                       
                     </InputGroup.Text>
                    
                    <ErrorMessage name="email" className="text-danger" />
                     
                      <Form.Label>Password</Form.Label>
                      <InputGroup.Text>
                        <Form.Control
                          placeholder="Password"
                          type="text"
                          name="password"
                          value={user.password}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        
                      </InputGroup.Text>
                      <ErrorMessage name="password" className="text-danger" />
                    </Form>
                 
                    <Button className="login_submit" variant="info" type="submit" onClick={handleSubmit}>  Submit </Button>
                    </Card.Body>
                    </Card> 
                
            </Col>
            <Col md={4}>
            <Card.Body  className="login_img">
                  <img src={Shoppingimg}></img>
                  </Card.Body> 
                    </Col>
                  <Col md={2}></Col>
               </Row>
        )}
      </Formik>
    </div>
  );
}

export default Login;