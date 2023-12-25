import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [spCharAllowed, setspCharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass=""
    let uString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) uString += "0123456789"
    if(spCharAllowed) uString += "!@#$%^&*()_+"

    for(let i=0; i<length; i++){
      const ind=Math.floor(Math.random() * uString.length)
      console.log(ind);
      pass += uString.charAt(ind)
    }

    setpassword(pass)
  }, [length, numAllowed, spCharAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, spCharAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-14 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-4 mb-5'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-5'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-3 mb-4'>
        <div className='flex items-center gap-x-1 px-2'>
          <input 
          type="range" 
          min={6}
          max={16}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numAllowed}
          onChange={()=>{
            setnumAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={spCharAllowed}
          onChange={()=>{
            setspCharAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="spCharAllowed">Special Char</label>
        </div>
      </div>
    </div>
  )
}

export default App
