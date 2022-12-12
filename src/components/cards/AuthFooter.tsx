import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material'

export const AuthFooter: React.FC<{}> = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? 'center' : 'inherit'}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="#"
            target="_blank"
            underline="hover"
          >
            Políticas de privacidade
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="#"
            target="_blank"
            underline="hover"
          >
            Suporte
          </Typography>
        </Stack>
      </Stack>
    </Container>
  )
}
