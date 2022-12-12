export type Order = 'asc' | 'desc'

export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface Data {
  id: string
  title: string
  socialNetwork: string[]
  campaingType: string
}

export interface HeadCell {
  id: keyof Data
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface TSort {
  array: readonly T[],
  comparator: (a: T, b: T) => number
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}