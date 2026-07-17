import React, { useState } from 'react'
import { FaKey, FaCopy, FaCheck } from 'react-icons/fa'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const decodeJwt = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        setError('Invalid JWT format. Should have 3 parts separated by dots.')
        return
      }
      setError('')
      
      const headerDecoded = JSON.parse(atob(parts[0]))
      const payloadDecoded = JSON.parse(atob(parts[1]))
      
      setHeader(JSON.stringify(headerDecoded, null, 2))
      setPayload(JSON.stringify(payloadDecoded, null, 2))
      setSignature(parts[2])
    } catch (e) {
      setError('Invalid JWT: ' + e.message)
      setHeader('')
      setPayload('')
      setSignature('')
    }
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaKey className="text-krem-500" /> JWT Decoder
      </h2>
      <p className="text-krem-600 mb-6">Decode JWT token tanpa mengirim data ke server</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">JWT Token</label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            className="input-field font-mono text-sm"
          />
        </div>

        <button onClick={decodeJwt} className="btn-primary">Decode</button>

        {error && (
          <div className="p-3 rounded-xl bg-red-100 text-red-800">{error}</div>
        )}

        {header && (
          <>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-krem-700">Header</label>
                <button onClick={() => copyText(header)} className="text-krem-500 hover:text-krem-700">
                  {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
              <pre className="input-field font-mono text-sm bg-krem-50/80 overflow-auto whitespace-pre-wrap min-h-[80px]">
                {header}
              </pre>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-krem-700">Payload</label>
                <button onClick={() => copyText(payload)} className="text-krem-500 hover:text-krem-700">
                  {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
              <pre className="input-field font-mono text-sm bg-krem-50/80 overflow-auto whitespace-pre-wrap min-h-[80px]">
                {payload}
              </pre>
            </div>
            <div>
              <label className="text-sm font-medium text-krem-700">Signature</label>
              <div className="input-field font-mono text-sm bg-krem-50/80 overflow-auto">
                {signature}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}