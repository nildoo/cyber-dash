/* eslint-disable */
import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
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
import { ConsultantData, EnhancedTablePropsConsultant, HeadCellConsultant } from '../../../@types/consultants'
import { useConsultantsQuery } from '../../../generated/graphql'
import { ConsultantDetailDialog } from '../../../components/ConsultantDetailDialog'
import { useAuth } from '../../../hooks/useAuth'

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

const headCells: readonly HeadCellConsultant[] = [
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
    id: 'office',
    numeric: false,
    disablePadding: false,
    label: 'Cargo'
  }
]

function createData(
  id: string,
  name: string,
  email: string,
  office: string,
): ConsultantData {
  return {
    id, name, email, office
  }
}

function EnhancedTableHead(props: EnhancedTablePropsConsultant) {
  const { order, orderBy, onRequestSort } =
    props
  const createSortHandler = (property: keyof ConsultantData) => (event: MouseEvent<unknown>) => {
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
        Consultores
      </Typography>
    </Toolbar>
  )
}

const Consultants = () => {

  const { user } = useAuth()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ConsultantData>('id')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openModal, setOpenModal] = useState(false)

  const [consultant, setConsultant] = useState<ConsultantData | null>(null)

  const { data, loading, error, refetch } = useConsultantsQuery();

  const navigation = useNavigate()

  const handleNewClient = () => {
    navigation('add')
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ConsultantData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (consultantData: ConsultantData) => {
    setConsultant(consultantData)
    setOpenModal(true)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRefetch = () => {
    refetch()
  }

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
      Carregando...
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

  const offices = {
    social_media: 'Social Media',
    client_success: 'Sucesso do Cliente',
    designer: 'Designer',
    traffic: 'Tráfego',
    adverts: 'Anúncios'
  }

  const rows = data?.consultants.map(consultant => {
    return createData(
      consultant._id!, consultant.name, consultant.email, offices[consultant.office as keyof typeof offices]
    )
  }) || []

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigation('/dashboard')
    }
  }, [])

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box mb={2}>
        <Button variant="contained" onClick={handleNewClient}>Novo consultor</Button>
      </Box>
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort({ array: rows, comparator: getComparator(order, orderBy) })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: ConsultantData) => {
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
                      <TableCell align="left">{row.office}</TableCell>
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
      {consultant && <ConsultantDetailDialog consultant={consultant} opened={openModal} setModalStatus={setOpenModal} handleReload={handleRefetch} />}
    </Box>
  )
}

export default Consultants
