/* eslint-disable */
import { useLocation, useRoutes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import LoginRoutes from './LoginRoutes'
import MainRoutes from './MainRoutes'

export default function ThemeRoutes() {
  const { handleRefetch, setCurrentPahtName } = useAuth()
  const token = localStorage.getItem('token')

  const location = useLocation()
  setCurrentPahtName(location.pathname)

  if (!token) {
    handleRefetch()
  }

  return useRoutes([MainRoutes, LoginRoutes])
}
