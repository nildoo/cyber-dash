import { Client } from "../generated/graphql"

export interface ClientData {
  id: string
  name: string
  email: string
  whatsapp: string
  contract: string
  othersProducts: string
}

export interface HeadCell2 {
  id: keyof ClientData
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface EnhancedTableProps2 {
  numSelected: number
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof ClientData
  ) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export type ClientProps = {
  client: {
    name: string
  }
}

export interface DataFormNetwork {
  name: string
  followers: number
  likes: number
  comments: number
  reached: number
  posts: number
  profileViews: number
}