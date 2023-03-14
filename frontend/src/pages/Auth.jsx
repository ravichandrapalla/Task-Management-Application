import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import classes from "./Auth.module.scss";
import useAuth from '../hooks/useAuth';

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);
    return(
        <Layout>
            <div className={classes.form_container}>
                <Login />
                <Register />
            </div>
        </Layout>
    )
}
export default Auth;