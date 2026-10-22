import { useEffect, useRef, useState } from 'react'
import './App.css'

const periods = ['Day', 'Week', 'Month', 'Year']
const installationSummary = {
  gain: '2,847',
  saved: '598',
  co2: '1.1 tCO2e avoided',
  water: '3,240 L',
}
const energySettingsStorageKey = 'stats-energy-settings'
const defaultEnergySettings = {
  location: '',
  provider: '',
  contractTerms: '',
}

function loadEnergySettings() {
  try {
    const savedSettings = localStorage.getItem(energySettingsStorageKey)
    if (!savedSettings) return { ...defaultEnergySettings }

    const parsedSettings = JSON.parse(savedSettings)
    return {
      location: typeof parsedSettings.location === 'string' ? parsedSettings.location : '',
      provider: typeof parsedSettings.provider === 'string' ? parsedSettings.provider : '',
      contractTerms: typeof parsedSettings.contractTerms === 'string' ? parsedSettings.contractTerms : '',
    }
  } catch {
    return { ...defaultEnergySettings }
  }
}

function loadSavedAmount() {
  try {
    const savedSettings = localStorage.getItem(energySettingsStorageKey)
    if (!savedSettings) return Number(installationSummary.saved)

    const parsedSettings = JSON.parse(savedSettings)
    return Number.isInteger(parsedSettings.savedAmount)
      ? parsedSettings.savedAmount
      : Number(installationSummary.saved)
  } catch {
    return Number(installationSummary.saved)
  }
}

function getRandomSavedAmount(currentAmount) {
  let amount = currentAmount
  while (amount === currentAmount) {
    amount = Math.floor(Math.random() * 700) + 300
  }
  return amount
}

