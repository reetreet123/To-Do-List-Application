import React, { useState, useEffect } from 'react';
import DayDate from './Components/Todo/getDay';
import './App.css';
import TimerDisplay from './Components/Pomodoro/Timer/Timer';
import Controls from './Components/Pomodoro/Timer/controls';
import Button from './Components/Pomodoro/Timer/button';
import Settings from './Components/Pomodoro/Timer/settings';

function App() {
  const [checkboxes, setCheckboxes] = useState([]);
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [timerMode, setTimerMode] = useState('pomo')
  const [pomoLength, setPomoLength] = useState(25)
  const [shortLength, setShortLength] = useState(3)
  const [longLength, setLongLength] = useState(15)
  const [accentColor, setAccentColor] = useState('default')
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60)
  const [isActive, setIsActive] = useState(false)
  const [buttonText, setButtonText] = useState('START')

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1)
      }, 1000)

      if (secondsLeft === 0) {
        clearInterval(interval)
        setIsActive(false)
        setButtonText('')
      }

      return () => clearInterval(interval)
    }

  }, [isActive, secondsLeft]);

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  const formatTimeLeft = (seconds) => {
    return (`${Math.floor(seconds / 60)}:${(seconds % 60 > 9)
      ? seconds % 60
      : '0' + seconds % 60
      }`)
  }

  const calcPercentage = () => {
    if (timerMode === 'pomo') {
      return ((secondsLeft / (pomoLength * 60)) * 100)
    }
    if (timerMode === 'short') {
      return ((secondsLeft / (shortLength * 60)) * 100)
    }
    if (timerMode === 'long') {
      return ((secondsLeft / (longLength * 60)) * 100)
    }

  }


  function createCheckBox(val, index) {
    const handleDeleteClick = () => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes.splice(index, 1);
      setCheckboxes(newCheckboxes);
    };

    return (
      <div className='task-container' key={index}>
        <div className='taskName'>
          <input type="checkbox" className="check" id={`check-${index}`} />
          <label htmlFor={`check-${index}`} className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>{val}</span>
          </label>
        </div>
        <i className='material-icons' onClick={handleDeleteClick}>delete</i>
      </div>
    );
  }

  function handleAddButtonClick() {
    let task_input = document.getElementById('task-name');
    let val = task_input.value;
    task_input.value = "";
    if (val === "") {
      document.getElementById('add-container').classList.add('shake');
      setTimeout(function () {
        document.getElementById('add-container').classList.remove('shake');
      }, 1000);
    } else {
      const newCheckboxes = [...checkboxes, createCheckBox(val, checkboxes.length)];
      setCheckboxes(newCheckboxes);
    }
  }

  return (
    <>
      <main>
        <section id="sunny">
          <div className="to-do-card-container">
            <div className='to-do-Header'>
              <i className="material-icons sun">sunny</i>
              <h1 className='Day-container'><DayDate /></h1>
            </div>
            <div className='to-do-body'>
              <div className="checkbox-wrapper">
                {checkboxes.map((checkbox, index) => (
                  <div key={index}>{checkbox}</div>
                ))}
              </div>
              <div className='add-section-container' id='add-container'>
                <input className='add-button' placeholder='Add Task' id='task-name'></input>
                <button className='addButton material-icons' onClick={handleAddButtonClick}>add_circle</button>
              </div>
            </div>
          </div>
          <div className='pomodoro-container'>
            <Controls
              timerMode={timerMode}
              setTimerMode={setTimerMode}
              setSecondsLeft={setSecondsLeft}
              pomoLength={pomoLength}
              shortLength={shortLength}
              longLength={longLength}
              setIsActive={setIsActive}
              buttonText={buttonText}
              setButtonText={setButtonText}
            />
            <TimerDisplay
              timerMode={timerMode}
              percentage={calcPercentage()}
              timeLeft={formatTimeLeft(secondsLeft)}
              isActive={isActive}
              setIsActive={setIsActive}
              buttonText={buttonText}
              setButtonText={setButtonText}
            />
            <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
            <Settings visible={settingsVisible}
              toggleSettingsVisibility={toggleSettingsVisibility}
              pomoLength={pomoLength}
              setPomoLength={setPomoLength}
              shortLength={shortLength}
              setShortLength={setShortLength}
              longLength={longLength}
              setLongLength={setLongLength}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              closeSettings={toggleSettingsVisibility}
              setSecondsLeft={setSecondsLeft}
              timerMode={timerMode}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
