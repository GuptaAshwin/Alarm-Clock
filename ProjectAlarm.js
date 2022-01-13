var alarmsound = new Audio();
alarmsound.src = "music.mp3";
let alarm_list = [];        //creating an array list to store multiple alarm
var list = document.querySelector(".alarmlist");          //fetching unordered list

// updating analog clock every sec
setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();                //object of hours,minute and seconds
    min = d.getMinutes();                 
    sec = d.getSeconds();                      
    let time = `${hr}:${min}:${sec}`;        //creating time in format to match with arraylist        
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;

    hourstick.style.transform = `rotate(${hr_rotation}deg)`;        //adding style and rotaion to hands of clock
    minutestick.style.transform = `rotate(${min_rotation}deg)`;
    secondstick.style.transform = `rotate(${sec_rotation}deg)`;
// iniating alarm if alarm time matches in the list 
    for (let i = 0; i < alarm_list.length; i++) {   
        if (alarm_list[i] === time) {
            initiateAlarm();       
        }
    }  
},
    1000);

//function for sound playing
function initiateAlarm() {
    alarmsound.play();
    document.getElementById('option').style.display = '';
}
//function for snoozing for 5 min
function Snooze() {
    Stop();
    setTimeout(initiateAlarm, 300000);
}
//function to stop alarm
function Stop() {
    alarmsound.pause();
    alarmsound.currentTime = 0;
    document.getElementById('option').style.display = 'none'; 
}

//Display FUNCTION ADD NEW ALARM IN NEW LIST WITH DELETE BUTTON
function display(alarm_list) {
    list.innerHTML = "";
    for (let i = 0; i < alarm_list.length; i++) {
        const html =
            `<li class="time-list">
        <span class="time" >${alarm_list[i]}     &nbsp&nbsp&nbsp
         <button class="btn btn-primary btn-sm" id="delete-button" onclick="remove(this.value)" value=${alarm_list[i]}  >Delete</button>
        </span> 
         </li>`;
        list.innerHTML += html;

    }

}
// setAlarm function to set alarm at user input given time
function setAlarm() {

    var time = document.getElementById('inputTime').value;         //fetching user input time
    if (time === "") {
        alert('Invalid Time');
        return;
    }
    if (alarm_list.includes(time)) {                              //checking condn if its already exist
        alert('Alarm Already Exists');
        console.log('Alarm Already Exists');
    } else if (!alarm_list.includes(time)) {                   // adds the list on display if it not includes
        var c = alarm_list.push(time);
        display(alarm_list);
    }

}
// fuction to remove the Alarm from the list 
function remove(value) {
    for (let i = 0; i < alarm_list.length; i++) {        
        if (alarm_list[i] === value) {
            alarm_list.splice(i,1); 
        }
    }
    display(alarm_list);
}