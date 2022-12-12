/* eslint-disable */
import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { Data, EnhancedTableProps, EnhancedTableToolbarProps, HeadCell, Order, TSort } from '../../../@types/campaings'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  Stack,
  IconButton
} from '@mui/material'

import { useNavigate, useParams } from 'react-router'
import { useGetCampaingsByClientMinQuery, useClientByIdQuery, GetCampaingByIdMinDocument } from '../../../generated/graphql'
import client from '../../../config/client'

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

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'id'
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Título'
  },
  {
    id: 'socialNetwork',
    numeric: false,
    disablePadding: true,
    label: 'Redes sociais'
  },
  {
    id: 'campaingType',
    numeric: false,
    disablePadding: true,
    label: 'Tipo de campanha'
  }
]

function createData(
  id: string,
  title: string,
  socialNetwork: string[],
  campaingType: string
): Data {
  return {
    id,
    title,
    socialNetwork,
    campaingType
  }
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = ({
  order,
  orderBy,
  onRequestSort
}) => {
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id === 'id') {
            return <></>
          }
          return (
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
                {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}> {order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
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
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Planejamentos
      </Typography>
    </Toolbar>
  )
}

const ClientsCampaings = () => {

  const { id } = useParams()

  const { data, loading, error, refetch } = useGetCampaingsByClientMinQuery({
    variables: {
      client: id!
    }
  })

  const { data: cl, loading: lcl, error: ecl, refetch: refcl } = useClientByIdQuery({
    variables: {
      clientId: id!
    }
  })

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('id')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const navigation = useNavigate()

  const handleNewCampaing = () => {
    navigation('add')
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (id: string) => {
    navigation(`${id}`)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    refetch({ client: id! })
  }, [])

  if (loading) {
    <Typography variant="h5">Carrengando...</Typography>

  }

  if (error) {
    <Typography variant="h5">String(error)</Typography>
  }

  const rows = data?.getCampaingByClient.map(campaing => {
    return createData(
      campaing._id!, campaing.title, campaing.socialMediasResults.map(m => m.name), campaing.type
    )
  }) || []

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Stack direction='row' alignItems='center' gap={1}>
        <IconButton color="primary" aria-label="voltar" sx={{ borderRadius: 10 }} onClick={() => navigation(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Voltar</Typography>
      </Stack>
      <Grid mb={2} mt={2}>
        <Typography>Cliente</Typography>
        <Typography variant="h4">{cl?.client?.name}</Typography>
      </Grid>
      <Box mb={2}>
        <Button variant="contained" onClick={handleNewCampaing}>
          Novo planejamento
        </Button>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, borderCollapse: 'collapse' }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort({ array: rows, comparator: getComparator(order, orderBy) })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data) => {
                  return (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      hover
                      onClick={() => handleClick(row.id as string)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.socialNetwork.map(a => <Chip label={a} color='primary' variant='outlined' sx={{ borderRadius: 10, marginRight: 1 }} />)}</TableCell>
                      <TableCell>{row.campaingType}</TableCell>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Dados por página"
        />
      </Paper>
    </Box>
  )
}

export default ClientsCampaings