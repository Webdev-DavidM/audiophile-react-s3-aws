import React, { useContext, useState } from 'react';
import { CartContext } from '../../ context/cartContext';
import TextField from '@material-ui/core/TextField';
import { useFormik, Form, FormikProvider } from 'formik';
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
      console.log('hit');
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
            query {
            logIn(email: "${email}", password: "${password}") {
                code
                success
                message
              }
            }
          `,
          }),
        });
        result = await result.json();
        if (result.data.logIn.code === 200) {
          loggedIn(true);
          setLoginStatus(`${result.data.logIn.message}`);
          setLoadingPage(false);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
        if (result.data.logIn.code === 404) {
          setLoadingPage(false);
          setLoginStatus(`${result.data.logIn.message}`);
        }
        if (result.data.logIn.code === 401) {
          setLoadingPage(false);
          setLoginStatus(`${result.data.logIn.message}`);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="login">
      <div className="login__container">
        <h4 className="login__heading">LOG IN</h4>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <TextField
              className="login__input"
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
            <button
              className="login__submit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              LOGIN
            </button>
          </Form>
        </FormikProvider>
        {loginStatus && <p className="login__status">{loginStatus}</p>}
      </div>
    </div>
  );
}
