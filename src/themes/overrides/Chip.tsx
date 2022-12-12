import { gold, green, red } from '@ant-design/colors'
import { Theme } from '@mui/material/styles'

export default function Chip (theme: Theme) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:active': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          fontSize: '1rem',
          height: 40
        },
        light: {
          color: theme.palette.primary.main,
          backgroundColor: '#ffeadd',
          borderColor: theme.palette.primary.light,
          '&.MuiChip-lightError': {
            color: theme.palette.error.main,
            backgroundColor: red[1],
            borderColor: theme.palette.error.light
          },
          '&.MuiChip-lightSuccess': {
            color: theme.palette.success.main,
            backgroundColor: green[0],
            borderColor: theme.palette.success.light
          },
          '&.MuiChip-lightWarning': {
            color: theme.palette.warning.main,
            backgroundColor: gold[0],
            borderColor: theme.palette.warning.light
          }
        }
      }
    }
  }
}
