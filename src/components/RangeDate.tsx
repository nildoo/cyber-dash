/* eslint-disable */
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function ResponsiveDatePickers({ title, handleRefetch }: { title: string, handleRefetch: (value: Dayjs | null) => void }) {
  const [value, setValue] = useState<Dayjs | null>(dayjs())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          disableFuture
          label={title}
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
            handleRefetch(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}
