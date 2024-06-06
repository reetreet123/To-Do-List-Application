import React from 'react'
import Button from './button'
import './settings.css'

const Settings = ({ visible,
    toggleSettingsVisibility,
    pomoLength,
    setPomoLength,
    shortLength,
    setShortLength,
    longLength,
    setLongLength,
    closeSettings,
    setSecondsLeft,
    timerMode,
}) => {

    const applySettings = (event) => {
        event.preventDefault()
        setPomoLength(event.target.pomodoro.value)
        setShortLength(event.target.shortBreak.value)
        setLongLength(event.target.longBreak.value)
        closeSettings()

        switch (timerMode) {
            case 'short':
                setSecondsLeft(event.target.shortBreak.value * 60)
                break
            case 'long':
                setSecondsLeft(event.target.longBreak.value * 60)
                break
            default:
                setSecondsLeft(event.target.pomodoro.value * 60)
        }
    }

    if (visible) {
        return (
            <div className="preferences preferences--visible">
                <div className="setting-panel">
                    <div className='settings-header-container'>
                        <h2>Settings</h2>
                        <Button type="close" buttonText="×" toggleVisibility={toggleSettingsVisibility} />
                    </div>
                    <form onSubmit={applySettings} className='settings-form-container' >
                        <div className='settings-container'>
                            <h3>Time (Minutes)</h3>
                            <div action="" className="time-form">
                                <div>
                                    <label htmlFor="pomodoro">pomodoro</label>
                                    <input type="number" name="pomodoro" id="pomodoro" min="5" max="90" defaultValue={pomoLength} />
                                </div>
                                <div>
                                    <label htmlFor="short-break">short break</label>
                                    <input type="number" name="shortBreak" id="short-break" min="1" max="14" defaultValue={shortLength} />
                                </div>
                                <div>
                                    <label htmlFor="long-break">long break</label>
                                    <input type="number" name="longBreak" id="long-break" min="15" max="30" defaultValue={longLength} />
                                </div>
                            </div>
                        </div>
                        <Button type="apply" buttonText="Apply" />
                    </form>
                </div>
            </div>
        )
    }

    return (null)
}

export default Settings
