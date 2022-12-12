/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Button, DialogActions, Divider, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddResultsCampaingMutation } from '../generated/graphql'
import { INetwork } from '../@types/network'

export const EditResults = ({
  openDialog,
  setOpenDialog,
  campaingId,
  handleReload,
  network
}: {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  campaingId: string,
  handleReload: () => void
  network: INetwork
}) => {

  const [addResultFn, { data, loading, error }] = useAddResultsCampaingMutation()

  const cprArr = network.addResults!.costPerResults.map(i => ({ id: Math.floor(Math.random() * 100), title: i.title, value: i.value }))
  const rArr = network.addResults!.results.map(i => ({ id: Math.floor(Math.random() * 100), title: i.title, value: i.value }))

  let as = network.addResults!.amountSpent
  const nas = convert(as.toString().replace('.', ''))

  const nreach = network.addResults!.reach.toString()

  const [titleCostPerResult, setTitleCostPerResult] = useState('')
  const [valueCostPerResult, setValueCostPerResult] = useState<string>('')

  const [titleResult, setTitleResult] = useState('')
  const [valueResult, setValueResult] = useState<string>('')

  const [amountSpent, setAmountSpent] = useState<string>(nas)
  const [reach, setReach] = useState<string>(nreach)

  const [disabled, setDisabled] = useState<boolean>(false)

  const [costPerResults, setCostPerResults] = useState<{ id: number, title: string, value: number }[]>(cprArr)
  const [results, setResults] = useState<{ id: number, title: string, value: number }[]>(rArr)

  const handleAddCostPerResult = () => {
    if (!valueCostPerResult || !titleCostPerResult) return
    setCostPerResults([...costPerResults, { id: Math.floor(Math.random() * 100), title: titleCostPerResult, value: parseInt(valueCostPerResult) }])
    setTitleCostPerResult('')
    setValueCostPerResult('')
  }

  const handleAddResult = () => {
    if (!valueResult || !titleResult) return
    setResults([...results, { id: Math.floor(Math.random() * 100), title: titleResult, value: parseInt(valueResult) }])
    setTitleResult('')
    setValueResult('')
  }

  const handleRemoveItemCostPerResults = (id: number) => {
    setCostPerResults(costPerResults.filter(net => net.id !== id))
  }

  const handleRemoveItemResults = (id: number) => {
    setResults(results.filter(net => net.id !== id))
  }

  const handleSubmit = () => {

    let value = amountSpent.replaceAll('.', '')
    value = value.replace(',', '.')

    const cpr = costPerResults.map(r => ({ title: r.title, value: r.value }))
    const res = results.map(r => ({ title: r.title, value: r.value }))

    addResultFn({
      variables: {
        input: {
          campaingId,
          amountSpent: Number(value),
          reach: Number(reach),
          costPerResults: cpr,
          results: res,
          network: network.name
        }
      }
    })
  }

  function convert(value: string) {
    let money = value
    money = money.replace(/(\D)/g, '')
    money = money.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3,$4')
    money = money.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3,$4')
    money = money.replace(/^(\d{3})(\d{3})(\d{2})$/, '$1.$2,$3')
    money = money.replace(/^(\d{2})(\d{3})(\d{2})$/, '$1.$2,$3')
    money = money.replace(/^(\d{1})(\d{3})(\d{2})$/, '$1.$2,$3')
    money = money.replace(/^(\d{3})(\d{2})$/, '$1,$2')
    money = money.replace(/^(\d{2})(\d{2})$/, '$1,$2')
    money = money.replace(/^(\d{1})(\d{2})$/, '$1,$2')
    return money
  }

  useEffect(() => {
    if (!loading || data) {
      setOpenDialog(false)
      handleReload()
    }

    if (error) {
      console.log(error)
    }
  }, [data, loading, error])

  useEffect(() => {
    const cr = !!costPerResults.length
    const r = !!results.length

    if (!cr || !r || !amountSpent || !reach) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

  }, [costPerResults, results, amountSpent, reach])

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle fontSize={20}>
          Relatório do
          <Typography color="primary">{network.name}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='overline' color='primary'>Custos por resultados</Typography>
          <Divider />
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="link">Título</InputLabel>
                <Input
                  id="title"
                  value={titleCostPerResult}
                  onChange={(e) => setTitleCostPerResult(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="link">Valor</InputLabel>
                <Input
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  id="value"
                  value={valueCostPerResult}
                  onChange={(e) => {
                    setValueCostPerResult(e.target.value)
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth sx={{ mt: 1 }} variant="outlined" onClick={() => handleAddCostPerResult()}>Adicionar</Button>
            </Grid>
          </Grid>
          <Box mt={4} />
          {costPerResults.map(net =>
            <Paper key={net.id} sx={{ padding: '5px 20px', mb: 1 }}>
              <Grid container spacing={2} display="flex" alignItems="center">
                <Grid item xs={4}>
                  <Typography>{net.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{net.value}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <IconButton aria-label="delete" color="primary" onClick={() => handleRemoveItemCostPerResults(net.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          )}

          <Box mt={3} />
          <Typography variant='overline' color="primary">Resultados</Typography>
          <Divider />
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="link">Título</InputLabel>
                <Input
                  id="title"
                  value={titleResult}
                  onChange={(e) => setTitleResult(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="link">Valor</InputLabel>
                <Input
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  id="value"
                  value={valueResult}
                  onChange={(e) => {
                    setValueResult(e.target.value)
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth sx={{ mt: 1 }} variant="outlined" onClick={() => handleAddResult()}>Adicionar</Button>
            </Grid>
          </Grid>
          <Box mt={4} />
          {results.map(net =>
            <Paper key={net.id} sx={{ padding: '5px 20px', mb: 1 }}>
              <Grid container spacing={2} display="flex" alignItems="center">
                <Grid item xs={4}>
                  <Typography>{net.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{net.value}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <IconButton aria-label="delete" color="primary" onClick={() => handleRemoveItemResults(net.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          )}
          <Grid item xs={12} mt={3}>
            <FormControl variant="standard" fullWidth>
              <Input
                type='text'
                id="standard-adornment-currency"
                value={amountSpent}
                onChange={(e) => {
                  setAmountSpent(convert(e.target.value))
                }}
                startAdornment={<InputAdornment position="start">R$ </InputAdornment>}
                aria-describedby="standard-currency-helper-text"
                inputProps={{
                  'aria-label': 'currency',
                  maxLength: 13
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: 0
              }}
              variant="standard"
              id="value"
              label="Alcance"
              value={reach}
              onChange={(e) => {
                setReach(e.target.value)
              }}
            />
          </Grid>
          <DialogActions sx={{ mt: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => handleSubmit()} disabled={disabled}>Salvar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div >
  )
}
