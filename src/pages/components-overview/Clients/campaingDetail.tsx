/* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react'
import { useTheme, Box, Button, Chip, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import ImageListPreview from '../../../components/ImagePreview'
import VideoListPreview from '../../../components/VideoPreview'
import ImageView from '../../../components/ImageView'
import VideoView from '../../../components/VideoView'
import AddIcon from '@mui/icons-material/Add'
import { GetCampaingByIdMinDocument, Result, useGetCampaingByIdMinQuery, useRemoveLinkMutation } from '../../../generated/graphql'
import dayjs from 'dayjs'
import { IFile } from '../../../@types/cyber'
import { UploadDialog } from '../../../components/UploadDialog'
import client from '../../../config/client'
import ChatIcon from '@mui/icons-material/Chat'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LinkIcon from '@mui/icons-material/Link';
import { AddLink } from '../../../components/AddLinkDialog'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AddMeet } from '../../../components/AddMeetDialog'
import ScheduleIcon from '@mui/icons-material/Schedule';
import { NetworkResult } from '../../../components/NetWorkResults'
import { INetwork } from '../../../@types/network'
import { AddResults } from '../../../components/AddResultsCampaingDialog'

export default function CampaingDetail() {

  const { id } = useParams()
  const theme = useTheme()
  const { data, loading, error, refetch } = useGetCampaingByIdMinQuery({
    variables: {
      getCampaingByIdId: id!
    },
    fetchPolicy: 'cache-and-network',
  })

  const [removeLinkFn, { data: dataRL, loading: loadingRL }] = useRemoveLinkMutation()

  const [open, setOpen] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)
  const [openImageSign, setOpenImageSign] = useState(false)

  const [openModalUpload, setOpenModalUpload] = useState(false)
  const [openDialogLink, setOpenDialogLink] = useState(false)
  const [openDialogMeet, setOpenDialogMeet] = useState(false)

  const [url, setUrl] = useState('')
  const [urlVideo, setUrlVideo] = useState('')
  const [urlSign, setUrlSign] = useState('')

  const [fileType, setFileType] = useState<'image' | 'video'>('image')

  const navigation = useNavigate()

  const handleReload = async () => {
    await client.refetchQueries({
      include: [GetCampaingByIdMinDocument]
    })
  }

  const handleRemoveLink = (idLink: string) => {
    removeLinkFn({
      variables: {
        input: {
          campaingId: id!,
          linkId: idLink
        }
      }
    })
  }

  useEffect(() => {
    if (!loadingRL && dataRL) {
      handleReload()
    }
  }, [dataRL, loadingRL])

  if (loading) {
    <Typography variant="h5">Carrengando...</Typography>

  }

  if (error) {
    <Typography variant="h5">String(error)</Typography>
  }

  const images: IFile[] = data?.getCampaingById.files.images ? data.getCampaingById.files.images.map(image => ({
    id: image._id!,
    approved: image.approved,
    size: image.size,
    folder: image.folder,
    firebasePath: image.firebasePath,
    thumb: image.thumb,
    title: image.title,
    type: image.type,
    url: image.url,
  })) : []

  const imagesSign: IFile[] = data?.getCampaingById.files.signature ? data.getCampaingById.files.signature.map(image => ({
    id: image._id!,
    approved: image.approved,
    size: image.size,
    thumb: image.thumb,
    folder: image.folder,
    firebasePath: image.firebasePath,
    title: image.title,
    type: image.type,
    url: image.url,
  })) : []

  const videos: IFile[] = data?.getCampaingById.files.videos ? data.getCampaingById.files.videos.map(image => ({
    id: image._id!,
    approved: image.approved,
    size: image.size,
    thumb: image.thumb,
    folder: image.folder,
    firebasePath: image.firebasePath,
    title: image.title,
    type: image.type,
    url: image.url,
  })) : []

  const links = data?.getCampaingById.links || []

  const networksList: INetwork[] = data?.getCampaingById.socialMediasResults ? data.getCampaingById.socialMediasResults.map(socialMedia => {
    if (socialMedia.adResults) {
      return {
        _id: socialMedia._id!,
        name: socialMedia.name,
        addResults: {
          amountSpent: socialMedia.adResults.amountSpent,
          reach: socialMedia.adResults.reach,
          costPerResults: socialMedia.adResults.costPerResults.map((i) => ({ _id: i._id!, title: i.title, value: i.value })),
          results: socialMedia.adResults.results.map((i) => ({ _id: i._id!, title: i.title, value: i.value })),
        }
      }
    } else {
      return {
        _id: socialMedia._id!,
        name: socialMedia.name,
        addResults: undefined
      }
    }
  }) : []


  return <Box>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' gap={1}>
            <IconButton color="primary" aria-label="voltar" sx={{ borderRadius: 10 }} onClick={() => navigation(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">{data?.getCampaingById.title}</Typography>
          </Stack>
          <Box>
            <Button onClick={() => navigation(`chat/${id!}`)} size="small" sx={{ textTransform: 'none' }} type="submit" variant="contained" startIcon={<ChatIcon />}>
              Ir para o chat
            </Button>
            <Button sx={{ marginLeft: 1 }} variant='outlined' size="small" onClick={() => handleReload()}>Recarregar</Button>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {data?.getCampaingById.socialMediasResults.map(m => <Chip key={m.name} size="small" label={m.name} color='primary' variant='outlined' sx={{ borderRadius: 10, marginRight: 1 }} />)}
      </Grid>
      <Grid item xs={12} mt={2}>
        <Stack direction="row">
          <Grid mr={4}>
            <Typography color="gray">Início</Typography>
            <Typography variant="h5">{dayjs(data?.getCampaingById.startDate).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid mr={4}>
            <Typography color="gray">Fim</Typography>
            <Typography variant="h5">{dayjs(data?.getCampaingById.endDate).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid>
            <Typography color="gray">Status</Typography>
            <Typography variant="h5" color="primary">{data?.getCampaingById.status}</Typography>
          </Grid>
        </Stack>
      </Grid>

      <Grid item xs={12} mt={2}>
        <Divider />
      </Grid>

      <Grid item xs={12} mt={2}>
        <Typography variant="overline">tipo da campanha</Typography>
        <Typography variant="h2" color="primary">{data?.getCampaingById.type}</Typography>
      </Grid>

      {networksList.map(r => <Fragment key={r._id}>
        <NetworkResult network={r} campaingId={id!} handleReload={handleReload} />
      </Fragment>)}

      {data?.getCampaingById && data.getCampaingById.meet ? <Paper sx={{ padding: 4, width: '100%', mt: 2 }}>
        <Grid container>
          <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='subtitle1' fontSize={30}>{data.getCampaingById.meet.title}</Typography>
            <Typography variant='body2' fontSize={16}>Sua reunião está marcada, agora é só aguardar!</Typography>
          </Grid>
          <Grid item xs={12} md={3} mt={2}>
            <Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <CalendarMonthIcon sx={{ color: theme.palette.primary.main, width: 30, height: 30 }} />
                <Typography variant='h6' color='gray' fontSize={24}>{dayjs(data.getCampaingById.meet.date).format('DD/MM/YYYY')}</Typography>
              </Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <ScheduleIcon sx={{ color: theme.palette.primary.main, width: 30, height: 30 }} />
                <Typography variant='h6' color='gray' fontSize={24}>{dayjs(data.getCampaingById.meet.date).format('HH:mm')} H</Typography>
              </Stack>
            </Stack>
            <Button size="small" sx={{ mt: 2 }} variant='outlined' onClick={() => setOpenDialogMeet(true)}>
              Editar reunião
            </Button>
          </Grid>
        </Grid>
      </Paper> : <Paper sx={{ padding: 4, width: '100%', mt: 2 }}>
        <Grid container>
          <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='subtitle1' fontSize={30}>Marcar reunião</Typography>
            <Typography variant='body2' fontSize={16}>Marque uma reunião, e fale sobre a campanha!</Typography>
          </Grid>
          <Grid item xs={12} md={3} mt={2}>
            <Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <CalendarMonthIcon sx={{ color: theme.palette.primary.main, width: 30, height: 30 }} />
                <Typography variant='h6' color='gray' fontSize={24}>-</Typography>
              </Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <ScheduleIcon sx={{ color: theme.palette.primary.main, width: 30, height: 30 }} />
                <Typography variant='h6' color='gray' fontSize={24}>-</Typography>
              </Stack>
            </Stack>
            <Button size="small" sx={{ mt: 2 }} variant='outlined' onClick={() => setOpenDialogMeet(true)}>
              Marcar reunião
            </Button>
          </Grid>
        </Grid>
      </Paper>}

      <Grid item xs={12} mt={2}>
        <Stack flexDirection='row' alignItems='flex-end' justifyContent='space-between'>
          <Typography variant="h5">Links</Typography>
          <Button
            size="small"
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => setOpenDialogLink(true)}>Adicionar</Button>
        </Stack>
        <Grid item xs={12} mt={1}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container padding={1} spacing={2}>
        {links.map(link => (
          <Grid item key={link.link} xs={12} md={3}>
            <Paper sx={{ padding: 2 }} >
              <Typography variant='subtitle1'>{link.title}</Typography>
              <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
                <InputLabel htmlFor="link">Link</InputLabel>
                <Input
                  disabled
                  id="link"
                  value={link.link}
                  onChange={() => { }}
                  startAdornment={<InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>}
                />
              </FormControl>
              <Stack mt={2} flexDirection='row' gap={1} justifyContent="space-between">
                <Button size="small" variant='text' onClick={() => handleRemoveLink(link._id!)}>
                  Remover
                </Button>
                <Button size="small" variant='contained' onClick={() => window.open(link.link)}>
                  Abrir link
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} mt={3}>
        <Stack direction='row' alignItems="flex-end" justifyContent='space-between'>
          <Typography variant="h5">Imagens do planejamento</Typography>
          {!!images.length && <Grid>
            <Button
              size="small"
              variant='outlined'
              startIcon={<AddIcon />}
              sx={{ marginRight: 1 }}
              onClick={() => {
                setFileType('image')
                setOpenModalUpload(true)
              }}
            >Adicionar</Button>
            {images.length > 12 && <Button size="small" variant='outlined' onClick={() => navigation('images', { state: { id: id! } })}>Ver todas</Button>}
          </Grid>}
        </Stack>
        <Grid item xs={12} mt={1}>
          <Divider />
        </Grid>
        <ImageListPreview reload={handleReload} campaingId={id!} handleFileType={setFileType} openModal={setOpenModalUpload} addButton dataImages={images} handleToggle={setOpen} setUrl={setUrl} />
      </Grid>

      <Grid item xs={12} mt={3}>
        <Stack direction='row' alignItems="flex-end" justifyContent='space-between'>
          <Typography variant="h5">Videos do planejamento</Typography>
          {!!videos.length && <Grid>
            <Button
              size="small"
              variant='outlined'
              startIcon={<AddIcon />}
              sx={{ marginRight: 1 }}
              onClick={() => {
                setFileType('video')
                setOpenModalUpload(true)
              }}>Adicionar</Button>
            {videos.length > 12 && <Button size="small" variant='outlined' onClick={() => navigation('videos', { state: { id: id! } })}>Ver todos</Button>}
          </Grid>}
        </Stack>
        <Grid item xs={12} mt={1}>
          <Divider />
        </Grid>
        <VideoListPreview reload={handleReload} campaingId={id!} handleFileType={setFileType} openModal={setOpenModalUpload} dataVideos={videos} handleToggle={setOpenVideo} setUrl={setUrlVideo} />
      </Grid>

      <Grid item xs={12} mt={2}>
        <Divider />
      </Grid>

      <Grid item xs={12} mt={3}>
        <Stack direction='row' alignItems="center" justifyContent='space-between'>
          <Typography variant="h5">Imagens assinatura cliente</Typography>
          {imagesSign.length > 12 && <Grid>
            <Button size="small" variant='outlined' onClick={() => navigation('signatures', { state: { id: id! } })}>Ver todos</Button>
          </Grid>}
        </Stack>
        <ImageListPreview reload={refetch} campaingId={id!} dataImages={imagesSign} handleToggle={setOpenImageSign} setUrl={setUrlSign} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <ImageView open={open} handleToggle={setOpen} url={url} setUrl={setUrl} />
        <VideoView open={openVideo} handleToggle={setOpenVideo} url={urlVideo} setUrl={setUrlVideo} />
        <ImageView open={openImageSign} handleToggle={setOpenImageSign} url={urlSign} setUrl={setUrlSign} />
      </Grid>
      <UploadDialog reload={handleReload} fileType={fileType} campaingId={id!} opened={openModalUpload} closeModal={setOpenModalUpload} />
      <AddLink campaingId={id!} openDialogLink={openDialogLink} setOpenDialogLink={setOpenDialogLink} handleReload={handleReload} />
      <AddMeet campaingId={id!} openDialogMeet={openDialogMeet} setOpenDialogMeet={setOpenDialogMeet} handleReload={handleReload} />
    </Grid >
  </Box >
}
