//acessing elements from html
const clockDisplay = document.getElementById('clock');
const alarmForm = document.getElementById('alarmForm');
const alarmHourInput = document.getElementById('alarmHour');
const alarmMinuteInput = document.getElementById('alarmMinute');
const alarmSecondInput = document.getElementById('alarmSecond');
const alarmPeriodInput = document.getElementById('alarmPeriod');
const setAlarmButton = document.getElementById('setAlarmButton');
const alarmsList = document.getElementById('alarmsList');
let alarms = [];
//function to update time
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockDisplay.textContent = `${hours>12 ? (hours-12).toString().padStart(2,'0') : hours}:${minutes}:${seconds} ${hours>=12 ? 'PM':'AM'}`;
  }
//function to check alarm time and alert 
  function checkAlarms() {
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    const nowSeconds = now.getSeconds();

    alarms.forEach((alarm, index) => {
      if (
        alarm.hours === nowHours &&
        alarm.minutes === nowMinutes &&
        alarm.seconds === nowSeconds &&
        alarm.period === (nowHours >= 12 ? 'PM' : 'AM')
      ) {
        alert('Time to wake up! Alarm: ' + (index + 1));
        alarms.splice(index, 1);
        displayAlarms();
      }
    });
  }
//function to display all the set alarms
  function displayAlarms() {
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, index) => {
      const li = document.createElement('li');
      li.textContent = `${alarm.hours.toString().padStart(2, '0')}:${alarm.minutes.toString().padStart(2, '0')}:${alarm.seconds.toString().padStart(2, '0')} ${alarm.period}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteAlarm(index));
      li.appendChild(deleteButton);
      alarmsList.appendChild(li);
    });
  }
//function to delete alarms
  function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
  }
// function to set alarm
  setAlarmButton.addEventListener('click', () => {
    const hours = parseInt(alarmHourInput.value);
    const minutes = parseInt(alarmMinuteInput.value);
    const seconds = parseInt(alarmSecondInput.value);
    const period = alarmPeriodInput.value;

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
      alarms.push({ hours, minutes, seconds, period });
      displayAlarms();
      alert('Alarm set successfully!');
    } else {
      alert('Invalid alarm time.');
    }
  });

  setInterval(updateClock, 1000);
  setInterval(checkAlarms, 1000);