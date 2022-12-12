/* eslint-disable */
import React, { useEffect, useState, SyntheticEvent } from 'react'
import { Grid, Typography, Stack, Button, Box, IconButton, Alert, Snackbar } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { AnalyticEcommerce } from '../../../components/cards/statistics/AnalyticEcommerce'
import { MainCard } from '../../../components/MainCard'
import IncomeAreaChart from '../../dashboard/IncomeAreaChart'
import BasicDateRangePicker from '../../../components/RangeDate'
import { SimpleDialogDemo } from '../../../components/MyDialog'
import { useAddNetworkMutation, useClientQuery, useQueryQuery, useUdpateNetworkMutation } from '../../../generated/graphql'
import { AddNetworkModal } from '../../../components/NetworkDialog'
import { DataFormNetwork } from '../../../@types/clients'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { Social } from '../../../@types/cyber'
import { UpdateRelDialog } from '../../../components/UpdateRelDialog'
import { MyAlert } from '../../../components/Alert'
dayjs.extend(weekday)

export default function ClientDetail() {
  const { id } = useParams()

  const [addNetworkMutation, { data: dataNetwork, loading: loadingNetwork, error: errorNetwork }] = useAddNetworkMutation();
  const [updateNetworkMutation, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] = useUdpateNetworkMutation();

  const network = dataNetwork && dataNetwork.addNetwork && dataNetwork.addNetwork.networks ? dataNetwork.addNetwork.networks[0].name : ''


  const [followers, setFollowers] = useState('week')
  const [likes, setLikes] = useState<'week' | 'month'>('week')
  const [comments, setComments] = useState('week')
  const [accounts, setAccounts] = useState('week')
  const [profileViews, setProfileViews] = useState('week')
  const [posts, setPosts] = useState('week')

  const [socialNetwork, setSocialNetwork] = useState<'facebook' | 'instagram' | undefined>(network as 'facebook' | 'instagram')
  const [openModal, setOpenModal] = useState(false)
  const [openModalAddRel, setOpenModalAddRel] = useState(false)
  const [socialMedias, setSocialMedias] = useState<string[]>([])

  // Alert State
  const [alert, setAlert] = useState<Alert | null>(null)
  const [openAlert, setOpenAlert] = useState(false)

  const { data, loading, error, refetch } = useClientQuery({
    variables: { clientId: id! }
  })

  const { data: datah, loading: loadingh, error: errorh, refetch: ref } = useQueryQuery({
    variables: {
      input: {
        id: id!,
        name: socialNetwork!,
        date: dayjs().format('YYYY-MM-DD')
      }
    }
  })

  const navigation = useNavigate()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleNewCamapaing = () => {
    navigation(`/clients/${id}/campaings`)
  }

  const handleRefetchData = (value: Dayjs | null) => {
    if (value) {
      ref({
        input: {
          id: id!,
          name: socialNetwork!,
          date: value.format('YYYY-MM-DD')
        }
      })
    }
  }

  const handleAddNetwork = (dataForm: DataFormNetwork) => {
    if (id) {
      addNetworkMutation({
        variables: {
          input: {
            id,
            name: dataForm.name,
            followers: dataForm.followers,
            likes: dataForm.likes,
            comments: dataForm.comments,
            reached: dataForm.reached,
            posts: dataForm.posts,
            profileViews: dataForm.profileViews
          }
        }
      })
    }
  }

  const handleUpdateRel = (dataForm: DataFormNetwork) => {
    if (id) {
      updateNetworkMutation({
        variables: {
          input: {
            id: id,
            followers: dataForm.followers,
            likes: dataForm.likes,
            comments: dataForm.comments,
            reached: dataForm.reached,
            name: dataForm.name,
            posts: dataForm.posts,
            profileViews: dataForm.profileViews
          }
        }
      })
    }
  }

  useEffect(() => {
    refetch()
  }, [dataNetwork, dataUpdate])


  useEffect(() => {
    if (data && data.client && !!data.client.networks.length) {
      const name = data.client.networks[0].name
      ref({
        input: {
          id: id!,
          name: name,
          date: dayjs().format('YYYY-MM-DD')
        }
      })
      setSocialNetwork(name as 'facebook' | 'instagram')
      setSocialMedias(data.client.networks.map(n => n.name))
    }
  }, [data])

  useEffect(() => {
    if (!loadingNetwork && dataNetwork) {
      setOpenModal(false)
    }
  }, [loadingNetwork, dataNetwork])

  useEffect(() => {
    if (!loadingUpdate && dataUpdate) {
      setOpenModalAddRel(false)
    }

    if (errorUpdate) {
      setOpenModalAddRel(false)
      setAlert({
        message: String(errorUpdate),
        type: 'error'
      })
      setOpenAlert(true)
    }
  }, [loadingUpdate, dataUpdate, errorUpdate])


  if (loading) {
    <Typography variant="h5">Carrengando...</Typography>

  }

  if (error) {
    <Typography variant="h5">String(error)</Typography>
  }

  const socialMediaCount = data?.client?.networks.filter(n => n.name === socialNetwork)[0]

  return <Grid container rowSpacing={4.5} columnSpacing={2.75}>
    <Grid item xs={12} >
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton color="primary" aria-label="voltar" sx={{ borderRadius: 10 }} onClick={() => navigation(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Dashboard</Typography>
      </Stack>
      {data !== undefined && data.client !== undefined && data.client !== null && <SimpleDialogDemo client={data.client} />}
    </Grid>
    {data !== undefined && data.client && data.client.networks.length > 0 ? <>
      <Grid item xs={12} sm={6} md={6} lg={6} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Grid>
          {data.client.networks.map(n => {
            return <Button
              key={n.name}
              size="small"
              onClick={() => setSocialNetwork(n.name as 'facebook' | 'instagram')}
              color={socialNetwork === n.name ? 'primary' : 'secondary'}
              variant={socialNetwork === n.name ? 'outlined' : 'text'}
              sx={{ marginLeft: 1 }}
            >
              {n.name}
            </Button>
          })}
          <IconButton size='small' color="primary" aria-label="add new social media" sx={{ marginLeft: 1 }} onClick={() => setOpenModal(true)}>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid>
          <Button size="small" variant='outlined' onClick={() => refetch()} sx={{ marginRight: 1 }}>
            Reload
          </Button>
          <Button size="small" variant='outlined' onClick={handleNewCamapaing}>
            Planejamentos
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} sx={{
        display: 'flex',
        justifyContent: {
          xs: 'space-between',
          md: 'flex-end'
        },
        gap: 1
      }}>
        <Button size="small" variant='outlined' onClick={() => setOpenModalAddRel(true)}>
          Atualizar relatório
        </Button>
        <BasicDateRangePicker title="Data" handleRefetch={handleRefetchData} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Seguidores" count={socialMediaCount ? String(socialMediaCount.insights.followers) : '0'} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Curtidas" count={socialMediaCount ? String(socialMediaCount.insights.likes) : '0'} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Comentários" count={socialMediaCount ? String(socialMediaCount.insights.comments) : '0'} isLoss color="error" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Contas Alcançadas" count={socialMediaCount ? String(socialMediaCount.insights.reached) : '0'} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Visitas ao Perfil" count={socialMediaCount ? String(socialMediaCount.insights.profileViews) : '0'} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Posts" count={socialMediaCount ? String(socialMediaCount.insights.posts) : '0'} />
      </Grid>

      {/* Followers */}
      {!loadingh && datah && <>
        < Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Seguidores</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setFollowers('month')}
                  color={followers === 'month' ? 'primary' : 'secondary'}
                  variant={followers === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setFollowers('week')}
                  color={followers === 'week' ? 'primary' : 'secondary'}
                  variant={followers === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={followers} dataArr={followers === 'week' ? datah.dataHistories[0].week : datah.dataHistories[0].year} />
            </Box>
          </MainCard>
        </Grid>

        {/* Likes */}
        <Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Curtidas</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setLikes('month')}
                  color={likes === 'month' ? 'primary' : 'secondary'}
                  variant={likes === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setLikes('week')}
                  color={likes === 'week' ? 'primary' : 'secondary'}
                  variant={likes === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={likes} dataArr={likes === 'week' ? datah.dataHistories[1].week : datah.dataHistories[1].year} />
            </Box>
          </MainCard>
        </Grid>

        {/* Comments */}

        <Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Comentários</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setComments('month')}
                  color={comments === 'month' ? 'primary' : 'secondary'}
                  variant={comments === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setComments('week')}
                  color={comments === 'week' ? 'primary' : 'secondary'}
                  variant={comments === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={comments} dataArr={comments === 'week' ? datah.dataHistories[2].week : datah.dataHistories[2].year} />
            </Box>
          </MainCard>
        </Grid>

        {/* Accounts */}

        <Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Contas alcançadas</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setAccounts('month')}
                  color={accounts === 'month' ? 'primary' : 'secondary'}
                  variant={accounts === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setAccounts('week')}
                  color={accounts === 'week' ? 'primary' : 'secondary'}
                  variant={accounts === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={accounts} dataArr={accounts === 'week' ? datah.dataHistories[3].week : datah.dataHistories[3].year} />

            </Box>
          </MainCard>
        </Grid>

        {/* Profile Views */}
        <Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Visitas ao perfil</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setProfileViews('month')}
                  color={profileViews === 'month' ? 'primary' : 'secondary'}
                  variant={profileViews === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setProfileViews('week')}
                  color={profileViews === 'week' ? 'primary' : 'secondary'}
                  variant={profileViews === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={profileViews} dataArr={profileViews === 'week' ? datah.dataHistories[5].week : datah.dataHistories[5].year} />
            </Box>
          </MainCard>
        </Grid>

        {/* Posts */}
        <Grid item xs={12} md={12} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Posts</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setPosts('month')}
                  color={posts === 'month' ? 'primary' : 'secondary'}
                  variant={posts === 'month' ? 'outlined' : 'text'}
                >
                  Mês
                </Button>
                <Button
                  size="small"
                  onClick={() => setPosts('week')}
                  color={posts === 'week' ? 'primary' : 'secondary'}
                  variant={posts === 'week' ? 'outlined' : 'text'}
                >
                  Semana
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={posts} dataArr={posts === 'week' ? datah.dataHistories[4].week : datah.dataHistories[4].year} />
            </Box>
          </MainCard>
        </Grid>
      </>}

    </> : <Grid item>
      <Typography variant='h5'>Nenhuma rede social cadastrada</Typography>
      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => setOpenModal(true)}>Cadastrar rede social</Button>
    </Grid>
    }
    <AddNetworkModal medias={socialMedias} opened={openModal} closeModal={() => setOpenModal(false)} handleAddNetWork={handleAddNetwork} loading={loadingNetwork} />
    <UpdateRelDialog socialMedia={socialNetwork} opened={openModalAddRel} closeModal={() => setOpenModalAddRel(false)} handleAddNetWork={handleUpdateRel} loading={false} />

    {alert && <MyAlert alert={alert} openAlert={openAlert} setOpenAlert={setOpenAlert} />}

  </Grid >
}
