import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
}
  from 'mdb-react-ui-kit';

const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const signup = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        console.log("User created: ", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing up: ", error);
      });
  }

  return (
    <MDBContainer fluid className="my-3">
      <MDBRow>
        <MDBCol md='6' className='form-column d-flex flex-column align-items-center justify-content-center'>
          <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="envelope me-3" size='lg' />
            <MDBInput
              label='Your Email'
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className='w-100'
            />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg' />
            <MDBInput
              label='Password'
              placeholder="*********"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className='w-100'
            />
          </div>

          <MDBBtn className='mb-4' size='lg' onClick={signup}>Register</MDBBtn>
        </MDBCol>

        <MDBCol md='6' style={{ position: "relative" }} className="d-flex align-items-center justify-content-center">
          <img src="https://source.unsplash.com/6o-K6uyKD2U" className="img-fluid rounded mb-3 shadow" alt="Bedroom" style={{ width: '100vw', height: '100vh' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
