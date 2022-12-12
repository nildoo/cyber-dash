/* eslint-disable */
import React, { useState, MouseEvent, ChangeEvent, useEffect, SyntheticEvent, FormEvent } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import { EnhancedTableToolbarProps, Order, TSort } from '../../../@types/campaings'
import { ClientData, EnhancedTableProps2, HeadCell2 } from '../../../@types/clients'
import { useClientByNameFilteredLazyQuery, useClientByNameLazyQuery, useClientsQuery } from '../../../generated/graphql'
import { ClientDetailDialog } from '../../../components/ClientDetailDialog'
import { FormControl, Grid, Input, InputAdornment, InputLabel } from '@mui/material'
import { MyAlert } from '../../../components/Alert'
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/system'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort({ array, comparator }: TSort) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells: readonly HeadCell2[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email'
  },
  {
    id: 'whatsapp',
    numeric: false,
    disablePadding: false,
    label: 'Whatsapp'
  },
  {
    id: 'contract',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de contrato'
  },
  {
    id: 'othersProducts',
    numeric: false,
    disablePadding: false,
    label: 'Produtos adicionais'
  }
]

function createData(
  id: string,
  name: string,
  email: string,
  whatsapp: string,
  contract: string,
  othersProducts: string
): ClientData {
  return {
    id, name, email, whatsapp, contract, othersProducts
  }
}

function EnhancedTableHead(props: EnhancedTableProps2) {
  const { order, orderBy, onRequestSort } =
    props
  const createSortHandler = (property: keyof ClientData) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>)
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

  )
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Clientes
      </Typography>
    </Toolbar>
  )
}

const Clients = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ClientData>('id')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openModal, setOpenModal] = useState(false)
  const [client, setClient] = useState<ClientData | null>(null)
  const [search, setSearch] = useState<string>('')
  const [searchedWord, setSearchedWord] = useState<string>('')

  const [clientArr, setClientArr] = useState<ClientData[]>([])

  const { data, loading, error, refetch } = useClientsQuery({
    fetchPolicy: 'no-cache'
  })
  const [getClients, { data: dataFitered, loading: loadingFiltered, error: errorFiltered, refetch: refFiltered }] = useClientByNameFilteredLazyQuery({
    fetchPolicy: 'no-cache'
  })


  const [alert, setAlert] = useState<Alert | null>(null)
  const [openAlert, setOpenAlert] = useState(false);

  const navigation = useNavigate()


  const handleCloseAlert = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleNewClient = () => {
    navigation('add')
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ClientData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (clientDataRow: ClientData) => {
    setClient(clientDataRow)
    setOpenModal(true)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSearchedWord(search)
    getClients({ variables: { name: search } })
  }

  useEffect(() => {
    if (searchedWord) {
      if (!loadingFiltered && dataFitered) {
        const client = dataFitered?.clientByName.map(client => {
          const othersC = Object.entries(client.othersContracts).filter(c => (c[0] !== '__typename' && c[0] !== '_id')).filter(d => d[1]).map(e => contractsptBR[e[0] as keyof typeof contractsptBR])
          return createData(
            client._id!, client.name, client.email, client.whatsapp, client.contractType.title, othersC.join(', ')
          )
        }) || []
        setClientArr(client)
      }
    } else {
      if (!loading && data) {
        const client = data?.clients.map(client => {
          const othersC = Object.entries(client.othersContracts).filter(c => c[0] !== '__typename').filter(d => d[1]).map(e => contractsptBR[e[0] as keyof typeof contractsptBR])
          return createData(
            client._id!, client.name, client.email, client.whatsapp, client.contractType.title, othersC.join(', ')
          )
        }) || []
        setClientArr(client)
      }
    }
  }, [data, dataFitered, loadingFiltered, loading, , searchedWord])

  useEffect(() => {
    refetch()
  }, [data])

  if (loading) {
    <Typography
      sx={{ flex: '1 1 100%' }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      Clientes
    </Typography>
  }

  if (error) {
    <Typography
      sx={{ flex: '1 1 100%' }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {String(error)}
    </Typography>
  }

  const contractsptBR = {
    site_development: 'Desenvolvimento de Site',
    site_maintenance: 'Manutenção de Site',
    landing_page: 'Landing Page',
    extra_art: 'Arte EXTRA',
    extra_network: 'Rede Social Extra (Tik Tok)'
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientArr.length) : 0

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box mb={2}>
        <Button variant="contained" onClick={handleNewClient}>Novo cliente</Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container mb={3} mt={3} spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="search">Nome do cliente</InputLabel>
              <Input
                id="search"
                value={search}
                onChange={(event) => {
                  if (event.target.value === '') {
                    setSearchedWord('')
                  }
                  setSearch(event.target.value)
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant='contained' type="submit">
              Pesquisar
            </Button>
          </Grid>
        </Grid>
      </form>
      {searchedWord && <Stack mb={3} direction="row" gap={1}>
        <Typography>Mostrando resultados para</Typography>
        <Typography fontWeight='700'>"{searchedWord}"</Typography>
      </Stack>}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, borderCollapse: 'collapse' }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={() => { }}
              onRequestSort={handleRequestSort}
              rowCount={clientArr?.length}
            />
            <TableBody>
              {stableSort({ array: clientArr, comparator: getComparator(order, orderBy) })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: ClientData) => {
                  return (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      hover
                      onClick={() => handleClick(row)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell>
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.whatsapp}</TableCell>
                      <TableCell align="left">{row.contract}</TableCell>
                      <TableCell align="left">{!!row.othersProducts.length ? row.othersProducts : 'Nenhum'}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clientArr.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Dados por página"
        />
      </Paper>
      {client && <ClientDetailDialog clientId={client.id} opened={openModal} setModalStatus={setOpenModal} />}
      {alert && <MyAlert alert={alert} openAlert={openAlert} setOpenAlert={setOpenAlert} />}
    </Box>

  )
}

export default Clients
