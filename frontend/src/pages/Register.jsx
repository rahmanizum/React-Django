import React from 'react'
import Form from '../components/Form';
import { API_ENDPOINT } from "../constants";

const Register = () => {
  return (
    <Form route={API_ENDPOINT.REGISTER} method="register" />
  )
}

export default Register