import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setWasmUrl } from '@lottiefiles/dotlottie-react'
import './index.css'
import App from './App.jsx'

// Serve o núcleo WASM do dotLottie a partir do próprio site em vez do CDN
// padrão da LottieFiles (jsdelivr/unpkg), evitando dependência externa.
setWasmUrl('/dotlottie-player.wasm')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
