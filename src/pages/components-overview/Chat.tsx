
/* eslint-disable */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { AppBar, Avatar, Box, Button, CardContent, CardMedia, Grid, IconButton, InputBase, Paper, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import useChatScroll from '../../hooks/useScroll';
import { v4 as uuidv4 } from 'uuid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TimelineDot from '@mui/lab/TimelineDot';

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
import { useCampaingByIdQuery, useSendNotificationToClientMutation } from '../../generated/graphql';
import { database } from '../../lib/firebase';

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

export default function Chat() {
  const theme = useTheme()
  const { id } = useParams()

  const { data, loading, error } = useCampaingByIdQuery({
    variables: {
      getCampaingByIdId: id!
    }
  })

  const [sendNotification, { data: dataMsg, loading: loadingMsg }] = useSendNotificationToClientMutation()

  const idConsultant = data?.getCampaingById.consultant._id!
  const idClient = data?.getCampaingById.client._id!

  const [messages, setMessages] = useState<IMessage[]>([])
  const [status, setStatus] = useState<boolean>(false)

  const chats = collection(database, "chats");
  const chatId = doc(chats, `${id!}`);
  const room = collection(chatId, "room");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate()

  const messagesEndRef = useChatScroll(messages, id!, status)

  const ref = useRef<HTMLButtonElement | null>(null);

  const [text, setText] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputRef.current) return

    if (!text.trim()) return

    const to = {
      id: idClient,
      email: data?.getCampaingById.client.email,
      name: data?.getCampaingById.client.name,
    };

    const from = {
      id: idConsultant,
      email: data?.getCampaingById.consultant.email,
      name: data?.getCampaingById.consultant.name,
      office: data?.getCampaingById.consultant.office
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

    if (!status) {
      sendNotification({
        variables: {
          input: {
            client: idClient,
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

  const asdf = async () => {
    const docRef = doc(chats, `${id!}`);
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      setStatus(querySnapshot.data()?.status)
    })
    // unsubscribe()
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

  useEffect(() => {
    if (!loading && data) {
      getChat();
      asdf()
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [data, loading]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)' }}>
      <AppBar position="static" elevation={0}>
        <Grid pl={2} bgcolor="#f2f2f2">
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" gap={2}>
              <ArrowBackIcon sx={{ color: theme.palette.primary.main, cursor: 'pointer' }} onClick={() => navigation(-1)} />
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: 16,
                    color: 'black'
                  }}>
                  {data?.getCampaingById.client.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: 5, backgroundColor: status ? 'green' : 'red' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 12,
                      color: 'gray'
                    }}>
                    {status ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Toolbar>
        </Grid>
      </AppBar>
      <Box sx={{ display: 'flex', width: '100%', minHeight: 'min(76vh, 718px)', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
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
            if (message.url === undefined) {
              if (message.from.id === idClient) {
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

              if (message.from.id === idConsultant) {
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
            }

            if (message.url !== undefined) {
              if (message.from.id === idClient) {
                return <Box key={message.id} sx={{
                  maxWidth: {
                    xs: '70%',
                    sm: '30%'
                  },
                  margin: '10px 0'
                }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={message.url}
                    alt="Paella dish"
                  />
                  <CardContent sx={{ backgroundColor: '#f2f2f2' }}>
                    <Typography variant="h6" color="text.secondary">
                      {message.status}
                    </Typography>
                  </CardContent>
                  <Typography mt={.5} mr={.5} fontSize={13} sx={{ color: 'rgba(0,0,0,.4)' }} textAlign="right">{dayjs(message.time).format('HH:mm')}</Typography>
                </Box>
              }

              if (message.from.id === idConsultant) {
                return <Box key={message.id} sx={{
                  maxWidth: {
                    xs: '70%',
                    sm: '50%',

                  },
                  alignSelf: 'self-end',
                  margin: '5px 0'
                }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={message.url}
                    alt="Paella dish"
                  />
                  <CardContent sx={{ backgroundColor: '#f2f2f2' }}>
                    <Typography variant="h6" color="text.secondary">
                      {message.status}
                    </Typography>
                  </CardContent>
                  <Typography mt={.5} mr={.5} fontSize={13} sx={{ color: 'rgba(0,0,0,.4)' }} textAlign="right">{dayjs(message.time).format('HH:mm')}</Typography>
                </Box>
              }
            }
          })}
        </Paper>
      </Box>
      <Paper sx={{ borderRadius: 0, borderTop: '1px solid rgba(0,0,0,0.1)', padding: 2 }} elevation={0}>
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
    </Box >
  );
}