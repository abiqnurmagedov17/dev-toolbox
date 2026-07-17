import React, { useState, useEffect } from 'react'
import { FaShieldAlt, FaCopy, FaCheck, FaSync } from 'react-icons/fa'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let chars = ''
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword('Please select at least one character type')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    setPassword(result)
    calculateStrength(result)
  }

  const calculateStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    setStrength(Math.min(100, score * 14))
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500'
    if (strength < 50) return 'bg-orange-500'
    if (strength < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthLabel = () => {
    if (strength < 30) return 'Weak'
    if (strength < 50) return 'Fair'
    if (strength < 70) return 'Good'
    return 'Strong'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaShieldAlt className="text-krem-500" /> Password Generator
      </h2>
      <p className="text-krem-600 mb-6">Generate secure passwords with strength meter</p>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              value={password}
              readOnly
              className="input-field font-mono text-lg bg-krem-50/80"
            />
          </div>
          <button onClick={copyPassword} className="btn-secondary flex items-center gap-1">
            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={generatePassword} className="btn-primary flex items-center gap-1">
            <FaSync /> New
          </button>
        </div>

        <div>
          <div className="flex justify-between text-sm text-krem-600">
            <span>Strength: {getStrengthLabel()}</span>
            <span>{strength}%</span>
          </div>
          <div className="w-full h-2 bg-krem-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getStrengthColor()}`} 
              style={{ width: `${strength}%` }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-krem-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 text-krem-700">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
              className="accent-krem-500 w-4 h-4"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2 text-krem-700">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
              className="accent-krem-500 w-4 h-4"
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2 text-krem-700">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="accent-krem-500 w-4 h-4"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2 text-krem-700">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="accent-krem-500 w-4 h-4"
            />
            Symbols
          </label>
        </div>
      </div>
    </div>
  )
}