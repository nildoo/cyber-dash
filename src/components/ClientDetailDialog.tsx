/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { DataFormNetwork } from '../@types/clients';
import { useClientAllDetailsQuery } from '../generated/graphql';
import { useNavigate } from 'react-router';
import EditClient from './EditClient';
import { FormDataUpdateClient } from '../@types/cyber';

export const ClientDetailDialog = ({
  opened,
  setModalStatus,
  clientId
}: {
  opened: boolean,
  setModalStatus: (value: boolean) => void,
  clientId: string
}) => {

  const { data, loading, error } = useClientAllDetailsQuery({
    variables: { clientId }
  })

  const [network, setNetwork] = useState('')
  const [followers, setFollowers] = useState<number | null>(null)
  const [likes, setLikes] = useState<number | null>(null)
  const [comments, setComments] = useState<number | null>(null)
  const [reached, setReached] = useState<number | null>(null)
  const [profileViews, setProfileViews] = useState<number | null>(null)
  const [posts, setPosts] = useState<number | null>(null)

  const [dataform, setDataform] = useState<DataFormNetwork | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [editMode, setEditMode] = useState(false)

  const [title, setTitle] = useState('Cliente')

  const navigation = useNavigate()

  const constracts = {
    site_development: 'Desenvolvimento de Site',
    site_maintenance: 'Manutenção de Site',
    landing_page: 'Landing Page',
    extra_art: 'Arte EXTRA',
    extra_network: 'Rede Social Extra (Tik Tok)'
  }

  const client: FormDataUpdateClient | null = data?.client ? {
    id: data.client._id!,
    city: data.client.address.city,
    cnpj: data.client.cnpj,
    state: data.client.address.state,
    street: data.client.address.street,
    submit: null,
    whatsapp: data.client.whatsapp,
    zipcode: data.client.address.zipcode,
    phone: data.client.phone,
    complement: data.client.address.complement || '',
    contractType: data.client.contractType.type,
    name: data.client.name,
    neighborhood: data.client.address.neighborhood,
    number: data.client.address.number || undefined,
    othersContratcs: {
      extra_art: data.client.othersContracts.extra_art!,
      extra_network: data.client.othersContracts.extra_network!,
      landing_page: data.client.othersContracts.landing_page!,
      site_development: data.client.othersContracts.site_development!,
      site_maintenance: data.client.othersContracts.site_maintenance!,
    }
  } : null

  useEffect(() => {
    if (network && followers && likes && comments && reached && posts && profileViews) {
      setDataform({
        name: network,
        followers,
        likes,
        comments,
        reached,
        posts,
        profileViews
      })
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }, [network, followers, likes, comments, reached, posts, profileViews])


  return (
    <div>
      <Dialog
        open={opened}
        onClose={() => setModalStatus(false)}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" sx={{ fontSize: 24 }} fontWeight="700">
          {title}
        </DialogTitle>
        <DialogContent>
          {loading &&
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant='overline'>
                  Carregando dados...
                </Typography>
              </Grid>
            </Grid>}

          {error &&
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant='overline'>
                  Erro ao buscar dados...
                </Typography>
              </Grid>
            </Grid>}

          {!loading && data && !editMode &&
            <Grid container>
              <Grid item xs={12} mt={3} mb={2}>
                <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                  Dados pessoais
                </Typography>
                <Divider />
              </Grid>

              {/* Row */}
              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Nome:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Email:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.email}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  WhatsApp:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.whatsapp}
                </Typography>
              </Grid>

              {/* Row */}
              <Grid xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  CNPJ:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.cnpj}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Tipo de contrato:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.contractType.title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Telefone:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.phone}
                </Typography>
              </Grid>

              <Grid item xs={12} mt={3} mb={2}>
                <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                  Endereço
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Cidade:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.city}
                </Typography>
              </Grid>

              <Grid item xs={12} md={2} mt={2}>
                <Typography variant='overline'>
                  Estado:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.state}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} mt={2}>
                <Typography variant='overline'>
                  Logradouro:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.street}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} mt={2}>
                <Typography variant='overline'>
                  Bairro:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.neighborhood}
                </Typography>
              </Grid>

              <Grid item xs={12} md={2} mt={2}>
                <Typography variant='overline'>
                  Número:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.number || '-'}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} mt={2}>
                <Typography variant='overline'>
                  CEP:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.zipcode}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} mt={2}>
                <Typography variant='overline'>
                  Complemento:
                </Typography>
                <Typography variant='h5'>
                  {data.client?.address.complement || '-'}
                </Typography>
              </Grid>

              {!!Object.entries(data.client!.othersContracts).filter(i => (i[1] && i[0] !== '__typename')).length && <Grid item xs={12} mt={3} mb={1}>
                <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                  Serviços contratados
                </Typography>
                <Divider />
              </Grid>
              }

              <Grid item xs={12}>
                {Object.entries(data.client!.othersContracts).filter(i => (i[1] && i[0] !== '__typename')).map(e => {
                  return <Chip key={e[0]} label={constracts[e[0] as keyof typeof constracts]} color='primary' variant='outlined' sx={{ borderRadius: 10, marginRight: 1, marginTop: 2 }} />
                })}
              </Grid>

            </Grid>
          }

          {editMode && client && <Grid container>
            {client && <EditClient client={client} setEditMode={setEditMode} />}
          </Grid>}

        </DialogContent>
        <DialogActions sx={{ padding: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setModalStatus(false)} color="secondary">Cancelar</Button>
          <Box>
            <Button onClick={() => {
              if (!editMode) setTitle('Editar cliente')
              if (editMode) setTitle('Cliente')
              setEditMode(!editMode)
            }} variant="outlined" sx={{ mr: 1 }}>{editMode ? 'Ver dados' : 'Editar cliente'}</Button>
            <Button onClick={() => navigation(`detail/${clientId}`)} variant="contained">Ver dashboard</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div >
  );
}

