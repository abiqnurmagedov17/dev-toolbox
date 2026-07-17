import React, { useState } from 'react'
import { FaNetworkWired, FaPlay, FaCopy, FaCheck } from 'react-icons/fa'

export default function HttpTester() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    try {
      const headersObj = headers ? JSON.parse(headers) : {}
      const options = {
        method,
        headers: headersObj,
      }
      if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
        options.body = body
      }
      const res = await fetch(url, options)
      setStatus(`${res.status} ${res.statusText}`)
      const data = await res.text()
      try {
        setResponse(JSON.stringify(JSON.parse(data), null, 2))
      } catch {
        setResponse(data)
      }
    } catch (e) {
      setStatus('Error')
      setResponse('Error: ' + e.message)
    }
    setLoading(false)
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FaNetworkWired className="text-krem-500" /> HTTP Request Tester
      </h2>
      <p className="text-krem-600 mb-6">Mini Postman - test API requests</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="input-field w-32"
          >
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-field flex-1"
            placeholder="https://api.example.com/endpoint"
          />
          <button onClick={sendRequest} className="btn-primary flex items-center gap-2" disabled={loading}>
            <FaPlay /> {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-krem-700 mb-1">Headers (JSON)</label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="input-field font-mono text-sm min-h-[100px]"
            />
          </div>
          {['POST', 'PUT', 'PATCH'].includes(method) && (
            <div>
              <label className="block text-sm font-medium text-krem-700 mb-1">Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="input-field font-mono text-sm min-h-[100px]"
                placeholder='{"key": "value"}'
              />
            </div>
          )}
        </div>

        {status && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-krem-700">Response {status && `(${status})`}</label>
              <button onClick={copyResponse} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="input-field font-mono text-sm bg-krem-50/80 overflow-auto whitespace-pre-wrap min-h-[150px]">
              {response || 'Response will appear here...'}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}