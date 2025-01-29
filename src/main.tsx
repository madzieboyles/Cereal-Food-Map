import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SecondFlow } from './FlowMap90.tsx'
import { SixtyFlow } from './FlowMap60.tsx'
import { ThirtyFlow } from './FlowMap30.tsx'


const allFlows = document.getElementById('trade') as HTMLButtonElement;
const shocks30 = document.getElementById('food30') as HTMLButtonElement;
const shocks60 = document.getElementById('food60') as HTMLButtonElement;
const shocks90 = document.getElementById('food90') as HTMLButtonElement;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

allFlows.onclick = function() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

shocks30.onclick = function() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThirtyFlow />
    </React.StrictMode>,
  )
}

shocks60.onclick = function() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SixtyFlow />
    </React.StrictMode>,
  )
}

shocks90.onclick = function() {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SecondFlow />
  </React.StrictMode>,
)
}
