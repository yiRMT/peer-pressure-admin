import '@/styles/globals.css'
import Header from '@/components/Header/Header'
import { ThemeProvider, createTheme } from '@mui/material'

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header/>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
