import differenceInDays from 'date-fns/differenceInDays'
import { useCases } from 'hooks/cases'
import { useSettings } from 'hooks/settings'
import values from 'lodash/values'
import { useCallback, useRef, MouseEvent } from 'react'
import styled from 'styled-components'
import flatMap from 'lodash/flatMap'
import parse from 'date-fns/parse'
import { API_DATE_FORMAT } from 'utils/globals'
import addDays from 'date-fns/addDays'

const FillLine = styled.polyline`
  stroke-width: 0;
  fill: ${({ theme }) => theme.maxLevel};
  fill-opacity: 0.2;
`

const MainLine = styled.polyline`
  stroke: ${({ theme }) => theme.maxLevel};
  stroke-width: 1;
  fill: none;
`

const SliderIndicator = styled.line`
  stroke: ${({ theme }) => theme.minLevel};
  stroke-width: 2;
  opacity: 0.5;
  cursor: move;
`

const ClickInterceptor = styled.rect`
  stroke-width: 0;
  opacity: 0;
`

export const Sparkline: React.FC<{ country: string; setAnimationSpeed: (speed: number) => void }> = ({
  country,
  setAnimationSpeed,
}) => {
  const { minDate, maxDate, focusDate, setFocusDate } = useSettings()

  const svgRef = useRef<SVGSVGElement>(null)

  const margin = 1

  const countryData = useCases(useCallback((state) => state.countries[country], [country]))

  const max = Math.max(...values(countryData))

  const width = differenceInDays(maxDate, minDate)
  const height = width / 10

  const baseDate = new Date()

  const mainLinePoints = [0, height].concat(
    flatMap(countryData, (value, dateString) => {
      const date = parse(dateString, API_DATE_FORMAT, baseDate)
      const x = differenceInDays(date, minDate)
      const y = height - (value / max) * height
      return [x, y]
    })
  )

  const fillLinePoints = [...mainLinePoints, width, height + margin, 0, height + margin]

  const sliderX = differenceInDays(focusDate, minDate)

  const onClick = useCallback(
    (e: MouseEvent) => {
      const svg = svgRef.current

      if (!svg) {
        return
      }

      const tempPoint = svg.createSVGPoint()
      tempPoint.x = e.clientX
      tempPoint.y = e.clientY

      const ctm = svg.getScreenCTM()
      if (!ctm) {
        return
      }
      const { x } = tempPoint.matrixTransform(ctm.inverse())

      setFocusDate(addDays(minDate, Math.floor(x)))
      setAnimationSpeed(0)
    },
    [minDate, setFocusDate, setAnimationSpeed]
  )

  return (
    <svg ref={svgRef} viewBox={`-${margin} -${margin} ${width + 2 * margin} ${height + 2 * margin}`}>
      <FillLine points={fillLinePoints.join(' ')} />
      <MainLine points={mainLinePoints.join(' ')} />

      <ClickInterceptor
        x={-margin}
        y={-margin}
        width={width + 2 * margin}
        height={height + 2 * margin}
        onClick={onClick}
      />

      <SliderIndicator x1={sliderX} y1={-margin} x2={sliderX} y2={height + margin} />
    </svg>
  )
}
