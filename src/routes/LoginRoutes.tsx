import React, { lazy } from 'react'
import { LoginRoutesProps } from '../@types/cyber'
import Loadable from '../components/Loadable'
import MinimalLayout from '../layout/MinimalLayout'

const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')))

const LoginRoutes: LoginRoutesProps = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    }
  ],
  element: <MinimalLayout />
}

export default LoginRoutes
