import { useState } from 'react'
import './App.css'

const periods = ['Day', 'Week', 'Month', 'Year']
const installationSummary = {
  gain: '2,847',
  saved: '598',
  co2: '1.1 tCO2 avoided',
  water: '3,240 L',
  cop: 'Average COP: 3.7',
}

const dashboardData = {
  Day: {
    gauge: 64,
    saving: 61,
    totalWater: '126 L',
    waterAverage: 'avg. 126 L/day',
    electricity: [
      { day: '06:00', x: 35, y: 112 },
      { day: '09:00', x: 82, y: 101 },
      { day: '12:00', x: 129, y: 88 },
      { day: '15:00', x: 176, y: 83 },
      { day: '18:00', x: 223, y: 72 },
      { day: '21:00', x: 270, y: 91 },
      { day: '00:00', x: 306, y: 108 },
    ],
    equivalent: [
      { day: '06:00', x: 35, y: 85 },
      { day: '09:00', x: 82, y: 68 },
      { day: '12:00', x: 129, y: 51 },
      { day: '15:00', x: 176, y: 45 },
      { day: '18:00', x: 223, y: 38 },
      { day: '21:00', x: 270, y: 62 },
      { day: '00:00', x: 306, y: 82 },
    ],
    water: [
      { day: '06h', height: 28 },
      { day: '09h', height: 54 },
      { day: '12h', height: 72 },
      { day: '15h', height: 48 },
      { day: '18h', height: 92 },
      { day: '21h', height: 64 },
      { day: '00h', height: 20 },
    ],
  },
  Week: {
    gauge: 72,
    saving: 68,
    totalWater: '860 L',
    waterAverage: 'avg. 123 L/day',
    electricity: [
      { day: 'Mon', x: 35, y: 107 },
      { day: 'Tue', x: 82, y: 96 },
      { day: 'Wed', x: 129, y: 90 },
      { day: 'Thu', x: 176, y: 91 },
      { day: 'Fri', x: 223, y: 97 },
      { day: 'Sat', x: 270, y: 103 },
      { day: 'Sun', x: 306, y: 110 },
    ],
    equivalent: [
      { day: 'Mon', x: 35, y: 72 },
      { day: 'Tue', x: 82, y: 51 },
      { day: 'Wed', x: 129, y: 35 },
      { day: 'Thu', x: 176, y: 42 },
      { day: 'Fri', x: 223, y: 56 },
      { day: 'Sat', x: 270, y: 67 },
      { day: 'Sun', x: 306, y: 82 },
    ],
    water: [
      { day: 'Mon', height: 75 },
      { day: 'Tue', height: 81 },
      { day: 'Wed', height: 103 },
      { day: 'Thu', height: 88 },
      { day: 'Fri', height: 99 },
      { day: 'Sat', height: 70 },
      { day: 'Sun', height: 60 },
    ],
  },
  Month: {
    gauge: 74,
    saving: 71,
    totalWater: '3 240 L',
    waterAverage: 'avg. 108 L/day',
    electricity: [
      { day: 'W1', x: 35, y: 98 },
      { day: 'W2', x: 82, y: 86 },
      { day: 'W3', x: 129, y: 83 },
      { day: 'W4', x: 176, y: 76 },
      { day: 'W5', x: 223, y: 81 },
      { day: 'W6', x: 270, y: 92 },
      { day: 'W7', x: 306, y: 101 },
    ],
    equivalent: [
      { day: 'W1', x: 35, y: 62 },
      { day: 'W2', x: 82, y: 44 },
      { day: 'W3', x: 129, y: 37 },
      { day: 'W4', x: 176, y: 31 },
      { day: 'W5', x: 223, y: 42 },
      { day: 'W6', x: 270, y: 58 },
      { day: 'W7', x: 306, y: 70 },
    ],
    water: [
      { day: 'W1', height: 92 },
      { day: 'W2', height: 84 },
      { day: 'W3', height: 101 },
      { day: 'W4', height: 76 },
      { day: 'W5', height: 96 },
      { day: 'W6', height: 68 },
      { day: 'W7', height: 58 },
    ],
  },
  Year: {
    gauge: 76,
    saving: 73,
    totalWater: '38 900 L',
    waterAverage: 'avg. 106 L/day',
    electricity: [
      { day: 'Jan', x: 35, y: 82 },
      { day: 'Feb', x: 82, y: 70 },
      { day: 'Mar', x: 129, y: 78 },
      { day: 'Apr', x: 176, y: 88 },
      { day: 'May', x: 223, y: 101 },
      { day: 'Jun', x: 270, y: 97 },
      { day: 'Jul', x: 306, y: 91 },
    ],
    equivalent: [
      { day: 'Jan', x: 35, y: 40 },
      { day: 'Feb', x: 82, y: 33 },
      { day: 'Mar', x: 129, y: 39 },
      { day: 'Apr', x: 176, y: 52 },
      { day: 'May', x: 223, y: 67 },
      { day: 'Jun', x: 270, y: 61 },
      { day: 'Jul', x: 306, y: 56 },
    ],
    water: [
      { day: 'Jan', height: 104 },
      { day: 'Feb', height: 92 },
      { day: 'Mar', height: 98 },
      { day: 'Apr', height: 82 },
      { day: 'May', height: 75 },
      { day: 'Jun', height: 88 },
      { day: 'Jul', height: 96 },
    ],
  },
}

