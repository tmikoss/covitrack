import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Visuals } from './Visuals'
import { theme } from './utils/theme'
import reset from 'styled-reset'
import { useCountryData } from 'hooks/countries'

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root {
    height: 100vh;
  }
`

export const App = () => {
  useCountryData()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Visuals />
    </ThemeProvider>
  )
}
