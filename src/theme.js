import { extendTheme } from '@chakra-ui/react'


export const theme = extendTheme({
  config:{
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    cian: {
      100: "#35F0D0",
    },
    purple: {
      50: "#5227A7",
      100: "#2D0B5A",
    },
  },
  styles: {
    global: (props) => ({
      'html, body': {
        backgroundColor: props.colorMode === 'dark' ? 'black' : '#2D0B5A',
        color: props.colorMode === 'dark' ? 'white' : 'gray.500',
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
    }),
  },
})