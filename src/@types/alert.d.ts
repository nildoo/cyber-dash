
type Alert = {
  message: string
  type: 'success' | 'error'
}

type AlertProps = {
  openAlert: boolean
  setOpenAlert: (value: boolean) => void
  alert: Alert
}

