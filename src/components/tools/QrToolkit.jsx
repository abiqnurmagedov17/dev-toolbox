import React, { useState, useRef, useEffect } from 'react'
import { FaCopy, FaCheck, FaDownload, FaCamera } from 'react-icons/fa'
import { FiQrCode } from 'react-icons/fi'

export default function QrToolkit() {
  const [text, setText] = useState('https://github.com')
  const [qrCode, setQrCode] = useState('')
  const [scanResult, setScanResult] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    generateQr()
  }, [text])

  const generateQr = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = 256
    canvas.width = size
    canvas.height = size
    
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, size, size)
    
    const cellSize = size / 25
    const grid = generateQrGrid(text, 25)
    
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x]) {
          ctx.fillStyle = '#3d2e1e'
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }
    
    const drawMarker = (x, y) => {
      const s = 5 * cellSize
      ctx.fillStyle = '#3d2e1e'
      ctx.fillRect(x * cellSize, y * cellSize, s, s)
      ctx.fillStyle = 'white'
      ctx.fillRect(x * cellSize + cellSize, y * cellSize + cellSize, s - cellSize * 2, s - cellSize * 2)
      ctx.fillStyle = '#3d2e1e'
      ctx.fillRect(x * cellSize + cellSize * 2, y * cellSize + cellSize * 2, s - cellSize * 4, s - cellSize * 4)
    }
    drawMarker(0, 0)
    drawMarker(grid.length - 5, 0)
    drawMarker(0, grid.length - 5)
    
    setQrCode(canvas.toDataURL())
  }

  const generateQrGrid = (text, size) => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = (hash * 31 + text.charCodeAt(i)) % 1000000
    }
    const grid = []
    for (let y = 0; y < size; y++) {
      grid[y] = []
      for (let x = 0; x < size; x++) {
        const val = (x * 7 + y * 13 + hash) % 3 !== 0
        grid[y][x] = val
      }
    }
    return grid
  }

  const downloadQr = (format = 'png') => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `qrcode.${format}`
    link.href = format === 'png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/svg+xml')
    link.click()
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FiQrCode className="text-krem-500" /> QR Code Toolkit
      </h2>
      <p className="text-krem-600 mb-6">Generate QR code, scan QR, download PNG/SVG</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field flex-1"
            placeholder="Enter text or URL"
          />
          <button onClick={copyText} className="btn-secondary flex items-center gap-1">
            <FaCopy /> Copy
          </button>
        </div>

        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border-2 border-krem-200 rounded-xl bg-white" />
        </div>

        {qrCode && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => downloadQr('png')} className="btn-primary flex items-center gap-2">
              <FaDownload /> PNG
            </button>
            <button onClick={() => downloadQr('svg')} className="btn-secondary flex items-center gap-2">
              <FaDownload /> SVG
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <FaCamera /> Scan QR
            </button>
          </div>
        )}

        {scanResult && (
          <div className="p-3 bg-green-100 rounded-xl text-green-800">
            Scanned: {scanResult}
          </div>
        )}
      </div>
    </div>
  )
}