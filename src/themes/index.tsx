import React, { useMemo } from 'react'

import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Palette from './palette'
import Typography from './typography'
import CustomShadows from './shadows'

import ComponentsOverrides from './overrides'
import { ThemeCustomizationProps } from '../@types/cyber'

export const ThemeCustomization: React.FC<ThemeCustomizationProps> = ({ children }) => {
  const theme = Palette('light')
  const themeTypography = Typography('\'Public Sans\', sans-serif')
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme])

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      dirction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  )

  const themes = createTheme(themeOptions)

  themes.components = ComponentsOverrides(themes)

  const themme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF6400'
      }
    },
    typography: themeTypography
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
