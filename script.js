function displayCalendar(date) {

    let htmlContent = "";
    let FebNumberOfDays = "";
    let counter = 1;
  
    //var dateNow = new Date();
    const month = date.getMonth();
  
    const nextMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
    const prevMonth = month - 1;
    const day = date.getDate();
    //const year = date.getFullYear();
  
    // names of months and week days.
    //const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
  
  
    // days in previous month and next one , and day of week.
    // var nextDate = getFirstDayOfMonth();//new Date(nextMonth +' 1 ,'+year);
  
    let weekdays = getFirstDayOfMonth(); //getLocalDay(nextDate);
    let weekdays2 = weekdays
    const numOfDays = dayPerMonth[month];
    let daysCounter = 0;
  
    // this leave a white space for days of pervious month.
    while (weekdays > 0) {
      htmlContent += `<td class='monthPre'>
      <span>${dayNames[daysCounter++]}</span>,
      <span>${weekdays}</span>
      </td>`;

      // used in next loop.
      weekdays--;
    }
  
    // loop to build the calander body.
    while (counter <= numOfDays) {
      let className = counter == day ? 'dayNow' : 'monthNow';
      // When to start new line.
      if (weekdays2 > 6) {
        weekdays2 = 0;
        htmlContent += "</tr><tr>";
      }
  
      // if counter is current day.
      htmlContent +=    `<td class=${className}>
                        <span>${daysCounter < 7 ? dayNames[daysCounter++] : ''}</span>
                        ${counter}
                        <div class='activity'>${getActivity(counter) || ''}</div>
                        </td>`
  
      weekdays2++;
      counter++;
    }

    var calendarBody = "<table class='calendar'>";
        calendarBody += "<tr>";
        calendarBody += htmlContent;
        calendarBody += "</tr></table>";
        // set the content of div .
    document.getElementById("calendar").innerHTML = calendarBody;   
}
  
function getLocalDay(date) {
    let day = date.getDay();
    if (day == 0) {
      day = 7;
    }
    return day;
}
  
function getFirstDayOfMonth() {
    const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    return getLocalDay(firstDay) - 1;
}
  

function getActivity(day) {
    return activitiesJSON[day];
};

function setNavValues () {
    let previosMonthButton = document.querySelector('.previosMonth');
    let nextMonthButton = document.querySelector('.nextMonth');
    let todayDate = document.querySelector('.todayDate');
    
    previosMonthButton.value = `◄`;
    nextMonthButton.value = `►`;
    
    let day = new Date();
    let mm = day.getMonth() + 1;
    let yy = day.getFullYear();

    if (yy < 10) yy = '0' + yy;
        switch (mm) {
            case 1:     mm = "Январь";      break;
            case 2:     mm = "Февраль";     break;
            case 3:     mm = "Март";        break;
            case 4:     mm = "Апрель";      break;
            case 5:     mm = "Май";         break;
            case 6:     mm = "Июнь";        break;
            case 7:     mm = "Июль";        break;
            case 8:     mm = "Август";      break;
            case 9:     mm = "Сентябрь";    break;
            case 10:    mm = "Октябрь";     break;
            case 11:    mm = "Ноябрь";      break;
            case 12:    mm = "Декабрь";     break;
            default:    break;
        }
    todayDate.innerHTML = mm + " " + yy;
}
  
activitiesJSON = {
    "2": 'Oolololo',
    "15": 'trololo',
    "22": 'Show things'
}
  
displayCalendar(new Date());
setNavValues();