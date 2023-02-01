
const brooklynSchedule = [["OFF","7-3","7-3","7-3","7-3","OFF","OFF"],["OFF","OFF","OFF","OFF","7A","7A","7A"],["7A","OFF","OFF","7P","7P","7P","OFF"],["OFF","7A","7A","7A","OFF","OFF","7P"],["7P","7P","7P","OFF","OFF","OFF","OFF"]];
const queensSchedule = [["OFF","8-4","8-4","8-4","8-4","OFF","OFF"],["OFF","OFF","OFF","OFF","8A","8A","8A"],["8A","OFF","OFF","8P","8P","8P","OFF"],["OFF","8A","8A","8A","OFF","OFF","8P"],["8P","8P","8P","OFF","OFF","OFF","OFF"]];
const brooklynEight = [["OFF","7-3","7-3","7-3","7-3","7-3","OFF"],["OFF","OFF","3-11","3-11","3-11","3-11","3-11"],["3-11","3-11","OFF","OFF","7-3","7-3","7-3"],["7-3","7-3","7-3","OFF","OFF","11-7","11-7"],["11-7","11-7","11-7","11-7","11-7","OFF","OFF"]];
const queensEight = [["OFF","8-4","8-4","8-4","8-4","8-4","OFF"],["OFF","OFF","4-12","4-12","4-12","4-12","4-12"],["4-12","4-12","OFF","OFF","8-4","8-4","8-4"],["8-4","8-4","8-4","OFF","OFF","12-8","12-8"],["12-8","12-8","12-8","12-8","12-8","OFF","OFF"]];
// The array count for steady shifts starts at 3, so the first three arrays are blank
const steadyShift = [["","","","","","",""],[],[],["6-2","6-2","6-2","6-2","6-2","OFF","OFF"],["OFF","6-2","6-2","6-2","6-2","6-2","OFF"],["OFF","OFF","6-2","6-2","6-2","6-2","6-2"],["7-3","7-3","7-3","7-3","7-3","OFF","OFF"],["OFF","7-3","7-3","7-3","7-3","7-3","OFF"],["8-4","8-4","8-4","8-4","8-4","OFF","OFF"],["OFF","8-4","8-4","8-4","8-4","8-4","OFF"],["OFF","2-10","2-10","2-10","2-10","2-10","OFF"],["OFF","3-11","3-11","3-11","3-11","3-11","OFF"],["4-12","4-12","4-12","4-12","4-12","OFF","OFF"],["OFF","4-12","4-12","4-12","4-12","4-12","OFF"],["OFF","OFF","4-12","4-12","4-12","4-12","4-12"],["10-6","10-6","10-6","10-6","10-6","OFF","OFF",]];

// This is the first function to get called.  This function gets called when the "Click to Update" button is clicked
function selectWeek() {
    const week = document.getElementById('desiredWeek').value; 
    //const boro = document.getElementById('boro').value; 
    checkName();
    populate(week)  // calls function populate to make sure a Sunday was selected and populates the days of the week.
    getInfo();
  }

// This is the second function to get called.  If the start day is a Sunday the dates populate otherwise the page refreshes.
function populate (week) {
    let d = new Date(week);
    if (d.getDay() != 6) {
        alert("You must select a Sunday as the start date!");
        location.reload();  // refreshes page if selected day not a Sunday
    }

    // This code sets up the dates on the top table right below the day names
    let day = week.slice(8,10);
    let month = week.slice(5,7);
    document.getElementById('sun').innerHTML = month + "/" + day;
    document.getElementById('mon').innerHTML = month + "/" + (Number(day) + 1);
    document.getElementById('tue').innerHTML = month + "/" + (Number(day) + 2);
    document.getElementById('wed').innerHTML = month + "/" + (Number(day) + 3);
    document.getElementById('thu').innerHTML = month + "/" + (Number(day) + 4);
    document.getElementById('fri').innerHTML = month + "/" + (Number(day) + 5);
    document.getElementById('sat').innerHTML = month + "/" + (Number(day) + 6);
}

// Sets the schedule in the table at the bottom of the page
// Shift is the array to load values from. ex: brooklynEight, brooklynSchedule etc...
function loadSchedule(shift) {
    for(let y = 1; y < 6; y++) {
            for ( let x = 0; x < 7; x++) {
                const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                const temp = "week" + y + days[x];
                document.getElementById(temp).innerHTML = shift[y-1][x];
            }
        }
}

// call functions depending on selections: Location and Shift
function getInfo() {
    const boro = document.getElementById('boro').value;
    const group = document.getElementById('group').value;
    const rotation = document.getElementById('rotation').value;
    
    if (group <3) {
        document.getElementById("hidetable").style.display ="block";
        document.getElementById("hiderotation").style.display="inline";
        if (boro==="Brooklyn" && group === "1") {
            loadSchedule(brooklynEight);
            setDays(brooklynEight,rotation);
        } else if (boro==="Brooklyn" && group === "2") {
            loadSchedule(brooklynSchedule);
            setDays(brooklynSchedule,rotation);
        } else if (boro ==="Queens" && group === "1") {
            loadSchedule(queensEight);
            setDays(queensEight,rotation);
        } else {
            loadSchedule(queensSchedule);
            setDays(queensSchedule,rotation);
        }
    }

    if (group > 2) { 
        document.getElementById("hidetable").style.display ="none";
        document.getElementById("hiderotation").style.display="none";
        setDays(steadyShift,group);
    } 
}

function setDays(shift,group) {
    //console.log(shift, group);
    for (x = 0; x < 7; x++) {
        document.getElementById('day' + x).innerHTML=shift[group][x];
    }
}

function hideBrooklyn(status) {
        const brk = document.getElementsByClassName("brk");
        for (x = 0; x < brk.length; x++) {
            brk[x].style.display =status;
        }
}

function hideQueens(status) {
    const qns = document.getElementsByClassName("qns");
    for (x = 0; x < qns.length; x++) {
        qns[x].style.display =status;
    }
}

function selection() {
    const boro = document.getElementById('boro').value;
    if (boro === "Brooklyn") {
        hideBrooklyn("block");
        hideQueens("none");
    } else {
        hideQueens("block");
        hideBrooklyn("none");
    }
}

function checkName() {
    const name = document.getElementById('name').value;
    const numb = document.getElementById('empnum').value;
    const letters = /^[0-9]/;
    if (name.length < 1 || numb.length !== 5 || isNaN(numb) || name.match(letters)) {
        document.getElementById('name').style.backgroundColor="#FFFF00";
        document.getElementById('empnum').style.backgroundColor="#FFFF00";
        alert("Please enter your name and a five digit employee number!");
    } else {
        document.getElementById('name').style.backgroundColor="white";
        document.getElementById('empnum').style.backgroundColor="white";
    }
}

loadSchedule(brooklynEight);
selection();