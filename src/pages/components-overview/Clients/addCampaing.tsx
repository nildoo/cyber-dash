/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, Typography } from '@mui/material'
import { AnimateButton } from '../../../components/@extended/AnimateButton'
import { useNavigate, useParams } from 'react-router'
import DatePickerInput from '../../../components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useAddCampaingMutation, useClientByIdQuery, useConsultantsQuery } from '../../../generated/graphql'
import { useAuth } from '../../../hooks/useAuth'

type Network = {
  name: string,
  checked: boolean
}

const networksList: Network[] = [
  { name: 'Facebook', checked: false },
  { name: 'Instagram', checked: false },
  { name: 'Linkedin', checked: false },
  { name: 'Tiktok', checked: false },
  { name: 'Twitter', checked: false }
]

export default function AddCampaing() {

  const { user } = useAuth()
  const { id } = useParams()
  const { data, loading, error } = useClientByIdQuery({
    variables: {
      clientId: id!
    }
  })

  const [addCampaingFn, { data: dataCampaing, loading: loadingCampaing, error: errorCampaing }] = useAddCampaingMutation()
  const { data: dataC, loading: loadingC, error: errorC } = useConsultantsQuery()

  const nets = data?.client?.networks.map(e => ({
    name: e.name,
    checked: false
  }))

  const [title, setTitle] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [consultant, setConsultant] = useState<string>(user?.role === 'consultant' ? user.id : '')
  const [networks, setNetworks] = useState<Network[]>(nets || [])
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, 'month'))

  const [disabled, setDisabled] = useState<boolean>(true)

  const navigation = useNavigate()

  const handleCheck = (nameNetwork: string) => {
    const networksTmp = networks.map(net => {
      if (net.name === nameNetwork) {
        return {
          ...net,
          checked: !net.checked
        }
      }
      return net
    })
    setNetworks(networksTmp)
  }

  const handleChangeDateStart = (value: Dayjs | null) => {
    if (value) {
      setStartDate(value)
    } else {
      setStartDate(null)
    }
  }

  const handleChangeDateEnd = (value: Dayjs | null) => {
    if (value) {
      setEndDate(value)
    } else {
      setEndDate(null)
    }
  }

  const handleSubmit = () => {

    const mediaNames = networks.filter(net => net.checked).map(e => e.name)

    const obj = {
      title,
      type,
      startDate,
      endDate,
      networks: mediaNames,
      client: id!,
      consultant
    }

    addCampaingFn({
      variables: {
        input: {
          client: id!,
          consultant,
          endDate,
          startDate,
          socialMediaNames: mediaNames,
          title,
          type
        }
      }
    })

  }

  const handleGoBack = () => {
    navigation(-1)
  }

  useEffect(() => {
    const networksLength = networks.filter(e => e.checked)
    if (title && type && networksLength.length > 0 && startDate && endDate) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [networks, title, type, startDate, endDate])

  useEffect(() => {
    if (!loadingCampaing && dataCampaing) {
      navigation(-1)
    }
  }, [loadingCampaing, dataCampaing])



  return <Box>
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Novo planejamento</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid mt={2}>
        <Typography variant="inherit">
          cliente
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="h4" color="primary">
          {data?.client?.name}
        </Typography>
      </Grid>
      <Grid mt={2} mb={2}>
        <Typography variant="overline" fontWeight={700}>
          Dados gerais:
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="title" sx={{ paddingTop: 0.3 }}>Título*</InputLabel>
            <OutlinedInput
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              name="title"
              placeholder="Título"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="type" sx={{ paddingTop: 0.3 }}>Tipo da campanha*</InputLabel>
            <OutlinedInput
              id="type"
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              name="type"
              placeholder="ex: Curtidas, visitas..."
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="consultant" style={{ paddingTop: 2 }}>
              Consultor*
            </InputLabel>
            <Select
              id="consultant"
              disabled={user?.role === 'consultant'}
              value={consultant}
              onChange={(e) => setConsultant(e.target.value)}
              label="Consultor"
              name="consultant"
              placeholder="Consultor"
              fullWidth
            >
              {dataC?.consultants.map(consultant => (<MenuItem key={consultant._id!} value={consultant._id!}>{consultant.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <DatePickerInput title="Início" handleChangeDate={handleChangeDateStart} startDate={dayjs()} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <DatePickerInput title="Fim" handleChangeDate={handleChangeDateEnd} startDate={dayjs().add(1, 'month')} />
          </FormControl>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="overline" fontWeight={700}>
            Redes sociais:
          </Typography>
        </Grid>
        <Stack direction="row" gap={1} sx={{ padding: '16px 16px' }} flexWrap="wrap">

          {networks.map(net => (
            <FormControl>
              <FormGroup>
                <FormControlLabel sx={{ textTransform: 'capitalize' }} control={<Checkbox checked={net.checked} onChange={e => handleCheck(net.name)} />} label={net.name} />
              </FormGroup>
            </FormControl>
          ))}
        </Stack>
      </Grid>
      <Grid container >
        <AnimateButton mr={8}>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleGoBack}
          >
            Voltar
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            disabled={disabled}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </AnimateButton>
      </Grid>
    </Paper>
  </Box >
}
