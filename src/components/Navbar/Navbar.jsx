import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { Context } from '../..';
import { LOGIN_ROUTE } from '../../utils/consts';
import './Navbar.css';

function Navbar() {
   const {auth} = useContext(Context)
   const [user] = useAuthState(auth);

   return (
      <div className='Navbar'>
         <AppBar color={'secondary'} position="static">
            <Toolbar>
               <Grid container className='navbar-grid'>
                  {user
                  ? <Button onClick={() => auth.signOut()} className='navbar-btn'>Выход</Button>
                  : <NavLink to={LOGIN_ROUTE}><Button className='navbar-btn'>Логин</Button></NavLink>
                  }
               </Grid>
            </Toolbar>
         </AppBar>
      </div>
   );
}

export default Navbar;