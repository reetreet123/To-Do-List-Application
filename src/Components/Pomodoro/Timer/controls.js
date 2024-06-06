import React from 'react'
import './controls.css'
const Controls = ({ timerMode,
                    setTimerMode,
                    setSecondsLeft,
                    pomoLength,
                    shortLength,
                    longLength,
                    setIsActive,
                    setButtonText,
                    volume
                  }) => {

  const handleModeChange = (event) => {
    setTimerMode(event.target.id)
    setIsActive(false)
    setButtonText('START')
    switch(event.target.id) {
      case 'short':
        setSecondsLeft(shortLength * 60)
        break
      case 'long':
        setSecondsLeft(longLength * 60)
        break
      default:
        setSecondsLeft(pomoLength * 60)
    }
  }

  return(
    <form className="controls">
        <div className='radio-container'>
            <input  type="radio" 
                    id="pomo" 
                    name="mode" 
                    checked={timerMode === 'pomo'}
                    onChange={handleModeChange} 
                    className='hidden-radio'/>
            <label  htmlFor="pomo" className="control-button lable">pomodoro</label>
        </div>

      <input  type="radio" 
              id="short" 
              name="mode" 
              checked={timerMode === 'short'}
              onChange={handleModeChange} 
              className='hidden-radio'/>
      <label htmlFor="short"  className="control-button lable">short break</label>
      
      <input  type="radio" 
              id="long" 
              name="mode" 
              checked={timerMode === 'long'}
              onChange={handleModeChange} 
              className='hidden-radio'/>
      <label htmlFor="long"  className="control-button lable">long break</label>
    </form>
  )
}

export default Controls
