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

function displayCalendar(date) {   

    let htmlContent = "";
    let FebNumberOfDays = "";
    let counter = 1;
  
    let month = date.getMonth();
    let day = date.getDate();
  
    const dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
  
  
  
    let weekdays = getFirstDayOfMonth();
    let weekdays2 = weekdays;
    let weekdaysafter = weekdays2;
    let weekdaysbefore = dayPerMonth[month - 1];;
    let numOfDays = dayPerMonth[month];
    let daysCounter = 0;
    let daysAfterMonth = weekdays2 + +numOfDays;
  
    // this leave a white space for days of pervious month
    while (weekdays > 0) {
      htmlContent +=    `<td class='monthPre'>
                        <span>${dayNames[daysCounter++]}</span>
                        <span>${++weekdaysbefore - weekdays2}</span>
                        </td>`;
      // used in next loop
      weekdays--;
    }
  
    // loop to build the calander body
    while (counter <= numOfDays) {
      let className = counter == day ? 'dayNow' : 'monthNow';
      // When to start new line
      if (weekdays2 > 6) {
        weekdays2 = 0;
        htmlContent += "</tr><tr>";
      }
  
      // if counter is current day
        htmlContent +=    `<td class=${className}>
                            <span>${daysCounter < 7 ? dayNames[daysCounter++] : ''}</span>
                            ${counter}
                            <span class='activity'>${getActivity(counter) || ''}</span>
                            </td>`
    
        weekdays2++;
        counter++;
    }

    while (daysAfterMonth < 35){
        htmlContent += `<td class=${'className'}>
                        <span>${35 -weekdaysafter - +numOfDays}</span>
                        </td>`;
        daysAfterMonth++;
        weekdaysafter--;
    }
    
    var calendarBody = `<table class='myTable'>`;
        calendarBody += `<tr>`;
        calendarBody += htmlContent;
        calendarBody += `</tr></table>`;
        // set the content of div
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
    if(activities[day]){
        return parsDay(day);
    } ;

   
};

function fixCellsStyle () {
    let abc = document.querySelectorAll('.activity');
    let cellsList = [];

    for(let i=0; i<abc.length; i++) {
        if(abc[i].textContent != '') {
            cellsList.push(abc[i]);
        }
    }
    for(let j=0; j<cellsList.length; j++){
        cellsList[j].parentElement.classList.add("cellWithDate");
    }
    
}

function parsDay (oneDay){
    for (let key in activities[oneDay]) {
        let nameDate = activities[oneDay][0];
        let guests = activities[oneDay].slice(1);
        return nameDate + '<br />' + guests;
    }  
}


let activities;
(function(){
    if (localStorage.getItem('myCalendar')) {
        activities = JSON.parse(localStorage.getItem('myCalendar'));
    } else {
        activities = {
            '9': ['Напиться!','Витя Костин','Пётр Михайлов'],    
            '22': ['ДР!','Дима Молодцов'],
            '18': ['Зайти к соседке :)','Маша']    
        }
    }
    let myCalendar = JSON.stringify(activities);
    localStorage.setItem('myCalendar', myCalendar);
})();

displayCalendar(new Date());
setNavValues();
fixCellsStyle();