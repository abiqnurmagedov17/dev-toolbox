import React, { useState } from 'react'
import { 
  FaCode, FaKey, FaLock, FaHash, FaPalette, 
  FaClock, FaLink, FaMarkdown, FaNetworkWired,
  FaQrcode, FaUuid, FaShieldAlt, FaBars, FaTimes 
} from 'react-icons/fa'
import JsonTool from './components/tools/JsonTool'
import JwtDecoder from './components/tools/JwtDecoder'
import Base64Tool from './components/tools/Base64Tool'
import HashGenerator from './components/tools/HashGenerator'
import ColorPalette from './components/tools/ColorPalette'
import CronBuilder from './components/tools/CronBuilder'
import UrlToolbox from './components/tools/UrlToolbox'
import MarkdownEditor from './components/tools/MarkdownEditor'
import HttpTester from './components/tools/HttpTester'
import QrToolkit from './components/tools/QrToolkit'
import UuidGenerator from './components/tools/UuidGenerator'
import PasswordGenerator from './components/tools/PasswordGenerator'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FaCode, component: JsonTool },
  { id: 'jwt', name: 'JWT Decoder', icon: FaKey, component: JwtDecoder },
  { id: 'base64', name: 'Base64 Toolbox', icon: FaLock, component: Base64Tool },
  { id: 'hash', name: 'Hash Generator', icon: FaHash, component: HashGenerator },
  { id: 'color', name: 'Color Palette', icon: FaPalette, component: ColorPalette },
  { id: 'cron', name: 'Cron Builder', icon: FaClock, component: CronBuilder },
  { id: 'url', name: 'URL Toolbox', icon: FaLink, component: UrlToolbox },
  { id: 'markdown', name: 'Markdown Editor', icon: FaMarkdown, component: MarkdownEditor },
  { id: 'http', name: 'HTTP Tester', icon: FaNetworkWired, component: HttpTester },
  { id: 'qr', name: 'QR Toolkit', icon: FaQrcode, component: QrToolkit },
  { id: 'uuid', name: 'UUID Generator', icon: FaUuid, component: UuidGenerator },
  { id: 'password', name: 'Password Generator', icon: FaShieldAlt, component: PasswordGenerator },
]

function App() {
  const [activeTool, setActiveTool] = useState('json')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const ActiveComponent = tools.find(t => t.id === activeTool)?.component || JsonTool

  return (
    <div className="min-h-screen bg-gradient-to-br from-krem-50 via-krem-100 to-krem-200">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-krem-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-krem-800">Dev Toolbox</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-krem-700 text-2xl">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex pt-16 lg:pt-0 min-h-screen">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white/90 backdrop-blur-md border-r border-krem-200/50 
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-5">
            <h1 className="text-2xl font-bold text-krem-800 hidden lg:block mb-6">Dev Toolbox</h1>
            <p className="text-sm text-krem-600 mb-4 hidden lg:block">12 Tools for Developers</p>
            <nav className="space-y-1">
              {tools.map((tool) => {
                const Icon = tool.icon
                const isActive = activeTool === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id)
                      setSidebarOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
                      ${isActive 
                        ? 'bg-krem-200 text-krem-900 shadow-sm' 
                        : 'text-krem-700 hover:bg-krem-100/80'
                      }
                    `}
                  >
                    <Icon className="text-lg" />
                    {tool.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl border border-krem-200/30">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App