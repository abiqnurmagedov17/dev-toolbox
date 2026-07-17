import React, { useState } from 'react'
import { FaLink, FaCopy, FaCheck } from 'react-icons/fa'

export default function UrlToolbox() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('encode')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const processUrl = () => {
    try {
      if (mode === 'encode') {
        setResult(encodeURIComponent(input))
      } else if (mode === 'decode') {
        setResult(decodeURIComponent(input))
      } else if (mode === 'parse') {
        const url = new URL(input)
        setResult(JSON.stringify({
          protocol: url.protocol,
          hostname: url.hostname,
          port: url.port,
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          params: Object.fromEntries(url.searchParams)
        }, null, 2))
      } else if (mode === 'utm') {
        const url = new URL(input)
        url.searchParams.set('utm_source', 'source')
        url.searchParams.set('utm_medium', 'medium')
        url.searchParams.set('utm_campaign', 'campaign')
        setResult(url.toString())
      }
    } catch (e) {
      setResult('Error: ' + e.message)
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaLink className="text-krem-500" /> URL Toolbox
      </h2>
      <p className="text-krem-600 mb-6">Encode/decode URL, parse query string, UTM builder</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['encode', 'decode', 'parse', 'utm'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl transition ${mode === m ? 'bg-krem-400 text-krem-900' : 'bg-krem-100 text-krem-600'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">URL</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field font-mono text-sm"
            placeholder="https://example.com/path?key=value"
          />
        </div>

        <button onClick={processUrl} className="btn-primary">Process</button>

        {result && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-krem-700">Result</label>
              <button onClick={copyResult} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="input-field font-mono text-sm bg-krem-50/80 overflow-auto whitespace-pre-wrap min-h-[100px]">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}