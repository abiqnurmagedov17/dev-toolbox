import React, { useState } from 'react'
import { FaCopy, FaCheck, FaFilePdf } from 'react-icons/fa'
import { FiFileText } from 'react-icons/fi'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and *italic*.\n\n- List item 1\n- List item 2\n\n[Link](https://example.com)')
  const [htmlOutput, setHtmlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const renderMarkdown = () => {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br/>')
    setHtmlOutput(html)
  }

  const exportHtml = () => {
    const html = `<html><head><title>Markdown Export</title></head><body>${htmlOutput}</body></html>`
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FiFileText className="text-krem-500" /> Markdown Editor
      </h2>
      <p className="text-krem-600 mb-6">Live preview, export HTML, export PDF</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="input-field font-mono text-sm min-h-[200px]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={renderMarkdown} className="btn-primary">Preview</button>
          <button onClick={exportHtml} className="btn-secondary flex items-center gap-2">
            <FiFileText /> Export HTML
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <FaFilePdf /> Export PDF
          </button>
        </div>

        {htmlOutput && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-krem-700">Preview</label>
              <button onClick={copyHtml} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            <div 
              className="input-field bg-white/90 min-h-[150px] prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        )}
      </div>
    </div>
  )
}