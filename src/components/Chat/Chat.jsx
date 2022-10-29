import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { Context } from '../..';
import Loader from '../Loader/Loader';
import './Chat.css';
import { collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy, } from "firebase/firestore";
import { useEffect } from 'react';

function Chat() {
   const { auth, db } = useContext(Context);
   const [user] = useAuthState(auth);
   const [value, setValue] = useState('');
   const [messages, loading] = useCollectionData(
      query(collection(db, 'messages'), orderBy('createdAt', 'asc'))
   )
   // const [messages, setMessages] = useState([]);

   const sendMessage = async () => {
      const docRef = await addDoc(collection(db, 'messages'), {
         uid: user.uid,
         displayName: user.displayName,
         photoURL: user.photoURL,
         text: value,
         createdAt: Timestamp.fromDate(new Date()),
      });
      setValue('');
   }

   // const getMessages = async () => {
   //    const q = await query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

   //    onSnapshot(q, (querySnapshot) => {
   //       console.log(querySnapshot)

   //       querySnapshot.docs.map((doc) => {
   //          setMessages(...messages, doc.data());
   //       });
   //       console.log(messages)
   //    });
   // }

   // useEffect(() => {
   //    getMessages();
   // }, []);

   if (loading) {
      return (
         <Loader />
      )
   }

   return (
      <Container className='chat-container'>
         <Grid container className='all-grid'>
            <div className="chat">
               {messages.map(message =>
                  <div 
                     className='message'
                     key={message.createdAt}
                     style={{
                        border: user.uid === message.uid ? '1px solid green' : '1px solid red',
                        marginLeft: user.uid === message.uid && 'auto',
                        maxWidth: '80%',
                        width: 'fit-content'
                     }}
                  >
                     <Grid className='info' container>
                        <Avatar style={{marginRight: '10px'}} src={message.photoURL} />
                        <div>{message.displayName}</div>
                     </Grid>
                     <div>{message.text}</div>
                  </div>
               )}
            </div>
            <Grid container className='chat-grid'>
               <TextField value={value} onChange={(e) => setValue(e.target.value)} maxRows={2} fullWidth varian={'outlined'} />
               <Button onClick={sendMessage} style={{ width: 'auto', margin: '10px' }}>Отправить</Button>
            </Grid>
         </Grid>
      </Container>
   );
}

export default Chat;