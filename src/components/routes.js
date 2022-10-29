import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";

// роуты, к которым имеет доступ даже не авторизованный user
export const publicRoutes = [
   {
      // '/login
      path: LOGIN_ROUTE,
      // компонент, который отрисовывается по этому пути
      Component: Login
   }
];

// роуты, к которым есть доступ только у авторизованных users
export const privateRoutes = [
   {
      // '/chat'
      path: CHAT_ROUTE,
      Component: Chat
   }
];