/* eslint-disable */
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function DatePickerInput({
  title,
  handleChangeDate,
  startDate
}: {
  title: string,
  handleChangeDate: (value: Dayjs | null) => void,
  startDate: Dayjs
}) {
  const [value, setValue] = useState<Dayjs | null>(startDate)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          label={title}
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          maxDate={dayjs().add(1, 'month')}
          onChange={(newValue) => {
            setValue(newValue)
            handleChangeDate(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}
