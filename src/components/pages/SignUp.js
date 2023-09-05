import React, { useContext, useState } from 'react';
import { CartContext } from '../../ context/cartContext';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../../scss/login.scss';

export default function Login() {
  const { loggedIn, setLoadingPage } = useContext(CartContext);
  const navigate = useNavigate();
  let [loginStatus, setLoginStatus] = useState('');

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let { email, password } = values;
      setLoadingPage(true);
      try {
        let result = await fetch('https://audio-first.herokuapp.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation {
                signUp(email: "${email}", password: "${password}") {
                  code
                  success
                  message
                  user {
                    email
                    password
                  }
              }
            }
          `,
          }),
        });
        result = await result.json();
        if (result.data.signUp.code === 200) {
          loggedIn(true);
          setLoginStatus(`${result.data.signUp.message}`);
          setLoadingPage(false);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
        if (result.data.signUp.code === 401) {
          setLoadingPage(false);
          setLoginStatus(`${result.data.signUp.message}`);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="sign-up">
      <div className="sign-up__container">
        <h4 className="sign-up__heading">SIGN UP</h4>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className="sign-up__input"
            fullWidth
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <button className="sign-up__submit-btn" type="submit">
            SIGN UP
          </button>
        </form>
        {loginStatus && <p className="sign-up__status">{loginStatus}</p>}
      </div>
    </div>
  );
}
