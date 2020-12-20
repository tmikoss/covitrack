import subDays from 'date-fns/subDays'
import create from 'zustand'

export type State = {
  focusDate: Date
  minDate: Date
  maxDate: Date
  setFocusDate: (date: Date) => void
}

export const useSettings = create<State>((set) => {
  const maxDate = subDays(new Date(), 2)

  return {
    focusDate: maxDate,
    minDate: new Date(2020, 0, 1),
    maxDate,
    setFocusDate: (focusDate) => set({ focusDate }),
  }
})
