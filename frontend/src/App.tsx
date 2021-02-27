import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Visuals } from './Visuals'
import { theme } from './utils/theme'
import reset from 'styled-reset'
import { useCountryData } from 'hooks/countries'
import { useCaseData } from 'hooks/cases'
import { DateSelector } from './DateSelector'
import { ActiveCountry } from './ActiveCountry'

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
  }
`

export const App = () => {
  useCountryData()
  useCaseData()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Visuals />
      <DateSelector />
      <ActiveCountry />
    </ThemeProvider>
  )
}
