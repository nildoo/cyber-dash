/* eslint-disable */
import React, { MouseEvent, useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import * as Yup from 'yup'
import { Formik } from 'formik'

import {
  Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack
} from '@mui/material'

import { AnimateButton } from '../../../components/@extended/AnimateButton'
import { SignInInputProps } from '../../../@types/authContext'
import { useAuth } from '../../../hooks/useAuth'
import { MyAlert } from '../../../components/Alert'

type DataForm = {
  email: string
  password: string
  submit: null
}

const AuthLogin = () => {
  const { signIn, alert, openAlert, setOpenAlert } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault()
  }

  const handleSignIn = (dataForm: DataForm) => {
    const input: SignInInputProps = {
      email: dataForm.email,
      password: dataForm.password
    }
    signIn(input)
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Email inválido').max(255).required('Email é obrgatório'),
          password: Yup.string().max(255).required('Senha é obrigatória')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
            handleSignIn(values)
          } catch (err: any) {
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Entre com seu endereço de email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Senha</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Entre com sua senha"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Link variant="h6" component={RouterLink} to="" color="primary">
                    Esqueci minha senha
                  </Link>
                </Stack>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {alert && <MyAlert alert={alert} openAlert={openAlert} setOpenAlert={setOpenAlert} />}
    </>
  )
}

export default AuthLogin
