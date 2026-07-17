import React, { useState } from 'react'
import { FaCopy, FaCheck, FaCompress, FaExpand, FaCode } from 'react-icons/fa'

export default function JsonTool() {
  const [input, setInput] = useState('{\n  "name": "developer",\n  "tools": ["react", "node"]\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const validateJson = () => {
    try {
      JSON.parse(input)
      setError('✅ JSON valid!')
      setOutput('')
    } catch (e) {
      setError(`❌ ${e.message}`)
      setOutput('')
    }
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaCode className="text-krem-500" /> JSON Formatter & Validator
      </h2>
      <p className="text-krem-600 mb-6">Format, validasi, dan minify JSON dengan mudah</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field font-mono text-sm min-h-[200px]"
            spellCheck="false"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={formatJson} className="btn-primary flex items-center gap-2">
            <FaExpand /> Format
          </button>
          <button onClick={minifyJson} className="btn-primary flex items-center gap-2">
            <FaCompress /> Minify
          </button>
          <button onClick={validateJson} className="btn-secondary flex items-center gap-2">
            <FaCheck /> Validasi
          </button>
        </div>

        {error && (
          <div className={`p-3 rounded-xl ${error.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-krem-700">Output</label>
              <button onClick={copyOutput} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="input-field font-mono text-sm min-h-[150px] bg-krem-50/80 overflow-auto whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}