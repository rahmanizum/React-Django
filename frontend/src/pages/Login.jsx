import React from 'react'
import Form from '../components/Form';
import { API_ENDPOINT } from "../constants";

const Login = () => {
  return (
    <Form route={API_ENDPOINT.GET_TOKEN} method="login" />
  )
}

export default Login