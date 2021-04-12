import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from './actions';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const INITIAL_STATE = { username:"testuser", password:"password" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(login(formData));
    history.push('/user-routine')
  };

  const handleChange = evt => {
    const { name, value }= evt.target;
    setFormData(fData => ({
    ...fData,
    [name]: value
    }));
  };

  return (
    <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="username" name="username" id="username" value={formData.username} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

export default Login;