import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #FFD700;
    --background-color: #1a1a1a;
    --text-color: #FFD700;
    --overlay-color: rgba(0, 0, 0, 0.8);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
    color: var(--primary-color);
    font-weight: 600;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
  }

  .section {
    min-height: 100vh;
    padding: 80px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)