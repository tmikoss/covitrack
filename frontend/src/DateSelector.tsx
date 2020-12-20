import { useSettings } from 'hooks/settings'
import { ChangeEventHandler, useCallback } from 'react'
import styled from 'styled-components'
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
`

const SliderContainer = styled.div``

const Slider = styled.input`
  min-width: 40vw;
`

const DateContainer = styled.div`
  color: white;
`

export const DateSelector = () => {
  const { minDate, maxDate, focusDate, setFocusDate } = useSettings()

  const max = differenceInDays(maxDate, minDate)
  const value = differenceInDays(focusDate, minDate)

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFocusDate(addDays(minDate, parseInt(value)))
  }

  return (
    <Container>
      <SliderContainer>
        <Slider type='range' min={0} max={max} value={value} onChange={onChange} />
      </SliderContainer>
      <DateContainer>{format(focusDate, 'yyyy-MM-dd')}</DateContainer>
    </Container>
  )
}
