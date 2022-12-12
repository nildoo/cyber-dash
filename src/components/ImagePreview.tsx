/* eslint-disable */
import React, { useState, MouseEvent, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Button, IconButton, ImageListItemBar, ListItemIcon, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { IFile } from '../@types/cyber';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useApproveFileMutation, useRemoveFileFromCampaingMutation } from '../generated/graphql';
import api from '../config/api';

export default function ImageListPreview({
  handleToggle,
  setUrl,
  dataImages,
  addButton,
  openModal,
  handleFileType,
  campaingId,
  reload
}: {
  handleToggle: (value: boolean) => void
  setUrl: (value: string) => void
  dataImages: IFile[]
  addButton?: boolean
  openModal?: (value: boolean) => void
  handleFileType?: (type: 'image' | 'video') => void
  campaingId: string
  reload: () => void
}) {

  const theme = useTheme()

  const [approve, { data, loading, error }] = useApproveFileMutation()
  const [removeFile, { data: dataRemove, loading: loadingRemove, error: errorRemove }] = useRemoveFileFromCampaingMutation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [image, setImage] = useState<IFile | null>(null)

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
    if (image) {
      approve({
        variables: {
          input: {
            id_campaing: campaingId,
            id_file: image.id,
            approved: !image.approved,
            typeFile: 'image'
          }
        }
      })
    }
  }

  const handleDeleteImage = async () => {
    if (image) {
      await api.post('/delete', { filename: image.firebasePath, folder: image.folder }).then(res => {
        if (res.data) {
          removeFile({
            variables: {
              input: {
                campaingId,
                fileId: image.id,
                folder: image.type
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
    if (!loadingRemove && dataRemove) {
      setAnchorEl(null)
      reload()
    }
  }, [loadingRemove, dataRemove])


  return (
    <>
      {!!!dataImages.length && <Stack direction='column' mt={2}>
        <Typography>Nenhuma imagem cadastrada</Typography>
        <Box mt={1}>
          {addButton && openModal && handleFileType && <Button variant='outlined' startIcon={<AddIcon />} sx={{ marginRight: 1 }} onClick={() => {
            handleFileType('image')
            openModal(true)
          }}>Adicionar</Button>}
        </Box>
      </Stack>}
      <ImageList variant="quilted" cols={media()} gap={3}>
        {dataImages.map((item) => {
          return <ImageListItem key={item.url} sx={{
            overflow: 'hidden',
            cursor: 'pointer', '& .MuiImageListItem-img': {
              transition: 'all 300ms ease',
            }, '&:hover .MuiImageListItem-img': {
              transform: 'scale(1.05)'
            },
            position: 'relative'
          }}>
            <img
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              onClick={() => {
                setUrl(item.url)
                handleToggle(true)
              }}
            />
            <ImageListItemBar
              sx={{
                '& .MuiImageListItemBar-subtitle': {
                  color: '#fff',
                  backgroundColor: theme.palette.primary.main,
                  width: 'max-content',
                  padding: '2px 7px',
                  borderRadius: '8px',
                  marginTop: '2px',
                }
              }}
              title={item.title}
              subtitle={item.approved ? "Aprovada" : ''}
              onClick={e => {
                setImage(item)
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
        })}
      </ImageList>
      {image !== null && <Menu
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
        {addButton && <MenuItem onClick={() => handleApproveFile()}>
          <ListItemIcon>
            {image.approved ? <CloseIcon fontSize="small" /> : <CheckIcon fontSize="small" />}
          </ListItemIcon>
          {image.approved ? 'Remover aprovação' : 'Aprovar'}
        </MenuItem>}
        <MenuItem onClick={() => handleDeleteImage()}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Deletar
        </MenuItem>
      </Menu>}
    </>
  );
}