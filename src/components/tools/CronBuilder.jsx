import React, { useState } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'

export default function CronBuilder() {
  const [fields, setFields] = useState({ minute: '*', hour: '*', day: '*', month: '*', weekday: '*' })
  const [copied, setCopied] = useState(false)

  const explanations = {
    minute: 'Minute (0-59)',
    hour: 'Hour (0-23)',
    day: 'Day of month (1-31)',
    month: 'Month (1-12)',
    weekday: 'Weekday (0-7, 0=Sunday)'
  }

  const examples = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Daily at 9am', value: '0 9 * * *' },
    { label: 'Weekly Monday 9am', value: '0 9 * * 1' },
    { label: 'Monthly 1st 9am', value: '0 9 1 * *' },
  ]

  const getCronExpression = () => {
    return `${fields.minute} ${fields.hour} ${fields.day} ${fields.month} ${fields.weekday}`
  }

  const getDescription = () => {
    const parts = []
    if (fields.minute !== '*') parts.push(`minute ${fields.minute}`)
    if (fields.hour !== '*') parts.push(`hour ${fields.hour}`)
    if (fields.day !== '*') parts.push(`day ${fields.day}`)
    if (fields.month !== '*') parts.push(`month ${fields.month}`)
    if (fields.weekday !== '*') parts.push(`weekday ${fields.weekday}`)
    return parts.length ? parts.join(', ') : 'Every minute'
  }

  const copyCron = () => {
    navigator.clipboard.writeText(getCronExpression())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const applyExample = (cron) => {
    const parts = cron.split(' ')
    setFields({
      minute: parts[0] || '*',
      hour: parts[1] || '*',
      day: parts[2] || '*',
      month: parts[3] || '*',
      weekday: parts[4] || '*'
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-krem-800 mb-2 flex items-center gap-2">
        <FiClock className="text-krem-500" /> Cron Expression Builder
      </h2>
      <p className="text-krem-600 mb-6">Membuat dan memahami cron expression</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs font-medium text-krem-700 uppercase">{key}</label>
              <input
                value={value}
                onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                className="input-field text-center font-mono"
                placeholder="*"
              />
              <span className="text-xs text-krem-500">{explanations[key]}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-krem-50/80 rounded-xl border border-krem-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-mono text-lg font-bold text-krem-800">{getCronExpression()}</span>
              <p className="text-sm text-krem-600 mt-1">{getDescription()}</p>
            </div>
            <button onClick={copyCron} className="text-krem-500 hover:text-krem-700 flex items-center gap-1">
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-krem-700 mb-1">Examples</label>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex.label}
                onClick={() => applyExample(ex.value)}
                className="px-3 py-1.5 bg-krem-100 hover:bg-krem-200 rounded-lg text-sm text-krem-700 transition"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}