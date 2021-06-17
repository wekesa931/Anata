import React from 'react'
import { Global, css } from '@emotion/core'

const Fonts = () => {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Karla&family=Rubik&display=swap');
        * {
          font-family: 'Karla', sans-serif;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        div#routes {
          height: 100%;
          overflow-y: scroll;
        }
        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 3px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: #608eb6;
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
      `}
    />
  )
}

export default Fonts
