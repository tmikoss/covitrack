import { useSettings } from 'hooks/settings'
import styled, { useTheme } from 'styled-components'
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
import { Sparkline } from './Sparkline'

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  grid-template-areas: 'date slider avg';
  align-items: center;
  color: ${({ theme }) => theme.minLevel};
  text-align: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'date avg'
      'slider slider';
  }
`

const ControlsContainer = styled.div`
  grid-area: slider;
  display: flex;
  flex-flow: row;
`

const GraphContainer = styled.div`
  flex: 1;
`

const TextContainer = styled.div`
  grid-area: avg;
  white-space: nowrap;
  overflow: hidden;
`

const DateContainer = styled.div`
  grid-area: date;
`

const Control = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const width = 40
const height = width

const PauseIcon = styled(RawPauseIcon).attrs(() => ({ width, height }))``
const PlayIcon = styled(RawPlayIcon).attrs(() => ({ width, height }))``
const FastForwardIcon = styled(RawFastForwardIcon).attrs(() => ({ width, height }))``

const REVERSE_ICONS: Record<number, React.ReactNode> = {
  '-5': <PauseIcon />,
  '-1': <FastForwardIcon transform='scale(-1, 1)' />,
  0: <PlayIcon transform='scale(-1, 1)' />,
  1: <PlayIcon transform='scale(-1, 1)' />,
  5: <PlayIcon transform='scale(-1, 1)' />,
}

const NEXT_REVERSE_SPEED: Record<number, number> = {
  '-5': 0,
  '-1': -5,
  0: -1,
  '1': -1,
  '5': -1,
}

const FORWARD_ICONS: Record<number, React.ReactNode> = {
  '-5': <PlayIcon />,
  '-1': <PlayIcon />,
  0: <PlayIcon />,
  '1': <FastForwardIcon />,
  '5': <PauseIcon />,
}

const NEXT_FORWARD_SPEED: Record<number, number> = {
  '-5': 1,
  '-1': 1,
  0: 1,
  '1': 5,
  '5': 0,
}

export const Controls = () => {
  const { minDate, maxDate, focusDate, setFocusDate } = useSettings()
  const [animationSpeed, setAnimationSpeed] = useState(0)

  const { code, name } = useCountries(useCallback((state) => state.activeCountry, [])) || {}

  const activeCode = code || WORLD_CODE

  const activeCountryData = useCases(useCallback((state) => state.countries[activeCode], [activeCode])) || {}

  const averageNewCases = activeCountryData[format(focusDate, API_DATE_FORMAT)] || 0

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDate = addDays(focusDate, animationSpeed)
      if (animationSpeed > 0 && nextDate <= maxDate) {
        setFocusDate(nextDate)
      } else if (animationSpeed < 0 && nextDate >= minDate) {
        setFocusDate(nextDate)
      } else if (animationSpeed < 0) {
        setFocusDate(minDate)
        setAnimationSpeed(0)
      } else if (animationSpeed > 0) {
        setFocusDate(maxDate)
        setAnimationSpeed(0)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [focusDate, animationSpeed])

  const setReverse = useCallback(() => setAnimationSpeed((speed) => NEXT_REVERSE_SPEED[speed]), [])
  const setForward = useCallback(() => setAnimationSpeed((speed) => NEXT_FORWARD_SPEED[speed]), [])

  return (
    <Container>
      <DateContainer>
        {format(focusDate, 'dd.MM.yyyy')}, {name || 'Worldwide'}
      </DateContainer>
      <ControlsContainer>
        <Control onClick={setReverse} disabled={focusDate === minDate}>
          {REVERSE_ICONS[animationSpeed]}
        </Control>
        <GraphContainer>
          <Sparkline country={activeCode} setAnimationSpeed={setAnimationSpeed} />
        </GraphContainer>
        <Control onClick={setForward} disabled={focusDate === maxDate}>
          {FORWARD_ICONS[animationSpeed]}
        </Control>
      </ControlsContainer>
      <TextContainer>avg {round(averageNewCases, 2)} new cases / million</TextContainer>
    </Container>
  )
}
