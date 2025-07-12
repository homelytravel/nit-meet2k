import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4bb1e1cc;
    --secondary-color: #5193f6ff;
    --background-color: #1a1a1a;
    --surface-color: #2d2d2d;
    --text-color: #f4f7f9ff;
    --overlay-color: rgba(0, 0, 0, 0.9);
    --success-color: #7cda80ff;
    --error-color: #fc6358ff;
    --transition-timing: cubic-bezier(0.2, 0, 0.2, 1);
    --transition-duration: 0.3s;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 100%;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
    color: var(--primary-color);
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  p {
    max-width: 65ch;
    margin-bottom: 1.5rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-duration) var(--transition-timing);
    
    &:hover,
    &:focus-visible {
      color: var(--secondary-color);
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0.5rem 1rem;
    transition: 
      background-color var(--transition-duration) var(--transition-timing),
      transform 0.1s ease;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }

    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }

  /* Accessibility improvements */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Scrollbar styling */
  @media (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 8px;
      background-color: var(--background-color);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 4px;
    }
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)