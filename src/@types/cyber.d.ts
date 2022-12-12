import { ChipProps, Direction } from '@mui/material'
import { MouseEvent } from 'react'

type PropsDrawer = {
  open: boolean
  handleDrawerToggle: () => void
  window?: Window
}

type AnimateButtonProps = {
  children?: JSX.Element
  type?: 'rotate' | 'slide' | 'scale'
  mr?: number
}

type BreadcrumbsProps = {
  navigation: object
  title: boolean
}

type DotProps = {
  color: string
  size: number
}

type TransitionsProps = {
  children?: JSX.Element
  type: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom'
  position?:
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom'
}

type AnalyticEcommerceProps = {
  color?:
  | 'primary'
  | 'secondary'
  | 'default'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | undefined
  title: string | JSX.Element
  count: string
  percentage?: number
  isLoss?: boolean
  extra?: string
}

type MainCardProps = {
  border?: boolean
  boxShadow?: boolean
  contentSX?: object
  darkTitle?: boolean
  divider?: boolean
  elevation?: number
  secondary?: JSX.Element
  shadow?: string
  sx?: object
  title?: string | JSX.Element
  codeHighlight?: boolean
  content?: boolean
  children?: JSX.Element
}

type Path = {
  path: string
  element: JSX.Element
}

type LoginRoutesProps = {
  path: string
  element: JSX.Element
  children: Path[]
}

type ThemeCustomizationProps = {
  children?: JSX.Element
}

type SyntaxHighlightProps = {
  children: string | string[]
  others?: any
}

type FileType = {
  file: File
  id: string
  name: string
  readableSize: string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
  };
size: number,
  preview: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string | null
}

type FileListProps = {
  files: FileType[]
}

type PreviewProps = {
  src?: string
}

type LogoSectionProps = {
  sx?: object
  to?: string
}

type AuthWrapperProps = {
  children: JSX.Element
}

type HighlighterProps = {
  children?: JSX.Element
  codeHighlight: boolean
  main: boolean
}

type SimpleBarScrollProps = {
  children?: JSX.Element
  sx: object
}

type UploadScreenProps = {
  onUpload: (files: File[]) => void
  fileType: 'image' | 'video'
}

type UploadMessageProps = {
  type?: 'error' | 'success'
  text: string
}

type ItemType = {
  id: string
  title: string
  type: string
  url: string
  icon: any
  target?: boolean
  external?: boolean
  disabled?: boolean
  chip?: ChipProps
}

type GroupType = {
  id: string
  title: string
  type: string
  children: ItemType[]
}

type NavGroupProps = {
  item: GroupType
}

type StateReduxProps = {
  openItem: string[]
  openComponent: string
  drawerOpen: boolean
  componentDrawerOpen: boolean
}

type NavItemProps = {
  item: ItemType
  level: number
}

type TabPanelProps = {
  children: JSX.Element,
  index: any,
  value: any,
  dir?: Direction
}

type HeaderProps = {
  open: boolean,
  handleDrawerToggle: () => void
}

type OthersContracts = {
  site_development: boolean,
  site_maintenance: boolean,
  landing_page: boolean,
  extra_art: boolean,
  extra_network: boolean
}

type FormDataAddClient = {
  name: string,
  consultant: string,
  cnpj: string,
  email: string,
  street: string,
  zipcode: string,
  city: string,
  state: string,
  neighborhood: string,
  number: string | undefined,
  complement: string,
  whatsapp: string,
  password: string,
  phone: string,
  contractType: string,
  othersContratcs: OthersContracts
  submit: null | any
}

type FormDataUpdateClient = {
  id?: string,
  name: string,
  cnpj: string,
  street: string,
  zipcode: string,
  city: string,
  state: string,
  neighborhood: string,
  number: string | undefined,
  complement: string | undefined,
  whatsapp: string,
  phone: string | undefined,
  contractType: string,
  othersContratcs: OthersContracts
  submit: null | any
}

type LevelProps = {
  label: string;
  color: string
}

type EnhancedTableHeadProps = {
  numSelected: number,
  onRequestSort: (property: string) => void,
  onSelectAllClick: () => void,
  order: 'asc' | 'desc'
  orderBy: string,
  rowCount: number
}

export type T = typeof T

export type SimpleDialogProps = {
  onClose: (value: string) => void,
  selectedValue: string,
  open: boolean
}

export type Social = {
  networkType: string
  week: number[]
  year: number[]
}

export type IFile = {
  id: string
  title: string
  type: string
  thumb: string
  url: string
  approved: boolean
  size: number
  folder: string
  firebasePath: string
}