const navItems = [
  { label: 'Home', icon: 'home' },
  { label: 'Performance', icon: 'speed' },
  { label: 'Away mode', icon: 'away' },
  { label: 'Schedule', icon: 'calendar' },
]

function pointsToPath(points) {
  return points
    .map((point, pointIndex) => `${pointIndex === 0 ? 'M' : 'L'} ${chartX(point.x)} ${point.y}`)
    .join(' ')
}

function chartX(value) {
  return 28 + ((value - 35) / (306 - 35)) * (350 - 28)
}

function MiniIcon({ type }) {
  if (type === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.8 2 4.8 13.1h6l-1.5 8.9 9.9-12h-6.3L13.8 2Z" />
      </svg>
    )
  }

  if (type === 'leaf') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.7 4.3C12.2 4.5 6.6 7.4 5 12.5c-1 3.1.2 5.5 2.2 6.7 3.7-6.8 7.7-9.7 10.8-11.1-2.7 2.1-5.4 5.1-7.8 11.7 5.2.2 9.7-4.2 9.5-15.5Z" />
      </svg>
    )
  }

  if (type === 'water') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.6c3.7 4.4 6 7.8 6 11.2a6 6 0 0 1-12 0c0-3.4 2.3-6.8 6-11.2Zm0 3.5c-2.5 3.3-3.9 5.7-3.9 7.7a3.9 3.9 0 0 0 7.8 0c0-2-1.4-4.4-3.9-7.7Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.2 3.3a2.4 2.4 0 0 1 2.4 2.4 2.3 2.3 0 0 1-.7 1.7l-1.1 1.2h2.8v1.7H9.5V11l2.8-2.8c.3-.3.5-.6.5-.9 0-.4-.3-.7-.8-.7-.6 0-1 .5-1 1.2H9.2a2.8 2.8 0 0 1 3-2.5Zm-2 9.1h1.7v1.7h-1.7v-1.7Zm2.8 0h1.7v1.7H13v-1.7Z" />
    </svg>
  )
}

function NavIcon({ type }) {
  const paths = {
    home: 'M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z',
    speed: 'M12 21a9 9 0 1 1 9-9h-2a7 7 0 1 0-2.1 5l-3.4-3.4A2.8 2.8 0 1 1 15 12c0 .2 0 .5-.1.7l3.4 3.4A9 9 0 0 1 12 21Zm6.9-13.7-5.1 3.3-1-1.6 5-3.3 1.1 1.6Z',
    away: 'M21 3.8 3.8 21 2.5 19.7 19.7 2.5 21 3.8ZM9.7 13.4l-4-4.1 1.4-1.4 4 4-1.4 1.5Zm3.5-3.6-2.3-2.3 1.4-1.4 2.3 2.3-1.4 1.4Zm-1.9 9.9 7.8-7.8c1.9 2.4 1.7 5.9-.5 8.1-2 2-5 2.3-7.3.7v-1Z',
    calendar: 'M6 2h2v2h8V2h2v2h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2V2Zm13 8H5v10h14V10ZM5 8h14V6H5v2Zm2 4h3v3H7v-3Zm5 0h3v3h-3v-3Zm5 0h1v3h-1v-3ZM7 17h3v2H7v-2Zm5 0h3v2h-3v-2Z',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  )
}

