import React, { forwardRef } from 'react'

import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow'
import { TransitionsProps } from '../../@types/cyber'

export const Transitions: React.FC<TransitionsProps> = forwardRef(function F (
  { children, position = 'top-left', type = 'grow', ...others },
  ref
) {
  let positionSX = {
    transformOrigin: '0 0 0'
  }

  switch (position) {
    case 'top-right':
    case 'top':
    case 'bottom-left':
    case 'bottom-right':
    case 'bottom':
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0'
      }
      break
  }

  return (
    <Box ref={ref}>
      {type === 'grow' && (
        <Grow {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
    </Box>
  )
})
