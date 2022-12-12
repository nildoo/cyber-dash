/* eslint-disable */
import React, { MouseEvent, useState } from 'react'
import { Formik } from 'formik'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import Checkbox from '@mui/material/Checkbox'
import InputMask from 'react-input-mask'
import cepromise from 'cep-promise'


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
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Divider
} from '@mui/material'
import { FormDataUpdateClient, OthersContracts } from '../@types/cyber'
import { useUpdateClientMutation } from '../generated/graphql'
import { AnimateButton } from './@extended/AnimateButton'

const EditClient = ({ client, setEditMode }: { client: FormDataUpdateClient, setEditMode: (value: boolean) => void }) => {
  const navigation = useNavigate()

  const [updateClientFn, { data, loading, error }] = useUpdateClientMutation()

  const options = [
    {
      item: 'site_development',
      title: 'Desenvolvimento de Site'
    },
    {
      item: 'site_maintenance',
      title: 'Manutenção de Site'
    },
    {
      item: 'landing_page',
      title: 'Landing Page'
    },
    {
      item: 'extra_art',
      title: 'Arte EXTRA'
    },
    {
      item: 'extra_network',
      title: 'Rede Social Extra (Tik Tok)'
    }
  ]

  const handleSubmit = (formData: FormDataUpdateClient) => {

    const ctype = {
      quarterly: { type: 'quarterly', title: 'Trimestral' },
      automatic: { type: 'automatic', title: 'Renovação automática' }
    }

    const inputa = {
      address: {
        city: formData.city,
        neighborhood: formData.neighborhood,
        state: formData.state,
        street: formData.street,
        zipcode: formData.zipcode,
        complement: formData.complement,
        number: String(formData.number)
      },
      contractType: ctype[formData.contractType as keyof typeof ctype],
      cnpj: formData.cnpj,
      name: formData.name,
      othersContracts: {
        extra_art: formData.othersContratcs.extra_art,
        extra_network: formData.othersContratcs.extra_network,
        landing_page: formData.othersContratcs.landing_page,
        site_development: formData.othersContratcs.site_development,
        site_maintenance: formData.othersContratcs.site_maintenance,
      },
      phone: formData.phone,
      whatsapp: formData.whatsapp,
    }

    updateClientFn({
      variables: {
        input: {
          id: client.id!,
          address: {
            city: formData.city,
            neighborhood: formData.neighborhood,
            state: formData.state,
            street: formData.street,
            zipcode: formData.zipcode,
            complement: formData.complement,
            number: String(formData.number),
          },
          //@ts-ignore
          cnpj: formData.cnpj,
          contractType: ctype[formData.contractType as keyof typeof ctype],
          name: formData.name,
          phone: formData.phone || '',
          whatsapp: formData.whatsapp,
          othersContracts: {
            extra_art: formData.othersContratcs.extra_art,
            extra_network: formData.othersContratcs.extra_network,
            landing_page: formData.othersContratcs.landing_page,
            site_development: formData.othersContratcs.site_development,
            site_maintenance: formData.othersContratcs.site_maintenance,

          }
        }
      }
    })

  }


  if (loading) {
    return <h1>Loading..</h1>
  }

  if (error) {
    return <h1>Error.. {String(error)}</h1>
  }

  if (!loading && data) {
    setEditMode(false)
  }

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
          </Stack>
          <Typography variant="h6" mt={2} fontStyle="italic">
            * Dados obrigatórios
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              name: client.name,
              cnpj: client.cnpj,
              street: client.street,
              zipcode: client.zipcode,
              city: client.city,
              state: client.state,
              neighborhood: client.neighborhood,
              number: client.number,
              complement: client.complement,
              whatsapp: client.whatsapp,
              phone: client.phone,
              contractType: client.contractType,
              othersContratcs: {
                site_development: client.othersContratcs.site_development,
                site_maintenance: client.othersContratcs.site_maintenance,
                landing_page: client.othersContratcs.landing_page,
                extra_art: client.othersContratcs.extra_art,
                extra_network: client.othersContratcs.extra_network,
              },
              submit: null
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Nome é obrigatório'),
              cnpj: Yup.string().max(18).required('CNPJ é obrigatório'),
              zipcode: Yup.string().max(10).required('Insira seu zipcode'),
              street: Yup.string()
                .max(255)
                .required('Logradouro é obrigatório'),
              neighborhood: Yup.string()
                .max(255)
                .required('Bairro é obrigatório'),
              city: Yup.string().max(255).required('Cidade é obrigatório'),
              state: Yup.string().max(255).required('Estado é obrigatório'),
              whatsapp: Yup.string()
                .max(255)
                .required('WhatsApp é obrigatório'),
              contractType: Yup.string()
                .max(255)
                .required('Tipo de contrato é obrigatório'),
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
              setFieldValue
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid xs={12} mb={5}>
                  <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                    Dados pessoais
                  </Typography>
                  <Divider />
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
                      <InputLabel id="contractType" style={{ paddingTop: 2 }}>
                        Tipo de contrato*
                      </InputLabel>
                      <Select
                        id="contractType"
                        value={values.contractType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Tipo de contrato"
                        name="contractType"
                        placeholder="Tipo de contrato"
                        fullWidth
                        error={Boolean(
                          touched.contractType && errors.contractType
                        )}
                      >
                        <MenuItem value="quarterly">Trimestral</MenuItem>
                        <MenuItem value="automatic">
                          Renovação Automática
                        </MenuItem>
                      </Select>
                      {touched.contractType && errors.contractType && (
                        <FormHelperText error id="helper-text-contractType">
                          {errors.contractType}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={0}>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="whatsapp">
                        WhatsApp*
                      </InputLabel>
                      <OutlinedInput
                        id="whatsapp"
                        value={values.whatsapp}
                        type="text"
                        name="whatsapp"
                        onBlur={handleBlur}
                        inputProps={{
                          maxLength: 14
                        }}
                        onChange={(e) => {
                          let v = e.target.value
                          v = v.replace(/\D/g, "")
                          v = v.replace(/^(\d{2})(\d)/, "($1) $2")
                          v = v.replace(/^\((\d{2})\) (\d{4})(\d)/, "($1) $2-$3")
                          setFieldValue('whatsapp', v)

                        }}
                        placeholder="(99) 91234-5678"
                        fullWidth
                        error={Boolean(
                          touched.whatsapp && errors.whatsapp
                        )}
                      />
                      {touched.whatsapp && errors.whatsapp && (
                        <FormHelperText error id="helper-text-whatsapp">
                          {errors.whatsapp}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="cnpj" sx={{ paddingTop: 0.1 }}>
                        CNPJ*
                      </InputLabel>
                      <OutlinedInput
                        value={values.cnpj}
                        id="cnpj"
                        type="text"
                        name="cnpj"
                        onBlur={handleBlur}
                        inputProps={{ maxLength: 18 }}
                        onChange={(e) => {
                          let v = e.target.value
                          v = v.replace(/\D/g, "")                           //Remove tudo o que não é dígito
                          v = v.replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
                          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
                          v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
                          v = v.replace(/(\d{4})(\d)/, "$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos

                          setFieldValue('cnpj', v)
                        }}
                        placeholder="12.345.678/0001-10"
                        fullWidth
                        error={Boolean(
                          touched.cnpj && errors.cnpj
                        )}
                      />
                      {touched.cnpj && errors.cnpj && (
                        <FormHelperText error id="helper-text-cnpj">
                          {errors.cnpj}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="name"
                        style={{ paddingTop: 2 }}>
                        Telefone
                      </InputLabel>
                      <OutlinedInput
                        id="phone"
                        type="text"
                        name="phone"
                        value={values.phone}
                        inputProps={{ maxLength: 14 }}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          let v = e.target.value
                          v = v.replace(/\D/g, "")
                          v = v.replace(/^(\d{2})(\d)/, "($1) $2")
                          v = v.replace(/^\((\d{2})\) (\d{4})(\d)/, "($1) $2-$3")
                          setFieldValue('phone', v)
                        }}
                        placeholder="(99) 1234-5678"
                        fullWidth
                        error={Boolean(touched.phone && errors.phone)}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText error id="helper-text-phone">
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid xs={12} mb={5} mt={3}>
                  <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                    Endereço
                  </Typography>
                  <Divider />
                </Grid>

                <Grid container spacing={2}>
                  {/* zipcode */}
                  <Grid item xs={12} md={2}>
                    <InputMask
                      mask="99999-999"
                      value={values.zipcode}
                      onChange={(e) => {
                        handleChange(e)
                        if (!e.target.value.includes('_')) {
                          cepromise(e.target.value).then((r) => {
                            setFieldValue('city', r.city)
                            setFieldValue('neighborhood', r.neighborhood)
                            setFieldValue('street', r.street)
                            setFieldValue('state', r.state)
                          })
                        } else {
                          setFieldValue('city', '')
                          setFieldValue('neighborhood', '')
                          setFieldValue('street', '')
                          setFieldValue('state', '')
                        }
                      }}
                    >
                      {/* @ts-ignore */}
                      {() => (
                        <FormControl fullWidth>
                          <InputLabel
                            htmlFor="zipcode"
                            style={{ paddingTop: 2 }}
                          >
                            CEP*
                          </InputLabel>
                          <OutlinedInput
                            id="zipcode"
                            type="text"
                            name="zipcode"
                            onBlur={handleBlur}
                            placeholder="122134-253"
                            autoComplete="off"
                            fullWidth
                            error={Boolean(touched.zipcode && errors.zipcode)}
                          />
                          {touched.zipcode && errors.zipcode && (
                            <FormHelperText error id="helper-text-zipcode">
                              {errors.zipcode}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </InputMask>
                  </Grid>

                  {/* Street */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="street"
                        style={{ paddingBottom: 2 }}
                      >
                        Logradouro*
                      </InputLabel>
                      <OutlinedInput
                        id="street"
                        type="text"
                        value={values.street}
                        name="street"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: Rua João e Maria, Av. Pedro maia.."
                        autoComplete="off"
                        fullWidth
                        error={Boolean(touched.street && errors.street)}
                      />
                      {touched.street && errors.street && (
                        <FormHelperText error id="helper-text-street">
                          {errors.street}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* City */}
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="city" style={{ paddingTop: 2 }}>
                        Cidade*
                      </InputLabel>
                      <OutlinedInput
                        id="city"
                        type="text"
                        value={values.city}
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: Rio de Janeiro.."
                        autoComplete="off"
                        fullWidth
                        error={Boolean(touched.city && errors.city)}
                      />
                      {touched.city && errors.city && (
                        <FormHelperText error id="helper-text-city">
                          {errors.city}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={1}>
                  {/* neighborhood */}
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="neighborhood"
                        style={{ paddingTop: 2 }}
                      >
                        Bairro*
                      </InputLabel>
                      <OutlinedInput
                        id="neighborhood"
                        type="text"
                        value={values.neighborhood}
                        name="neighborhood"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: Jardim das flores.."
                        autoComplete="off"
                        fullWidth
                        error={Boolean(
                          touched.neighborhood && errors.neighborhood
                        )}
                      />
                      {touched.neighborhood && errors.neighborhood && (
                        <FormHelperText error id="helper-text-neighborhood">
                          {errors.neighborhood}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* state */}
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="state" style={{ paddingTop: 2 }}>
                        Estado*
                      </InputLabel>
                      <Select
                        id="state"
                        value={values.state}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Estado"
                        name="state"
                        placeholder="ex: SP"
                        fullWidth
                        error={Boolean(touched.state && errors.state)}
                      >
                        <MenuItem value="AC">Acre</MenuItem>
                        <MenuItem value="AL">Alagoas</MenuItem>
                        <MenuItem value="AP">Amapá</MenuItem>
                        <MenuItem value="AM">Amazonas</MenuItem>
                        <MenuItem value="BA">Bahia</MenuItem>
                        <MenuItem value="CE">Ceará</MenuItem>
                        <MenuItem value="ES">Espírito Santo</MenuItem>
                        <MenuItem value="MA">Maranhão</MenuItem>
                        <MenuItem value="MT">Mato Grosso</MenuItem>
                        <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                        <MenuItem value="MG">Minas Gerais</MenuItem>
                        <MenuItem value="PA">Pará</MenuItem>
                        <MenuItem value="PB">Paraíba</MenuItem>
                        <MenuItem value="PR">Paraná</MenuItem>
                        <MenuItem value="PE">Pernambuco</MenuItem>
                        <MenuItem value="PI">Piauí</MenuItem>
                        <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                        <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                        <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                        <MenuItem value="RO">Rondônia</MenuItem>
                        <MenuItem value="RR">Roraima</MenuItem>
                        <MenuItem value="SC">Santa Catarina</MenuItem>
                        <MenuItem value="SP">São Paulo</MenuItem>
                        <MenuItem value="SE">Sergipe</MenuItem>
                        <MenuItem value="TO">Tocantins</MenuItem>
                        <MenuItem value="DF">Distrito Federal</MenuItem>
                      </Select>
                      {touched.state && errors.state && (
                        <FormHelperText error id="helper-text-state">
                          {errors.state}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* number */}
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="number" style={{ paddingTop: 2 }}>
                        Número
                      </InputLabel>
                      <OutlinedInput
                        id="number"
                        type="number"
                        value={values.number}
                        name="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                        placeholder="Número da casa/apto"
                        autoComplete="off"
                        fullWidth
                        error={Boolean(touched.number && errors.number)}
                      />
                      {touched.number && errors.number && (
                        <FormHelperText error id="helper-text-number">
                          {errors.number}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* complement */}
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="complement"
                        style={{ paddingTop: 2 }}
                      >
                        Complemento
                      </InputLabel>
                      <OutlinedInput
                        id="complement"
                        type="text"
                        value={values.complement}
                        name="complement"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: Casa / Apto. A / Qd. 12"
                        autoComplete="off"
                        fullWidth
                        error={Boolean(
                          touched.complement && errors.complement
                        )}
                      />
                      {touched.complement && errors.complement && (
                        <FormHelperText error id="helper-text-complement">
                          {errors.complement}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid xs={12} mb={3} mt={3}>
                  <Typography variant='overline' fontWeight='700' fontSize={14} color="primary">
                    Endereço
                  </Typography>
                  <Divider />
                </Grid>

                <Grid container>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      {options.map((i) => {
                        return (
                          <FormControlLabel
                            key={i.item}
                            label={i.title}
                            control={
                              <Checkbox
                                checked={
                                  values.othersContratcs[i.item as keyof OthersContracts]
                                }
                                name={`othersContratcs${i.item}`}
                                onChange={(event) => {
                                  setFieldValue(
                                    `othersContratcs.${i.item}`,
                                    event.target.checked
                                  )
                                }}
                              />
                            }
                          />
                        )
                      })}
                    </FormControl>
                  </Grid>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid container mt={3}>
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
    </Box>
  )
}

export default EditClient