function ElectricityChart({ data, selectedIndex, onSelect }) {
  const selected = data.electricity[selectedIndex]
  const equivalent = data.equivalent[selectedIndex]

  return (
    <section className="panel chart-panel electricity-chart-panel">
      <div className="panel-title-row">
        <h2><MiniIcon type="bolt" /> Power consumption <span>(kWh)</span></h2>
      </div>
      <div className="selected-values" aria-live="polite">
        <span>{selected.day}</span>
        <strong className="blue-value">Heat pump: {Math.max(1, Math.round((130 - selected.y) / 8))} kWh</strong>
        <strong className="orange-value">Electric equivalent: {Math.max(1, Math.round((130 - equivalent.y) / 6))} kWh</strong>
      </div>
      <div className="chart-content">
        <svg className="line-chart" viewBox="0 0 360 150" preserveAspectRatio="none" role="img" aria-label="Power consumption curves in kilowatt-hours">
          {[25, 50, 75, 100, 125].map((gridY) => (
            <line className="grid-line" key={gridY} x1="28" x2="318" y1={gridY} y2={gridY} />
          ))}
          {[2, 6, 10, 14, 18].map((value, valueIndex) => (
            <text className="axis-value" key={value} x="4" y={128 - valueIndex * 25}>{value}</text>
          ))}
          <path className="line orange-line" d={pointsToPath(data.equivalent)} />
          <path className="line blue-line" d={pointsToPath(data.electricity)} />
          {data.equivalent.map((point, index) => (
            <circle
              className={`dot orange-dot ${selectedIndex === index ? 'selected' : ''}`}
              key={`orange-${point.day}`}
              cx={chartX(point.x)}
              cy={point.y}
              r="5"
              role="button"
              tabIndex="0"
              aria-label={`Show ${point.day}`}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  onSelect(index)
                }
              }}
            />
          ))}
          {data.electricity.map((point, index) => (
            <circle
              className={`dot blue-dot ${selectedIndex === index ? 'selected' : ''}`}
              key={`blue-${point.day}`}
              cx={chartX(point.x)}
              cy={point.y}
              r="5"
              role="button"
              tabIndex="0"
              aria-label={`Show ${point.day}`}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  onSelect(index)
                }
              }}
            />
          ))}
          <line className="selected-line" x1={chartX(selected.x)} x2={chartX(selected.x)} y1="23" y2="126" />
          {data.electricity.map((point) => (
            <text className="day-label" key={point.day} x={chartX(point.x) - 10} y="141">{point.day}</text>
          ))}
        </svg>
      </div>
      <div className="legend">
        <span><i className="legend-blue" /> Heat pump</span>
        <span><i className="legend-orange" /> Electric equivalent</span>
      </div>
    </section>
  )
}

function HotWaterChart({ data, selectedIndex, onSelect }) {
  const selected = data.water[selectedIndex]

  return (
    <section className="panel chart-panel water-chart-panel">
      <div className="panel-title-row">
        <h2><MiniIcon type="water" /> Hot water consumption <span>(L)</span></h2>
      </div>
      <div className="selected-values" aria-live="polite">
        <span>{selected.day}</span>
        <strong className="blue-value">{Math.round(selected.height * 1.8)} L</strong>
      </div>
      <div className="chart-content">
        <div className="bar-chart" aria-label="Hot water consumption bars">
          <div className="bar-grid" />
          {data.water.map((bar, index) => (
            <button className={`bar-column ${selectedIndex === index ? 'selected' : ''}`} type="button" key={bar.day} onClick={() => onSelect(index)}>
              <span className="bar" style={{ height: `${bar.height}px` }} />
              <span>{bar.day}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function BottomNav({ activeNav, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {navItems.map((item) => (
        <button
          className={activeNav === item.label ? 'active' : ''}
          type="button"
          aria-label={item.label}
          aria-pressed={activeNav === item.label}
          key={item.label}
          onClick={() => onChange(item.label)}
        >
          <NavIcon type={item.icon} />
        </button>
      ))}
    </nav>
  )
}

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week')
  const [selectedIndex, setSelectedIndex] = useState(6)
  const [activeNav, setActiveNav] = useState('Home')
  const data = dashboardData[selectedPeriod]

  function changePeriod(period) {
    setSelectedPeriod(period)
    setSelectedIndex(dashboardData[period].electricity.length - 1)
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <button type="button" aria-label="Settings" onClick={() => setActiveNav('Settings')}>⚙</button>
        <h1>{activeNav === 'Home' ? 'Savings' : activeNav}</h1>
        <button type="button" aria-label="Alerts" onClick={() => setActiveNav('Alerts')}>▲</button>
      </header>

      <main className="dashboard">
        <section className="panel overview-panel">
          <div className="hero-main">
            <div className="hero-metrics">
              <span>Gain since installation</span>
              <strong>{installationSummary.gain} <em>kWh</em></strong>
              <div className="hero-kpis">
                <small>€{installationSummary.saved} saved</small>
                <small><MiniIcon type="leaf" /> {installationSummary.co2}</small>
                <small><MiniIcon type="water" /> {installationSummary.water}</small>
                <small><MiniIcon type="co2" /> {installationSummary.cop}</small>
              </div>
            </div>
          </div>
        </section>

        <div className="period-tabs" aria-label="Time period">
          {periods.map((period) => (
            <button
              className={selectedPeriod === period ? 'active' : ''}
              type="button"
              aria-pressed={selectedPeriod === period}
              key={period}
              onClick={() => changePeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>

        <ElectricityChart data={data} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
        <HotWaterChart data={data} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
      </main>

      <BottomNav activeNav={activeNav} onChange={setActiveNav} />
    </div>
  )
}

export default App
