/* eslint-disable */
import React, { useState, MouseEvent, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, IconButton, ImageListItemBar, ListItemIcon, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box } from '@mui/system';
import { IFile } from '../@types/cyber';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { useApproveFileMutation, useRemoveFileFromCampaingMutation } from '../generated/graphql';
import api from '../config/api';

export default function VideoListPreview({
  handleToggle,
  setUrl,
  dataVideos,
  openModal,
  handleFileType,
  campaingId,
  reload
}: {
  handleToggle: (value: boolean) => void
  setUrl: (value: string) => void
  dataVideos: IFile[]
  openModal: (value: boolean) => void
  handleFileType?: (type: 'image' | 'video') => void
  campaingId: string
  reload: () => void

}) {
  const theme = useTheme()

  const [approve, { data, loading, error }] = useApproveFileMutation()
  const [removeFileVideo, { data: dataRemoveVideo, loading: loadingRemoveVideo, error: errorRemoveVideo }] = useRemoveFileFromCampaingMutation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [video, setVideo] = useState<IFile | null>(null)

  const media = () => {
    const xs = useMediaQuery(theme.breakpoints.down('xs'))
    const sm = useMediaQuery(theme.breakpoints.down('sm'))
    const md = useMediaQuery(theme.breakpoints.down('md'))
    const lg = useMediaQuery(theme.breakpoints.up('md'))

    if (xs) return 3
    if (sm) return 3
    if (md) return 4
    if (lg) return 6
  }

  const handleApproveFile = () => {
    if (video) {
      approve({
        variables: {
          input: {
            id_campaing: campaingId,
            id_file: video.id,
            approved: !video.approved,
            typeFile: 'video'
          }
        }
      })
    }
  }

  const handleDeleteVideo = async () => {
    if (video) {
      await api.post('/delete', { filename: video.firebasePath, folder: video.folder }).then(res => {
        if (res.data) {
          removeFileVideo({
            variables: {
              input: {
                campaingId,
                fileId: video.id,
                folder: video.type
              }
            }
          })
        }
      }).catch(err => console.log('err', err))
    }
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!loading && data) {
      setAnchorEl(null)
      reload()
    }
  }, [loading, data])


  useEffect(() => {
    if (!loadingRemoveVideo && dataRemoveVideo) {
      setAnchorEl(null)
      reload()
    }
  }, [loadingRemoveVideo, dataRemoveVideo])

  return (
    <>
      {!!!dataVideos.length && <Stack direction='column' mt={2}>
        <Typography>Nenhum vídeo cadastrado</Typography>
        <Box mt={1}>
          {handleFileType && openModal && <Button variant='outlined' startIcon={<AddIcon />} sx={{ marginRight: 1 }} onClick={() => {
            openModal(true)
            handleFileType('video')
          }}>Adicionar</Button>}
        </Box>
      </Stack>
      }
      <ImageList variant="masonry" cols={media()} gap={3}>
        {dataVideos.map((item) => (
          <ImageListItem key={item.url} sx={{
            position: 'relative', display: 'grid', overflow: 'hidden', placeItems: 'center', cursor: 'pointer', '& .MuiImageListItem-img': {
              transition: 'all 300ms ease',
            }, '&:hover .MuiImageListItem-img': {
              transform: 'scale(1.05)'
            }
          }}>
            <img
              src={`${item.thumb}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />

            <PlayCircleIcon sx={{ position: 'absolute', width: 50, height: 50, backgroundColor: '#transparent', borderRadius: 25, zIndex: 2, fill: '#fff' }} />
            <Box
              onClick={() => {
                setUrl(item.url)
                handleToggle(true)
              }}
              sx={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, .2)',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }} />
            <ImageListItemBar
              sx={{
                '& .MuiImageListItemBar-subtitle': {
                  color: '#fff',
                  backgroundColor: theme.palette.primary.main,
                  width: 'max-content',
                  padding: '2px 7px',
                  borderRadius: '8px',
                  marginTop: '2px',
                },
                zIndex: 3
              }}
              title={item.title}
              subtitle={item.approved ? "Aprovado" : ''}
              onClick={e => {
                setVideo(item)
                handleClick(e)
              }}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <MoreVertIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {video !== null && <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleApproveFile()}>
          <ListItemIcon>
            {video.approved ? <CloseIcon fontSize="small" /> : <CheckIcon fontSize="small" />}
          </ListItemIcon>
          {video.approved ? 'Remover aprovação' : 'Aprovar'}
        </MenuItem>
        <MenuItem onClick={() => handleDeleteVideo()}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Deletar
        </MenuItem>
        {/* <MenuItem disabled>
          <ListItemIcon>
            <CropOriginalIcon fontSize="small" />
          </ListItemIcon>
          Alterar thumbnail
        </MenuItem> */}
      </Menu>}
    </>
  );
}