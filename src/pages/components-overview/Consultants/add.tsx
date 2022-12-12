/* eslint-disable */
import React, { MouseEvent, useState, useEffect } from 'react'
import { Formik } from 'formik'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { AnimateButton } from '../../../components/@extended/AnimateButton'
import {
  strengthColor,
  strengthIndicator
} from '../../../utils/password-strength'

import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'

import { useAddConsultantMutation } from '../../../generated/graphql'
import {
  LevelProps,
} from '../../../@types/cyber'
import { FormDataPropsConsultant } from '../../../@types/consultants'
import { MyAlert } from '../../../components/Alert'
import { useAuth } from '../../../hooks/useAuth'

const AddConsultant = () => {

  const { user } = useAuth()

  const [addConsultantFn, { data, loading, error }] = useAddConsultantMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [level, setLevel] = useState<LevelProps>()
  const navigation = useNavigate()

  const [openAlert, setOpenAlert] = useState(false)
  const [alert, setAlert] = useState<Alert | null>(null)

  const handleSubmit = (formData: FormDataPropsConsultant) => {

    const inputa = {
      name: formData.name,
      email: formData.email,
      office: formData.office,
      password: formData.password,
      role: 'consultant'
    }

    addConsultantFn({
      variables: {
        input: {
          name: formData.name,
          email: formData.email,
          office: formData.office,
          password: formData.password,
          role: 'consultant'
        }
      }
    })
  }

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault()
  }

  const handleGoBack = () => {
    navigation(-1)
  }

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigation('/dashboard')
    }
  }, [])

  useEffect(() => {
    if (error) {
      setAlert({
        message: String(error),
        type: 'error'
      })
      setOpenAlert(true)
    }
  }, [error])

  useEffect(() => {
    if (!loading && data) {
      navigation(-1)
    }
  }, [loading, data])

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h3">Novo consultor</Typography>
            </Stack>
            <Typography variant="h6" mt={2} fontStyle="italic">
              * Dados obrigatórios
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                office: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Nome é obrigatório'),
                office: Yup.string()
                  .max(255)
                  .required('Cargo é obrigatório'),
                email: Yup.string()
                  .email('Insira um email válido')
                  .max(255)
                  .required('Email é obrigatório'),
                password: Yup.string().max(255).required('Senha é obrigatória')
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  setStatus({ success: false })
                  setSubmitting(false)
                  handleSubmit(values)
                } catch (err: any) {
                  console.error(err)
                  setStatus({ success: false })
                  setErrors({ submit: err.message })
                  setSubmitting(false)
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                isSubmitting,
                handleSubmit,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid mb={2}>
                    <Typography variant="overline" fontWeight={700}>
                      Dados pessoais:
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="name">Nome*</InputLabel>
                        <OutlinedInput
                          id="name"
                          type="text"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Cyber for Business"
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText error id="helper-text-name">
                            {errors.name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="email" style={{ paddingTop: 2 }}>
                          Email*
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="exemplo@exemplo.com"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="helper-text-email">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={0}>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="office" style={{ paddingTop: 2 }}>
                          Cargo*
                        </InputLabel>
                        <Select
                          id="office"
                          value={values.office}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Cargo"
                          name="office"
                          placeholder="Social Media, sucesso do cliente..."
                          fullWidth
                          error={Boolean(
                            touched.office && errors.office
                          )}
                        >
                          <MenuItem value="social_media">Social Media</MenuItem>
                          <MenuItem value="client_success">Sucesso do Cliente</MenuItem>
                          <MenuItem value="designer">Designer</MenuItem>
                          <MenuItem value="traffic">Tráfego</MenuItem>
                          <MenuItem value="adverts">Anúncios</MenuItem>
                        </Select>
                        {touched.office && errors.office && (
                          <FormHelperText error id="helper-text-office">
                            {errors.office}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="password"
                          style={{ paddingTop: 2 }}
                        >
                          Senha
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e)
                            changePassword(e.target.value)
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={(event) =>
                                  handleMouseDownPassword(event)
                                }
                                edge="end"
                                size="large"
                              >
                                {showPassword
                                  ? (<EyeOutlined />)
                                  : (<EyeInvisibleOutlined />)}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="******"
                          inputProps={{}}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="helper-text-password-signup"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth sx={{ mt: 1 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              sx={{
                                bgcolor: level?.color,
                                width: 85,
                                height: 8,
                                borderRadius: '7px'
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label === 'Poor' && 'Pobre'}
                              {level?.label === 'Weak' && 'Fraca'}
                              {level?.label === 'Normal' && 'Normal'}
                              {level?.label === 'Good' && 'Boa'}
                              {level?.label === 'Strong' && 'Forte'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <AnimateButton mr={8}>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={handleGoBack}
                      >
                        Voltar
                      </Button>
                    </AnimateButton>
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
                        Salvar
                      </Button>
                    </AnimateButton>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {alert && <MyAlert alert={alert} openAlert={openAlert} setOpenAlert={setOpenAlert} />}
    </Box>
  )
}

export default AddConsultant
