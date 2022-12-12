/* eslint-disable */
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { SignInInputProps, User } from '../@types/authContext'
import client from '../config/client'
import { useGetMeLazyQuery, useSignInMutation, SignInMutation, GetMeDocument, GetMeQuery } from '../generated/graphql'

type AuthContextType = {
  user: User | null
  logged: boolean,
  signIn: (data: SignInInputProps) => void
  logout: () => void,
  dataSignIn: SignInMutation | null | undefined
  handleRefetch: () => void
  errorAuth: string,
  dataMe: GetMeQuery | undefined,
  loadingMe: boolean,
  notHasToken: boolean,
  alert: Alert | null,
  openAlert: boolean,
  setOpenAlert: (value: boolean) => void
  currentPathName: string
  setCurrentPahtName: (value: string) => void
}

export const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [signInFn, { data: dataSignIn, loading: loadingSignIn, error: errorSignIn }] = useSignInMutation({
    fetchPolicy: "no-cache",
  })

  const [getMeInContext, { data: dataMe, loading: loadingMe, error: errorMe }] = useGetMeLazyQuery({
    fetchPolicy: "no-cache"
  })

  const [user, setUser] = useState<User | null>(null)
  const [notHasToken, setNotHasToken] = useState<boolean>(true)
  const [errorAuth, setErrorAuth] = useState<string>('')
  const [currentPathName, setCurrentPahtName] = useState<string>('/')

  const [openAlert, setOpenAlert] = useState(false)
  const [alert, setAlert] = useState<Alert | null>(null)

  const navigation = useNavigate()

  const signIn = ({ email, password }: SignInInputProps) => {
    signInFn({
      variables: {
        input: {
          email,
          password
        }
      }
    })
  }

  const handleRefetch = async () => {
    setUser(null)
    setNotHasToken(false)
  }

  const logout = () => {
    localStorage.clear()
    client.clearStore()
    setUser(null)
    navigation('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMeInContext()
      window.location.href
    }
  }, [])

  useEffect(() => {

    if (!loadingMe && dataMe) {
      if (dataMe.getMe) {
        setUser({
          id: dataMe.getMe.id,
          email: dataMe.getMe.email,
          name: dataMe.getMe.name,
          role: dataMe.getMe.role,
          office: dataMe.getMe.office
        })
        setNotHasToken(false)
      }
    }

    if (!dataMe && errorMe) {
      logout()
    }
  }, [loadingMe, dataMe, errorMe])

  useEffect(() => {

    if (!loadingSignIn && dataSignIn) {
      getMeInContext()
      localStorage.setItem('token', dataSignIn.signIn.token)
      navigation('/dashboard')
    }

    if (errorSignIn) {
      setAlert({
        message: String(errorSignIn),
        type: 'error'
      })
      setOpenAlert(true)
    }

  }, [loadingSignIn, dataSignIn, errorSignIn])


  useEffect(() => {
    if (!user && !notHasToken) {
      logout()
    }
  }, [user, notHasToken])

  return (
    <AuthContext.Provider
      value={{
        user,
        logged: !!user,
        signIn,
        logout,
        dataSignIn,
        handleRefetch,
        errorAuth,
        dataMe,
        loadingMe,
        notHasToken,
        alert,
        openAlert,
        setOpenAlert,
        currentPathName,
        setCurrentPahtName
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}