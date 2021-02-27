import { useSettings } from 'hooks/settings'
import styled from 'styled-components'
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import { useCases } from 'hooks/cases'
import { useCallback, useEffect, useState } from 'react'
import { WORLD_CODE, API_DATE_FORMAT } from 'utils/globals'
import round from 'lodash/round'
import { ReactComponent as RawFastForwardIcon } from 'icons/fastForward.svg'
import { ReactComponent as RawPlayIcon } from 'icons/playArrow.svg'
import { ReactComponent as RawPauseIcon } from 'icons/pause.svg'
import { useCountries } from 'hooks/countries'

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  grid-template-areas: 'name . avg';
  align-items: center;
  color: ${({ theme }) => theme.minLevel};
  text-align: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'name avg';
  }
`

const AvgContainer = styled.div`
  grid-area: avg;
  white-space: nowrap;
  overflow: hidden;
`

const NameContainer = styled.div`
  grid-area: name;
`

export const ActiveCountry = () => {
  const { focusDate } = useSettings()
  const { code, name } = useCountries(useCallback((state) => state.activeCountry, [])) || {}
  const activeCountryData = useCases(useCallback((state) => (code && state.countries[code]) || {}, [code]))
  const averageNewCases = activeCountryData[format(focusDate, API_DATE_FORMAT)] || 0

  return (
    <Container>
      <NameContainer>{name}</NameContainer>
      <AvgContainer>avg {round(averageNewCases, 2)} new cases / million</AvgContainer>
    </Container>
  )
}
