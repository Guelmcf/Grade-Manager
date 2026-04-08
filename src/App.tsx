import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <header className="App-header">
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>Hello Vite!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </header>
    </div>
  )
}


