/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { blue } from '@ant-design/colors'

const IncomeAreaChart = ({ slot, dataArr }: { slot: string, dataArr: number[] }) => {

  const theme = useTheme()
  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: 450,
      type: 'area',
      toolbar: {
        show: false
      }
    },

    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      strokeDashArray: 0
    }

  })

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, blue[7]],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }))
  }, [primary, secondary, line, theme, slot])

  return <ReactApexChart options={options} series={[{
    name: 'Seguidores',
    data: dataArr
  }]} type="area" height={300} />
}

export default IncomeAreaChart
