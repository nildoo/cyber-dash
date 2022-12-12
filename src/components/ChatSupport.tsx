
/* eslint-disable */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { AppBar, Avatar, Box, Button, CardContent, CardMedia, Grid, IconButton, InputBase, Paper, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  doc,
  onSnapshot,
  query,
  setDoc,
  collection,
  updateDoc,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from 'react-router';
import useChatScroll from '../hooks/useScroll';
import { database } from '../lib/firebase';
import { ClientDocument, useCampaingByIdQuery, useSendNotificationToClientMutation } from '../generated/graphql';
import { IChat } from '../pages/components-overview/AllChats';
import useChatScroll2 from '../hooks/useScroll2';

type IMessage = {
  id: string,
  from: {
    email: string
    id: string
    name: string
  },
  to: {
    email: string
    id: string
    name: string
  },
  message?: string
  time: Date
  url?: string
  status?: string
}

export default function ChatSupport({ client }: { client: IChat }) {
  const [sendNotification, { data: dataMsg, loading: loadingMsg }] = useSendNotificationToClientMutation()
  const theme = useTheme()
  const [messages, setMessages] = useState<IMessage[]>([])

  const chats = collection(database, "support");
  const chatId = doc(chats, client.id);
  const room = collection(chatId, "room");

  // const [status, setStatus] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate()

  const messagesEndRef = useChatScroll2(messages, client.id)

  const ref = useRef<HTMLButtonElement | null>(null);

  const [text, setText] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputRef.current) return

    if (!text.trim()) return

    const to = {
      email: client.email,
      name: client.name,
    };

    const from = {
      email: 'support@cyberforbusiness.com.br',
      name: "Suporte Cyber",
    }

    const idMsg = uuidv4();

    const msgData = {
      id: idMsg,
      message: text,
      from: from,
      to: to,
      time: dayjs().valueOf(),
    };

    setText('')


    await setDoc(doc(room, idMsg), msgData);

    if (!client.status) {
      sendNotification({
        variables: {
          input: {
            client: client.id,
            message: msgData.message,
            title: from.name!
          }
        }
      })
    }

    const countDoc = await getDoc(chatId);

    if (countDoc.exists() && countDoc.data()) {
      if (countDoc.data().client) {
        updateDoc(chatId, {
          client: {
            count: countDoc.data().client.count + 1
          },
        });
      } else {
        updateDoc(chatId, {
          client: {
            count: 1
          },
        });
      }
    } else {
      setDoc(chatId, {
        consultant: {
          count: 0,
        },
        client: {
          count: 1,
        },
      });
    }
  }

  async function getChat() {
    const chatQuery = query(room, orderBy("time"));
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chat: any[] = [];
      querySnapshot.forEach((doc) => {
        chat.push(doc.data());
      });
      setMessages(chat);
    });
  }

  // const asdf = async () => {
  //   const docRef = doc(chats, `${client.id}`);
  //   const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
  //     setStatus(querySnapshot.data()?.status)
  //   })
  //   // unsubscribe()
  // }

  useEffect(() => {
    getChat();
    // asdf()
  }, []);


  useEffect(() => {
    getChat();
  }, [client]);

  return (
    <Grid sx={{ display: 'grid', gridTemplateRows: '60px 1fr 60px', minHeight: 'calc(100vh - 110px)' }}>
      <AppBar position="static" elevation={0} sx={{ height: '60px' }}>
        <Grid pl={2} sx={{ backgroundColor: '#fff' }}>
          <Toolbar disableGutters>
            <Stack direction="column">
              <Typography
                sx={{
                  fontSize: 16,
                  color: 'black'
                }}>
                {client.name}
              </Typography>
              <Stack direction="row" alignItems="center" gap={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: 5, backgroundColor: client.status ? 'green' : 'red' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 12,
                      color: 'gray'
                    }}>
                    {client.status ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Toolbar>
        </Grid>
      </AppBar>
      <Paper sx={{ display: 'flex', flex: 1, width: '100%', borderTop: '1px solid rgba(0,0,0,0.1\)' }}>
        <Paper
          ref={messagesEndRef}
          elevation={0}
          sx={{
            display: 'flex',
            maxHeight: 'max(76vh, 718px)',
            flexDirection: 'column',
            width: '100%', borderRadius: 0,
            padding: 2,
            overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: '8px'
            },
            '::-webkit-scrollbar-track': {
              borderRadius: '10px'
            },
            '::-webkit-scrollbar-thumb': {
              background: 'red',
              borderRadius: '10px',
              backgroundColor: theme.palette.primary.dark
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.primary.main
            },
          }}>

          {messages.map(message => {
            if (message.from.email === client.email) {
              return <Box key={message.id} sx={{
                maxWidth: {
                  xs: '70%',
                  sm: '30%'
                },
                margin: '10px 0'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 14,
                    border: '1px solid rgba(0,0,0,0.1)',
                    width: 'max-content',
                    maxWidth: '100%',
                    padding: '10px',
                    borderRadius: 1,
                  }}>
                  {message.message}
                </Typography>
                <Typography mt={.5} ml={.5} fontSize={13} sx={{ color: 'rgba(0,0,0,.4)' }}>{dayjs(message.time).format('HH:mm')}</Typography>
              </Box>
            }

            if (message.from.email === 'support@cyberforbusiness.com.br') {
              return <Box key={message.id} sx={{
                maxWidth: {
                  xs: '70%',
                  sm: '30%'
                },
                alignSelf: 'self-end',
                margin: '5px 0'

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 14,
                    width: 'max-content',
                    maxWidth: '100%',
                    padding: '10px',
                    borderRadius: 1,
                    color: '#fff',
                    backgroundColor: theme.palette.primary.main
                  }}>
                  {message.message}
                </Typography>
                <Typography mt={.5} mr={.5} fontSize={13} sx={{ color: 'rgba(0,0,0,.4)' }} textAlign="right">{dayjs(message.time).format('HH:mm')}</Typography>
              </Box>
            }
          })}
        </Paper>
      </Paper>
      <Paper sx={{ height: '70px', borderRadius: 0, borderTop: '1px solid rgba(0,0,0,0.1)', padding: 2 }} elevation={0}>
        <form onSubmit={handleSubmit}>
          <Stack direction='row'>
            <InputBase
              ref={inputRef}
              sx={{ ml: 1, flex: 1, fontSize: 16, pr: 2 }}
              placeholder="Digite aqui..."
              inputProps={{ 'aria-label': 'new message' }}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button ref={ref} type="submit" variant="contained" sx={{ maxHeight: 40 }} endIcon={<SendIcon />}>
              Enviar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Grid >
  );
}