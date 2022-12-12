type ConsultantData = {
  id: string
  name: string
  email: string
  office: string
}

type HeadCellConsultant = {
  id: keyof ConsultantData
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface EnhancedTablePropsConsultant {
  numSelected: number
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof ConsultantData
  ) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

type FormDataPropsConsultant = {
  name: string,
  email: string,
  password: string,
  office: string,
  submit: null
}

