import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

const AuthBackground = () => {
  const theme = useTheme()
  return (
    <Box sx={{ position: 'absolute', left: '10%', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <svg width="606" height="694" viewBox="0 0 606 694" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M446.495 0.746216L341.398 296.051L316.214 186.82C316.214 186.82 277.281 175.354 235.682 199.087C194.082 222.82 184.35 251.73 184.35 251.73L265.151 462.11L157.862 693.443H311.001L605.082 0.746216H446.495Z" fill="url(#paint0_linear_107_15)" />
        <path d="M410.515 41.4885L365.323 159.19C365.323 159.19 223.096 120.871 160.638 248.889C93.9532 393.632 223.851 489.013 223.851 489.013L170.59 594.518C170.59 594.518 52.8513 550.073 13.1321 413.064C-21.2532 294.455 27.0628 192.893 27.0628 192.893C91.1813 40.7514 255.628 -18.9152 410.515 41.4885Z" fill="white" />
        <path d="M579.777 443.704L457.322 437.387L362.788 632.395C362.788 632.395 423.054 632.395 495.244 570.208C567.434 508.022 579.777 443.704 579.777 443.704Z" fill="white" />
        <defs>
          <linearGradient id="paint0_linear_107_15" x1="499.957" y1="35.2045" x2="233.832" y2="707.812" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5A145" />
            <stop offset="1" stopColor="#F08146" />
          </linearGradient>
        </defs>
      </svg>

    </Box>
  )
}

export default AuthBackground
