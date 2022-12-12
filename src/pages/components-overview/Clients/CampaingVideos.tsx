/* eslint-disable */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router';
import { GetCampaingByIdMinDocument, useGetCampaingByIdMinQuery } from '../../../generated/graphql';
import { IFile } from '../../../@types/cyber';
import client from '../../../config/client';
import VideoListPreview from '../../../components/VideoPreview';
import VideoView from '../../../components/VideoView';

interface IState {
  state: {
    id: string
  }
}

export default function CampaingVideos() {

  const { state }: IState = useLocation();

  if (!state) {
    window.history.back()
  }

  const { data, loading, error, refetch } = useGetCampaingByIdMinQuery({
    variables: {
      getCampaingByIdId: state.id
    },
    fetchPolicy: 'cache-and-network',
  })

  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [openModalUpload, setOpenModalUpload] = useState(false)

  const handleReload = async () => {
    await client.refetchQueries({
      include: [GetCampaingByIdMinDocument]
    })
  }

  if (loading) {
    <Typography variant="h5">Carrengando...</Typography>
  }

  if (error) {
    <Typography variant="h5">String(error)</Typography>
  }

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


  return <Box>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant="h5">{data?.getCampaingById.title}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="overline">tipo da campanha</Typography>
        <Typography variant="h2" color="primary">{data?.getCampaingById.type}</Typography>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Stack direction='row' alignItems="center" justifyContent='space-between'>
          <Typography variant="h5">Videos do planejamento</Typography>
        </Stack>
        <VideoListPreview reload={handleReload} campaingId={state.id} openModal={setOpenModalUpload} dataVideos={videos} handleToggle={setOpen} setUrl={setUrl} />
      </Grid>
      <VideoView open={open} handleToggle={setOpen} url={url} setUrl={setUrl} />
    </Grid>
  </Box>
}