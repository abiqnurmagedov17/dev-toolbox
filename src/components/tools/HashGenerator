import React, { useState } from 'react'
import { FaHash, FaCopy, FaCheck } from 'react-icons/fa'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)

  const generateHash = async () => {
    if (!input) return
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(input)
      const hashBuffer = await crypto.subtle.digest(algorithm, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      setHash(hashHex)
    } catch (e) {
      setHash('Error: ' + e.message)
    }
  }

  const copyHash = () => {
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaHash className="text-krem-500" /> Hash Generator
      </h2>
      <p className="text-krem-600 mb-6">MD5, SHA-1, SHA-256, SHA-512</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Text / File</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field font-mono text-sm min-h-[100px]"
            placeholder="Enter text to hash..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Algorithm</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            className="input-field w-48"
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
            <option value="SHA-1">SHA-1</option>
            <option value="MD5">MD5 (not secure)</option>
          </select>
        </div>

        <button onClick={generateHash} className="btn-primary">Generate Hash</button>

        {hash && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-krem-700">Hash Result</label>
              <button onClick={copyHash} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="input-field font-mono text-sm bg-krem-50/80 overflow-auto break-all">
              {hash}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}