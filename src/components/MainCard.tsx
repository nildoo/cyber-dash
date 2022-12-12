import React, { forwardRef } from 'react'
import { alpha, useTheme } from '@mui/material/styles'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Highlighter } from './third-party/Highlighter'
import { grey } from '@ant-design/colors'
import { MainCardProps } from '../@types/cyber'

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
}
export const MainCard: React.FC<MainCardProps> = forwardRef(
  function F ({
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    divider = true,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    codeHighlight,
    ...others
  }: MainCardProps, ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined
  ) {
    const theme = useTheme()
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : grey[0],
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}` : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}` : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          }
        }}
      >
        {!darkTitle && title && (
          <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {title && divider && <Divider />}

        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter codeHighlight={codeHighlight} main>
              {children}
            </Highlighter>
          </>
        )}
      </Card>
    )
  }
)
