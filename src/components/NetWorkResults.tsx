/* eslint-disable */
import React, { useState } from 'react'
import { Grid, Paper, Typography, Stack, Button, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { INetwork, IResult, NetworkType } from '../@types/network'
import { AllNetworks } from './AllNetworksDialog'
import { AddResults } from './AddResultsCampaingDialog'
import { formatToBr } from '../utils/convertToBr'
import { EditResults } from './EditResultsCampaingDialog'

export const NetworkResult: React.FC<NetworkType> = ({ network, campaingId, handleReload }) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogAddNetwork, setOpenDialogAddNetwork] = useState(false)
  const [openDialogEditNetwork, setOpenDialogEditNetwork] = useState(false)
  const [networks, setNetwoks] = useState<IResult[] | null>(null)
  const [type, setType] = useState<string>('')
  const [networkSelected, setNetwokSelected] = useState<INetwork | null>(null)

  const handleAddResults = (net: string) => {
    setOpenDialogAddNetwork(true)
  }

  const handleSetNetwork = (net: IResult[], type: string) => {
    setNetwoks(net)
    setType(type)
    setOpenDialog(true)
  }

  const handleSelectNetwork = (net: INetwork) => {
    setNetwokSelected(net)
    setOpenDialogEditNetwork(true)
  }

  return <>
    <Grid item xs={12} mt={2} mb={2}>
      <Stack flexDirection='row' alignItems='flex-end' justifyContent='space-between'>
        <Typography variant="h5">Relatórios do <Typography color="primary">{network.name}</Typography></Typography>
        {!network.addResults && <Button
          size="small"
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => handleAddResults(network.name)}>Adicionar</Button>}
        {network.addResults && <Button
          size="small"
          variant='outlined'
          startIcon={<EditIcon />}
          onClick={() => handleSelectNetwork(network)}>Editar</Button>}
      </Stack>
      <Grid item xs={12} mt={1}>
        <Divider />
      </Grid>
    </Grid>
    {network.addResults &&
      <>
        <Grid container mb={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2 }} >
              <Typography variant='overline'>Custo por resultado</Typography>
              <Typography variant='subtitle1' fontSize={16}>{network.addResults.costPerResults[0].title}</Typography>
              <Stack flexDirection='row' gap={1} alignItems="center" justifyContent="space-between">
                <Typography variant='subtitle1' fontSize={30}>{network.addResults.costPerResults[0].value}</Typography>
                {network.addResults.costPerResults.length > 1 && <Button size="small" sx={{ mt: 2 }} variant='outlined' onClick={() => handleSetNetwork(network.addResults!.costPerResults, "Custo por resultados")}>
                  ver todos
                </Button>}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2 }} >
              <Typography variant='overline'>resultados</Typography>
              <Typography variant='subtitle1' fontSize={16}>{network.addResults.results[0].title}</Typography>
              <Stack flexDirection='row' gap={1} alignItems="center" justifyContent="space-between">
                <Typography variant='subtitle1' fontSize={30}>{network.addResults.results[0].value}</Typography>
                {network.addResults.results.length > 1 && <Button size="small" sx={{ mt: 2 }} variant='outlined' onClick={() => handleSetNetwork(network.addResults!.results, "Resultados")}>
                  ver todos
                </Button>}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2 }} >
              <Typography variant='overline'>valor</Typography>
              <Typography variant='subtitle1' fontSize={16}>Valor gasto</Typography>
              <Stack flexDirection='row' gap={1} alignItems="center" justifyContent="space-between">
                <Typography variant='subtitle1' fontSize={30}>{formatToBr(network.addResults.amountSpent)}</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2 }} >
              <Typography variant='overline'>Alcance</Typography>
              <Typography variant='subtitle1' fontSize={16}>Alcance</Typography>
              <Stack flexDirection='row' gap={1} alignItems="center" justifyContent="space-between">
                <Typography variant='subtitle1' fontSize={30}>{network.addResults.reach}</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={1} mb={2}>
          <Divider />
        </Grid>
      </>
    }
    {networks && type && <AllNetworks openDialog={openDialog} setOpenDialog={setOpenDialog} networks={networks} type={type} />}
    <AddResults campaingId={campaingId} openDialog={openDialogAddNetwork} setOpenDialog={setOpenDialogAddNetwork} handleReload={handleReload} networkName={network.name} />
    {networkSelected && <EditResults network={networkSelected} campaingId={campaingId} openDialog={openDialogEditNetwork} setOpenDialog={setOpenDialogEditNetwork} handleReload={handleReload} />}
  </>
}