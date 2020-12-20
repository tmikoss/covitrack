export const theme = {
  background: '#060606',
  minLevel: '#ffffff',
  maxLevel: '#ff0000',
}

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
