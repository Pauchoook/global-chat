import React, { useContext } from 'react';
import './Login.css';
import { Grid, Container, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Context } from '../..';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
   const {auth} = useContext(Context);
   let user;

   // по нажатию на кнопку
   const login = async () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then(result => {
            user = result.user;
         })
   }

   return (
         <Container>
            <Grid container className='all-grid'>
              <Grid container className='login-grid-form'>
               <Box p={5}>
                  <Button onClick={login} variant={'outlined'}>Войти с помощью Google</Button>
               </Box>
              </Grid>
            </Grid>
         </Container>
   );
}

export default Login;