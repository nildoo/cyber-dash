import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonBase } from '@mui/material'

import config from '../../config'
import { LogoCyber } from './Logo'
import { LogoSectionProps } from '../../@types/cyber'

export const LogoSection: React.FC<LogoSectionProps> = ({ sx, to }) => (
  <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
    <LogoCyber />
  </ButtonBase>
)
