import React, { useState,useEffect } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate=useNavigate();
    const [register, { isLoading, data, error }] = useRegisterMutation();
    useEffect(() => {
        if (error) {
          toast.error(error?.data?.message);
        }
      }, [error]);
      const handleSubmitClick = (e) => {
        e.preventDefault();
        const registerData = {
            name,
          email,
          password,
        };
        console.log(data)
        register(registerData);
        navigate('/')
      };
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
          enctype="multipart/form-data"
          onSubmit={handleSubmitClick}
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label for="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>

          <div className="mb-3">
            <label for="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
