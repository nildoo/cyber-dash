import React, { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'simplebar/src/simplebar.css'
import { Provider as ReduxProvider } from 'react-redux'
import './assets/third-party/apex-chart.css'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
)

reportWebVitals()
