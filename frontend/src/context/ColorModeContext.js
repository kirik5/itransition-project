import { createContext } from 'react'

const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: null,
})

export default ColorModeContext
