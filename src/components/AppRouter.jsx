import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes } from './routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from '..';

function AppRouter() {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   return user ?
      (
         <Routes>
            {privateRoutes.map(({path, Component }) =>
               <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='/*' element={<Navigate replace to={CHAT_ROUTE} />} />
         </Routes>
      )
      :
      (
         <Routes>
            {publicRoutes.map(({path, Component }) =>
               <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='/*' element={<Navigate replace to={LOGIN_ROUTE} />} />
         </Routes>
      )
}

export default AppRouter;