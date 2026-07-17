import React, { useState } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { FiPalette } from 'react-icons/fi'

export default function ColorPalette() {
  const [color, setColor] = useState('#b0957a')
  const [copied, setCopied] = useState(false)
  const [gradient, setGradient] = useState('linear-gradient(135deg, #b0957a, #eaddca)')

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const getColorInfo = () => {
    const rgb = hexToRgb(color)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return { hex: color, rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`, hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` }
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const info = getColorInfo()

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FiPalette className="text-krem-500" /> Color Palette Generator
      </h2>
      <p className="text-krem-600 mb-6">HEX ↔ RGB ↔ HSL, Gradient generator, copy CSS</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-20 rounded-xl cursor-pointer border-2 border-krem-300"
          />
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-krem-700 mb-1">Color Picker</label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="input-field"
              placeholder="#b0957a"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-krem-50/80 rounded-xl border border-krem-200">
            <label className="text-xs text-krem-500 uppercase">HEX</label>
            <div className="flex justify-between items-center">
              <span className="font-mono">{info.hex}</span>
              <button onClick={() => copyText(info.hex)} className="text-krem-500 hover:text-krem-700">
                <FaCopy />
              </button>
            </div>
          </div>
          <div className="p-3 bg-krem-50/80 rounded-xl border border-krem-200">
            <label className="text-xs text-krem-500 uppercase">RGB</label>
            <div className="flex justify-between items-center">
              <span className="font-mono">{info.rgb}</span>
              <button onClick={() => copyText(info.rgb)} className="text-krem-500 hover:text-krem-700">
                <FaCopy />
              </button>
            </div>
          </div>
          <div className="p-3 bg-krem-50/80 rounded-xl border border-krem-200">
            <label className="text-xs text-krem-500 uppercase">HSL</label>
            <div className="flex justify-between items-center">
              <span className="font-mono">{info.hsl}</span>
              <button onClick={() => copyText(info.hsl)} className="text-krem-500 hover:text-krem-700">
                <FaCopy />
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Gradient Generator</label>
          <div className="flex flex-wrap gap-2">
            <input
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              className="input-field flex-1"
              placeholder="linear-gradient(135deg, #color1, #color2)"
            />
          </div>
          <div 
            className="mt-2 h-24 rounded-xl border border-krem-200 transition-all"
            style={{ background: gradient }}
          />
          <button onClick={() => copyText(gradient)} className="mt-2 text-sm text-krem-500 hover:text-krem-700 flex items-center gap-1">
            <FaCopy /> Copy CSS
          </button>
        </div>
      </div>
    </div>
  )
}