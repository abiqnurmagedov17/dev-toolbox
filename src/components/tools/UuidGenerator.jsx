import React, { useState } from 'react'
import { FaCopy, FaCheck, FaSync } from 'react-icons/fa'
import { FiHash } from 'react-icons/fi'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)
  const [version, setVersion] = useState('v4')
  const [copied, setCopied] = useState(null)

  const generateUuid = (v = 'v4') => {
    if (v === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0
        const v4 = c === 'x' ? r : (r & 0x3 | 0x8)
        return v4.toString(16)
      })
    } else if (v === 'v7') {
      const time = Date.now().toString(16).padStart(12, '0')
      const rand = Math.random().toString(16).substring(2, 10)
      return `${time.substring(0, 8)}-${time.substring(8, 12)}-7${rand.substring(0, 3)}-${rand.substring(3, 7)}-${rand.substring(7, 11)}${Math.random().toString(16).substring(2, 6)}`
    }
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < 21; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }

  const generateBatch = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUuid(version))
    }
    setUuids(newUuids)
  }

  const copyUuid = (uuid, index) => {
    navigator.clipboard.writeText(uuid)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FiHash className="text-krem-500" /> UUID Generator
      </h2>
      <p className="text-krem-600 mb-6">UUID v4, v7, NanoID, batch generate</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <select 
            value={version} 
            onChange={(e) => setVersion(e.target.value)}
            className="input-field w-32"
          >
            <option value="v4">UUID v4</option>
            <option value="v7">UUID v7</option>
            <option value="nanoid">NanoID</option>
          </select>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="input-field w-20 text-center"
            min="1"
            max="100"
          />
          <button onClick={generateBatch} className="btn-primary flex items-center gap-2">
            <FaSync /> Generate
          </button>
          {uuids.length > 0 && (
            <button onClick={copyAll} className="btn-secondary flex items-center gap-1">
              <FaCopy /> Copy All
            </button>
          )}
        </div>

        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-krem-50/80 rounded-xl border border-krem-200">
                <span className="font-mono text-sm break-all">{uuid}</span>
                <button onClick={() => copyUuid(uuid, i)} className="text-krem-500 hover:text-krem-700 flex-shrink-0 ml-2">
                  {copied === i ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}