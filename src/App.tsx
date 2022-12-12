import React from 'react'
import dayjs from 'dayjs'
import { ApolloProvider } from '@apollo/client'
import { ThemeCustomization } from './themes'
import ScrollTop from './components/ScrollTop'
import 'dayjs/locale/pt-br.js'
import Routes from './routes'
import client from './config/client'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './context/AuthContext'
dayjs.locale('pt-br')

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <ApolloProvider client={client}>
        <AuthProvider>
          <CookiesProvider>
            <Routes />
          </CookiesProvider>
        </AuthProvider>
      </ApolloProvider>
    </ScrollTop>
  </ThemeCustomization>
)

export default App
