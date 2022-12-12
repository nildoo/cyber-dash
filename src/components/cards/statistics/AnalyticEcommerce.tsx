import React from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import RiseOutlined from '@ant-design/icons/RiseOutlined'
import FallOutlined from '@ant-design/icons/FallOutlined'
import { MainCard } from '../../MainCard'
import { AnalyticEcommerceProps } from '../../../@types/cyber'

export const AnalyticEcommerce: React.FC<AnalyticEcommerceProps> = ({ color = 'primary', title, count, percentage, isLoss, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h1" color="inherit">
              {count}
            </Typography>
          </Grid>
          {/* {percentage && (
            <Grid item>
              <Chip
                variant="filled"
                color={color}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )} */}
        </Grid>
      </Stack>
      {/* <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          Mais{' '}
          <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
            {extra}
          </Typography>{' '}
          hoje
        </Typography>
      </Box> */}
    </>
  </MainCard>
)
