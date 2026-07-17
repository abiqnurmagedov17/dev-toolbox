import React, { useState, useRef } from 'react'
import { FaLock, FaCopy, FaCheck, FaFile, FaImage } from 'react-icons/fa'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef(null)

  const processBase64 = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e) {
      setOutput('Error: ' + e.message)
    }
  }

  const handleFileToBase64 = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setOutput(base64)
      if (file.type.startsWith('image/')) {
        setImagePreview(base64)
      }
    }
    reader.readAsDataURL(file)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaLock className="text-krem-500" /> Base64 Toolbox
      </h2>
      <p className="text-krem-600 mb-6">Encode/decode Base64, file ↔ Base64, preview gambar</p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('encode')} 
            className={`px-4 py-2 rounded-xl transition ${mode === 'encode' ? 'bg-krem-400 text-krem-900' : 'bg-krem-100 text-krem-600'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => setMode('decode')} 
            className={`px-4 py-2 rounded-xl transition ${mode === 'decode' ? 'bg-krem-400 text-krem-900' : 'bg-krem-100 text-krem-600'}`}
          >
            Decode
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">
            {mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field font-mono text-sm min-h-[100px]"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={processBase64} className="btn-primary">Process</button>
          <button onClick={() => fileInputRef.current?.click()} className="btn-secondary flex items-center gap-2">
            <FaFile /> File → Base64
          </button>
          <input ref={fileInputRef} type="file" onChange={handleFileToBase64} className="hidden" />
        </div>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-krem-700">Output</label>
              <button onClick={copyOutput} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="input-field font-mono text-sm min-h-[100px] bg-krem-50/80"
            />
          </div>
        )}

        {imagePreview && (
          <div>
            <label className="text-sm font-medium text-krem-700">Image Preview</label>
            <div className="mt-2 p-4 bg-krem-50/80 rounded-xl border border-krem-200">
              <img src={imagePreview} alt="Preview" className="max-h-64 object-contain mx-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}