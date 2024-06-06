import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css'

const TimerDisplay = ({ timerMode,
    percentage,
    timeLeft,
    isActive,
    setIsActive,
    buttonText,
    setButtonText, }) => {

    const handleClick = (event) => {
        if (event.target.id === 'muteButton') {
            return null
        }

        if (timeLeft === '0:00') {
            return null
        }
        setIsActive(!isActive)
        setButtonText(buttonText === 'START'
            || buttonText === 'RESUME'
            ? 'PAUSE'
            : 'RESUME'
        )
    }

    let timesUpMsg = timerMode === 'pomo'
        ? 'time for a break'
        : 'back to work!'

    let timeText = timeLeft === '0:00'
        ? timesUpMsg
        : timeLeft

    return (
        <div className="timer" onClick={handleClick}>
            <div className="timer-display">
                <CircularProgressbarWithChildren
                    value={percentage}
                    text={timeText}
                    strokeWidth={4}
                    styles={buildStyles({
                        pathColor: '#DA0037',
                        textColor: '#DA0037',
                        textSize: '30px',
                        trailColor: '#da003759',
                    })}>
                    <button className="display-start-pause" onClick={handleClick}>{buttonText}</button>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    )
}

export default TimerDisplay
