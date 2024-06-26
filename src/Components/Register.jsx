import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {Add, Update} from '../Utils/firebaseRequests'



function Register() {
  
  const RegisteredUsers = useSelector((state) => state?.rootReducer.RegisteredUsers)
  const [submitted, setsubmitted] = useState(false);
  const [Errors,setErrors] = useState({
    fName: "",
    lName: "",
    user:"",
    pass: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [formData, SetformData] = useState({
    firstName: "",
    lastName: "",
    UserName:"",
    Password: "",
    Permission: false,
    JoinedAt : new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    ProdcutsBought:[],
    type:"costumer"
});

const findFormErrors = () =>{
  const { firstName,lastName, Password, UserName } = formData
  const newErrors = {}
  // pass errors
  if ( !Password || Password === '' ) newErrors.pass = 'Please Insert Password'
  else if ( Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) == null ) 
    newErrors.pass = 'PassWord must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
  // username errors
  if ( !UserName || UserName === '' ) newErrors.user = 'Please Insert UserName'
  else if (RegisteredUsers?.find((x)=>x.UserName == UserName)) newErrors.user = 'UserName is already taken!'
  //names errors
  if ( !firstName || firstName === '' ) newErrors.fName = 'Please Insert first Name'
  if ( !lastName || lastName === '' ) newErrors.lName = 'Please Insert last Name'
  return newErrors
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } 
    else{
      const newId = await Add(formData,"RegisteredUsers")
      const obj = {...formData,id:newId}
      dispatch({type:"ADD_USER",payload:obj})
      Update(obj,"RegisteredUsers")
      navigate("/login")
    }
    setsubmitted(true);
    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    SetformData({
        ...formData,
        [name]: value,
    });
};

  return (
    <div className='container General'>
    <Form onSubmit={handleSubmit}>
      
      <Form.Group as={Col} md="4" controlId="validationFName">
        <Form.Label><strong>First name</strong></Form.Label>
        <Form.Control
          required
          name="firstName"
          onChange={handleChange}
          type="text"
          isInvalid={submitted  && Errors.fName}
          placeholder="First name"
        />
           <Form.Control.Feedback type="invalid">
          {Errors.fName}
          </Form.Control.Feedback>
        </Form.Group>
        <br />
      <Form.Group as={Col} md="4" controlId="validationLName">
        <Form.Label><strong>Last name</strong></Form.Label>
        <Form.Control
          required
          name="lastName"
          onChange={handleChange}
          type="text"
          isInvalid={submitted  && Errors.lName}
          placeholder="Last name"
        />
           <Form.Control.Feedback type="invalid">
          {Errors.lName}
          </Form.Control.Feedback>
        </Form.Group>
        <br />
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label><strong>Username</strong></Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            name="UserName"
            onChange={handleChange}
            type="text"
            placeholder="Username"
            isInvalid={submitted  && Errors.user}
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
          {Errors.user}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />
      <Form.Group as={Col} md="4" controlId="validationCustomPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            value={formData.Password}
            type="text"
            name="Password"
            onChange={handleChange}
            placeholder="Password"
            isInvalid={submitted  && Errors.pass}
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
             {Errors.pass}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />
    <Form.Group className="mb-3">
      <Form.Check
        label="Allow others to see my orders"
        name="Permission"
      onChange={handleChange}
      />
     
    </Form.Group>
    <Button type="submit">Sign Up!</Button>
  </Form>
    </div>
      );
}


export default Register;