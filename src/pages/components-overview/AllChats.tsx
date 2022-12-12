/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react'
import { Stack, AppBar, Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Toolbar, Typography, useTheme, Chip, ListItemIcon, ListItemButton, styled, Badge } from '@mui/material'
import ChatSupport from "../../components/ChatSupport"
import { database } from '../../lib/firebase'
import { collection, doc, documentId, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router'

const chatsRef = collection(database, "support")

export type IChat = {
  id: string
  email: string
  name: string
  count: number
  status: boolean
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function AllChats() {

  const { user } = useAuth()
  const theme = useTheme()
  const navigation = useNavigate()

  const [chats, setChats] = useState<IChat[]>([])
  const [client, setClient] = useState<IChat | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const chatsRef = collection(database, "support");

  const getChats = async () => {
    const chatQuery = query(chatsRef);
    const unsubscribe = onSnapshot(chatQuery, async (querySnapshot) => {
      const chat: any[] = [];
      querySnapshot.forEach(async (document) => {
        if (document.data().support.count) {
          chat.push({
            id: document.data().id,
            email: document.data().email,
            name: document.data().name,
            count: document.data().support.count,
            status: document.data().status
          })
        } else {
          chat.push({
            id: document.data().id,
            email: document.data().email,
            name: document.data().name,
            count: 0,
            status: document.data().status
          })
        }
      });
      setChats(chat)
    })
  }



  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigation('/dashboard');
      return
    } else {
      getChats()
    }
  }, [])

  return <Grid container>
    <Grid item xs={3} md={3}>
      <Box>
        <AppBar position="static" elevation={0}>
          <Grid pl={2} sx={{ backgroundColor: "#f2f2f2" }}>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                color="secondary"
                sx={{
                  fontSize: 18,
                }}>
                Chats
              </Typography>
            </Toolbar>
          </Grid>
        </AppBar>
        <Box sx={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 160px)', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              maxHeight: 'calc(100vh - 160px)',
              flexDirection: 'column',
              width: '100%', borderRadius: 0,
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
              backgroundColor: '#f2f2f2'
            }}>
            <List sx={{ width: '100%' }}>
              {chats.map((e, index) => <Fragment key={e.id}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => {
                    setClient({ email: e.email, name: e.name, id: e.id, count: e.count, status: e.status })
                    handleListItemClick(event, 0)
                    setSelectedIndex(index)
                  }}
                >
                  <StyledBadge
                    color={e.status ? 'success' : 'error'}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={e.name} src="/static/images/avatar/1.jpg" />
                  </StyledBadge>
                  <ListItemText
                    primary={e.name}
                    secondary={e.email}
                    sx={{ mt: 1.5, ml: 2 }}
                  />

                  {e.count > 0 && <ListItemIcon>
                    <Chip key={e.id} size="small" label={e.count} color='primary' variant='outlined' sx={{ borderRadius: 10 }} />
                  </ListItemIcon>}
                </ListItemButton>
                <Divider />
              </Fragment>)}
            </List>
          </Paper>
        </Box>
      </Box >
    </Grid>
    <Grid item xs={9} md={9}>
      {!client && <Grid sx={{ display: 'grid', gridTemplateRows: '60px 1fr 60px', minHeight: 'calc(100vh - 110px)' }}>
        <AppBar position="static" elevation={0} sx={{ height: '60px', backgroundColor: '#fff' }}>
        </AppBar>
        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', borderTop: '1px solid rgba(0,0,0,0.0)' }}>
          <Typography fontSize={18}>
            Clique em algum chat
          </Typography>
        </Paper>
        <Paper sx={{ height: '70px', borderRadius: 0, borderTop: '1px solid rgba(0,0,0,0.0)', padding: 2 }} elevation={0}>
        </Paper>
      </Grid >}
      {client && <ChatSupport client={client} />}
    </Grid>
  </Grid >
}