const dashboardData = {
  Day: {
    gauge: 64,
    saving: 61,
    totalWater: '126 L',
    waterAverage: 'avg. 126 L/day',
    electricity: [
      { day: '00:00', value: 2, category: 'both' },
      { day: '01:00', value: 1, category: 'electricity' },
      { day: '02:00', value: 1, category: 'electricity' },
      { day: '03:00', value: 1, category: 'electricity' },
      { day: '04:00', value: 2, category: 'heat-pump' },
      { day: '05:00', value: 3, category: 'both' },
      { day: '06:00', value: 4, category: 'heat-pump' },
      { day: '07:00', value: 5, category: 'heat-pump' },
      { day: '08:00', value: 6, category: 'both' },
      { day: '09:00', value: 7, category: 'both' },
      { day: '10:00', value: 6, category: 'electricity' },
      { day: '11:00', value: 5, category: 'electricity' },
      { day: '12:00', value: 6, category: 'heat-pump' },
      { day: '13:00', value: 6, category: 'both' },
      { day: '14:00', value: 5, category: 'electricity' },
      { day: '15:00', value: 6, category: 'both' },
      { day: '16:00', value: 7, category: 'heat-pump' },
      { day: '17:00', value: 8, category: 'both' },
      { day: '18:00', value: 9, category: 'both' },
      { day: '19:00', value: 8, category: 'heat-pump' },
      { day: '20:00', value: 6, category: 'electricity' },
      { day: '21:00', value: 5, category: 'electricity' },
      { day: '22:00', value: 4, category: 'heat-pump' },
      { day: '23:00', value: 3, category: 'electricity' },
    ],
    water: [
      { day: '00h', height: 20 },
      { day: '01h', height: 18 },
      { day: '02h', height: 16 },
      { day: '03h', height: 15 },
      { day: '04h', height: 16 },
      { day: '05h', height: 22 },
      { day: '06h', height: 34 },
      { day: '07h', height: 48 },
      { day: '08h', height: 58 },
      { day: '09h', height: 70 },
      { day: '10h', height: 54 },
      { day: '11h', height: 42 },
      { day: '12h', height: 72 },
      { day: '13h', height: 64 },
      { day: '14h', height: 50 },
      { day: '15h', height: 48 },
      { day: '16h', height: 58 },
      { day: '17h', height: 76 },
      { day: '18h', height: 92 },
      { day: '19h', height: 82 },
      { day: '20h', height: 64 },
      { day: '21h', height: 52 },
      { day: '22h', height: 36 },
      { day: '23h', height: 26 },
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

const powerCategoryLabels = {
  electricity: 'Electricity only',
  'heat-pump': 'Heat pump only',
  both: 'Both',
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

  if (type === 'wrench') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.7 6.3a6.4 6.4 0 0 1-8.1 7.7l-7.1 7.1a2.1 2.1 0 0 1-3-3l7.1-7.1a6.4 6.4 0 0 1 7.7-8.1l-4.1 4.1 2.8 2.8 4.7-3.5Z" />
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

function HeroKpi({ id, label, tooltip, openKpi, onToggle, children }) {
  const isOpen = openKpi === id
  const popoverId = `hero-kpi-${id}-popover`

  return (
    <div className="hero-kpi">
      {children}
      <button
        className="hero-kpi-info"
        type="button"
        aria-label={`More information about ${label}`}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() => onToggle(isOpen ? null : id)}
      >
        <span aria-hidden="true">i</span>
      </button>
      <div
        className="hero-kpi-popover"
        id={popoverId}
        role="region"
        aria-label={`${label} information`}
        hidden={!isOpen}
      >
        {tooltip}
      </div>
    </div>
  )
}

function ElectricityChart({ data, selectedIndex, onSelect }) {
  const selected = data.electricity[selectedIndex]
  const barCount = data.electricity.length
  const selectedValue = selected.value ?? Math.max(1, Math.round((130 - selected.y) / 8))
  const selectedCategory = selected.category ?? 'heat-pump'
  const selectedCategoryLabel = powerCategoryLabels[selectedCategory]
  const hasCategoryBreakdown = data.electricity.some((point) => point.category)

  return (
    <section className="panel chart-panel electricity-chart-panel">
      <div className="panel-title-row">
        <h2><MiniIcon type="bolt" /> Power consumption <span>(kWh)</span></h2>
      </div>
      <div className="selected-values" aria-live="polite">
        <span>{selected.day}</span>
        <strong className={`power-value power-${selectedCategory}`}>{selectedCategoryLabel}: {selectedValue} kWh</strong>
      </div>
      <div className="chart-content">
        <div className="bar-chart hourly-bars" style={{ '--bar-count': barCount }} role="group" aria-label="Power consumption by hour">
          <div className="bar-grid" />
          {data.electricity.map((point, index) => {
            const value = point.value ?? Math.max(1, Math.round((130 - point.y) / 8))
            const category = point.category ?? 'heat-pump'
            const showLabel = barCount <= 7 || index % 3 === 0

            return (
              <button
                className={`bar-column power-${category} ${selectedIndex === index ? 'selected' : ''}`}
                type="button"
                key={point.day}
                aria-label={`${point.day}: ${powerCategoryLabels[category]}, ${value} kWh`}
                aria-pressed={selectedIndex === index}
                onClick={() => onSelect(index)}
              >
                <span className="bar" style={{ height: `${value * 10}px` }} />
                <span>{showLabel ? point.day : ''}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="legend">
        {hasCategoryBreakdown ? (
          <>
            <span><i className="legend-electricity" /> Electricity only</span>
            <span><i className="legend-heat-pump" /> Heat pump only</span>
            <span><i className="legend-both" /> Both</span>
          </>
        ) : (
          <span><i className="legend-heat-pump" /> Heat pump only</span>
        )}
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
        <div
          className={`bar-chart ${data.water.length === 24 ? 'hourly-bars' : ''}`}
          role="group"
          aria-label={data.water.length === 24 ? 'Hot water consumption by hour' : 'Hot water consumption bars'}
        >
          <div className="bar-grid" />
          {data.water.map((bar, index) => (
            <button
              className={`bar-column ${selectedIndex === index ? 'selected' : ''}`}
              type="button"
              key={bar.day}
              aria-label={`${bar.day}: ${Math.round(bar.height * 1.8)} L`}
              aria-pressed={selectedIndex === index}
              onClick={() => onSelect(index)}
            >
              <span className="bar" style={{ height: `${bar.height}px` }} />
              <span>{data.water.length === 24 && index % 3 !== 0 ? '' : bar.day}</span>
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
  const [selectedElectricityIndex, setSelectedElectricityIndex] = useState(6)
  const [selectedWaterIndex, setSelectedWaterIndex] = useState(6)
  const [activeNav, setActiveNav] = useState('Home')
  const [openKpi, setOpenKpi] = useState(null)
  const [energySettingsOpen, setEnergySettingsOpen] = useState(false)
  const [energySettings, setEnergySettings] = useState(loadEnergySettings)
  const [energySettingsDraft, setEnergySettingsDraft] = useState(energySettings)
  const [savedAmount, setSavedAmount] = useState(loadSavedAmount)
  const heroKpisRef = useRef(null)
  const energySettingsContainerRef = useRef(null)
  const energySettingsButtonRef = useRef(null)
  const energySettingsPopoverRef = useRef(null)
  const data = dashboardData[selectedPeriod]

  useEffect(() => {
    if (openKpi === null && !energySettingsOpen) return undefined

    function closeOnOutsidePointer(event) {
      if (!heroKpisRef.current?.contains(event.target)) {
        setOpenKpi(null)
      }
      if (energySettingsOpen && !energySettingsContainerRef.current?.contains(event.target)) {
        closeEnergySettings()
      }
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpenKpi(null)
        if (energySettingsOpen) {
          closeEnergySettings(true)
        }
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [openKpi, energySettingsOpen])

  useEffect(() => {
    if (energySettingsOpen) {
      energySettingsPopoverRef.current?.querySelector('input')?.focus()
    }
  }, [energySettingsOpen])

  function openEnergySettings() {
    setOpenKpi(null)
    setEnergySettingsDraft({ ...energySettings })
    setEnergySettingsOpen(true)
  }

  function closeEnergySettings(restoreFocus = false) {
    setEnergySettingsOpen(false)
    if (restoreFocus) energySettingsButtonRef.current?.focus()
  }

  function updateEnergySetting(event) {
    const { name, value } = event.currentTarget
    setEnergySettingsDraft((currentSettings) => ({ ...currentSettings, [name]: value }))
  }

  function saveEnergySettings(event) {
    event.preventDefault()
    const settingsChanged = Object.keys(defaultEnergySettings).some(
      (key) => energySettingsDraft[key] !== energySettings[key],
    )
    const nextSavedAmount = settingsChanged ? getRandomSavedAmount(savedAmount) : savedAmount

    try {
      localStorage.setItem(energySettingsStorageKey, JSON.stringify({ ...energySettingsDraft, savedAmount: nextSavedAmount }))
    } catch {
      // Keep the settings available for this session if storage is unavailable.
    }
    setEnergySettings(energySettingsDraft)
    setSavedAmount(nextSavedAmount)
    closeEnergySettings(true)
  }

  function changePeriod(period) {
    setSelectedPeriod(period)
    setSelectedElectricityIndex(dashboardData[period].electricity.length - 1)
    setSelectedWaterIndex(dashboardData[period].water.length - 1)
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
              <div className="hero-kpis" ref={heroKpisRef}>
                <div className="hero-kpi" ref={energySettingsContainerRef}>
                  $ {savedAmount} saved
                  <button
                    className="hero-kpi-info"
                    type="button"
                    aria-label="Energy settings"
                    aria-haspopup="dialog"
                    aria-expanded={energySettingsOpen}
                    aria-controls="energy-settings-dialog"
                    title="Energy settings"
                    ref={energySettingsButtonRef}
                    onClick={openEnergySettings}
                  >
                    <MiniIcon type="wrench" />
                  </button>
                  {energySettingsOpen && (
                    <div
                      className="energy-settings-popover"
                      id="energy-settings-dialog"
                      ref={energySettingsPopoverRef}
                      role="dialog"
                      aria-labelledby="energy-settings-title"
                    >
                      <form className="energy-settings-form" onSubmit={saveEnergySettings}>
                        <header className="energy-settings-header">
                          <div>
                            <span className="energy-settings-eyebrow">SAVINGS PROFILE</span>
                            <h2 id="energy-settings-title">Energy settings</h2>
                          </div>
                          <button
                            className="energy-settings-close"
                            type="button"
                            aria-label="Close energy settings"
                            onClick={() => closeEnergySettings(true)}
                          >
                            ×
                          </button>
                        </header>
                        <label className="energy-settings-field">
                          Location
                          <input
                            name="location"
                            type="text"
                            autoComplete="address-level2"
                            placeholder="City or postal code"
                            value={energySettingsDraft.location}
                            onChange={updateEnergySetting}
                            required
                          />
                        </label>
                        <label className="energy-settings-field">
                          Energy provider
                          <input
                            name="provider"
                            type="text"
                            autoComplete="organization"
                            placeholder="Provider name"
                            value={energySettingsDraft.provider}
                            onChange={updateEnergySetting}
                            required
                          />
                        </label>
                        <label className="energy-settings-field">
                          <span className="energy-settings-label">
                            Contract terms <span className="energy-settings-optional">Optional</span>
                          </span>
                          <input
                            name="contractTerms"
                            type="text"
                            placeholder="e.g. fixed rate through 2027"
                            value={energySettingsDraft.contractTerms}
                            onChange={updateEnergySetting}
                          />
                        </label>
                        <footer className="energy-settings-actions">
                          <button type="button" className="energy-settings-cancel" onClick={() => closeEnergySettings(true)}>
                            Cancel
                          </button>
                          <button type="submit" className="energy-settings-save">
                            Save settings
                          </button>
                        </footer>
                      </form>
                    </div>
                  )}
                </div>
                <HeroKpi id="co2" label="emissions" tooltip="Estimated greenhouse gas emissions avoided, expressed as carbon dioxide equivalent (CO2e), compared with an electric heating system." openKpi={openKpi} onToggle={setOpenKpi}>
                  <MiniIcon type="leaf" /> {installationSummary.co2}
                </HeroKpi>
                <HeroKpi id="water" label="water usage" tooltip="Total hot water consumed since installation." openKpi={openKpi} onToggle={setOpenKpi}>
                  <MiniIcon type="water" /> {installationSummary.water}
                </HeroKpi>
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

        <ElectricityChart data={data} selectedIndex={selectedElectricityIndex} onSelect={setSelectedElectricityIndex} />
        <HotWaterChart data={data} selectedIndex={selectedWaterIndex} onSelect={setSelectedWaterIndex} />
      </main>

      <BottomNav activeNav={activeNav} onChange={setActiveNav} />
    </div>
  )
}

export default App
