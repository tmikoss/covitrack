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
import clamp from 'lodash/clamp'

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
  const draggingRef = useRef(false)

  const marginY = 2
  const marginX = 10

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

  const fillLinePoints = [...mainLinePoints, width, height + marginY, 0, height + marginY]

  const sliderX = differenceInDays(focusDate, minDate)

  const drag = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current) {
        return
      }

      const svg = svgRef.current

      if (!svg) {
        return
      }

      const tempPoint = svg.createSVGPoint()
      tempPoint.x = e.clientX

      const ctm = svg.getScreenCTM()
      if (!ctm) {
        return
      }
      const { x } = tempPoint.matrixTransform(ctm.inverse())

      setFocusDate(addDays(minDate, clamp(Math.floor(x), 0, width)))
      setAnimationSpeed(0)
    },
    [minDate, setFocusDate, setAnimationSpeed]
  )

  const startDragging = useCallback(
    (e: MouseEvent) => {
      draggingRef.current = true
      drag(e)
    },
    [drag]
  )
  const stopDragging = useCallback(() => (draggingRef.current = false), [])

  return (
    <svg ref={svgRef} viewBox={`-${marginX} -${marginY} ${width + 2 * marginX} ${height + 2 * marginY}`}>
      <FillLine points={fillLinePoints.join(' ')} />
      <MainLine points={mainLinePoints.join(' ')} />

      <SliderIndicator x1={sliderX} y1={-marginY} x2={sliderX} y2={height + marginY} />

      <ClickInterceptor
        x={-marginX}
        y={-marginY}
        width={width + 2 * marginX}
        height={height + 2 * marginY}
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={drag}
      />
    </svg>
  )
}
