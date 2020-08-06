const web = Handlebars.compile(
    document.querySelector('#webLinkTemplate').innerHTML
);

const suggestion = Handlebars.compile(
    document.querySelector('#suggestionTemplate').innerHTML
);


const dayTime = 7;
const nightTime = 19;

document.addEventListener("DOMContentLoaded", () => {
    // get local webs
    if (localStorage["webLinks"]) {
        webLinks = localStorage["webLinks"];
    }

    // get time
    const time = new Date();

    // get weather
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=15a9adb8e010731c682b06cf232df34c&units=metric')
        .then(response => response.json())
        .then(data => {
            let type = data.weather[0].main;
            if (type === "Thunderstorm") type = "Thunder";
            let temp = parseInt(data.main.temp);
            let icon, color;
            if (weatherList[type]) {
                icon = weatherList[type].icon;
                color = weatherList[type].color;
            } else {
                icon = "🏙";
                color = "#DFDFDF";
            }


            document.querySelector('#weatherTemp').innerHTML = temp;
            document.querySelector('#weatherIconA').innerHTML = icon;
            document.querySelector('#weatherType').innerHTML = type;
            document.querySelector('#weatherCard').style.backgroundColor = color;
        });

    // get local note
    if (localStorage['note']) {
        document.querySelector('#note').value = localStorage['note'];
    }

    // get activities
    let h = time.getHours();
    if (h >= 24 || h <= 4) {
        // night
        getActivity('night');
    } else if (h >= 5 && h <= dayTime) {
        // wakeup
        getActivity('wakeup');
    } else if (h <= 11) {
        // morning (random)
        getActivity('morning');
    } else if (h === 12) {
        // lunch
        getActivity('lunch');
    } else if (h <= 17) {
        // afternoon (random)
        getActivity('afternoon');
    } else if (h <= nightTime) {
        // dinner
        getActivity('dinner');
    } else if (h <= 23) {
        // evening (random)
        getActivity('evening');
    }

    // get tips

    // get news

    // get suggestion

    // add web links
    for (let w of webLinks) {
        document.querySelector('#webContainer').innerHTML += web({
            name: w.name,
            link: w.link,
            icon: w.name.charAt(0),
            bg: w.bg,
        });
    }

    // add suggestion
    for (let s of suggestionLinks) {
        document.querySelector('#suggestColSec').innerHTML += suggestion({

            title: s.title,
            link: s.link,
            pic: s.pic,
        });
    }
    // set mode
    if (time.getHours() >= nightTime || time.getHours() <= dayTime) {
        setDarkMode();
    }
})


function updateNote() {
    localStorage['note'] = document.querySelector('#note').value;
}


function setEmotion(emo){
    console.log(emo);
    if(!localStorage['emoList']){
        localStorage['emoList'] = "";
    }
    localStorage['emoList'] = emo + localStorage['emoList'];
    if(localStorage['emoList'].length >= 50){
        localStorage['emoList'] = localStorage['emoList'].substring(0, 50);
    } 
    console.log(localStorage['emoList']);
}

// function setEmotion(emo){
//     const t = new Date();
//     const year = t.getFullYear();
//     const month = t.getMonth() + 1;
//     const date = t.getDate();
//     const day = t.getDay();
//     updateEmotion(year, month, date, day, emo);
// }


// function updateEmotion(year, month, date, day, emo){
//     if (!localStorage['emoCalendar']){
//         localStorage['emoCalendar'] = {}
//     }
//     if (!localStorage['emoCalendar'][year]){
//         localStorage['emoCalendar'][year] = {};
//     }
//     if (!localStorage['emoCalendar'][year][month]){
//         localStorage['emoCalendar'][year][month] = {};
//     }
//     if (!localStorage['emoCalendar'][year][month][date]){
//         localStorage['emoCalendar'][year][month][date] = {};
//     }

//     localStorage['emoCalendar'][year][month][date]['day'] = day;
//     localStorage['emoCalendar'][year][month][date]['emo'] = emo;
    
// }


function getActivity(type) {
    if (type !== "morning" && type !== "afternoon" && type !== "evening"){
        document.querySelector('#activityTitle').textContent = activities[type].text;
        document.querySelector('#activityImage').src = activities[type].image;
        document.querySelector('.activity').style.backgroundColor = activities[type].color;
    } else {
        // random
        const rand = Math.floor(Math.random() * activities[type].length);
        document.querySelector('#activityTitle').textContent = activities[type][rand].text;
        document.querySelector('#activityImage').src = activities[type][rand].image;
        document.querySelector('.activity').style.backgroundColor = activities[type][rand].color;
    }
}

function setDarkMode() {
    document.querySelectorAll('.light').forEach(i => {
        i.classList.add('dark');
        i.classList.remove('light');
    });

    document.querySelectorAll('.light-accent').forEach(i => {
        i.classList.add('dark-accent');
        i.classList.remove('light-accent');
    });

    document.querySelectorAll('.light-accent-gradient').forEach(i => {
        i.classList.add('dark-accent-gradient');
        i.classList.remove('light-accent-gradient');
    });

    document.querySelectorAll('.light-text').forEach(i => {
        i.classList.add('dark-text');
        i.classList.remove('light-text');
    });

    document.querySelectorAll('.light-accent-text').forEach(i => {
        i.classList.add('dark-accent-text');
        i.classList.remove('light-accent-text');
    });

    document.querySelectorAll('.light-paper').forEach(i => {
        i.classList.add('dark-paper');
        i.classList.remove('light-paper');
    });

    document.querySelector('#weatherCard').style.filter = "brightness(85%)";

    document.querySelectorAll('.web-icon').forEach(i => {
        i.style.filter = "brightness(80%)";
    });
}



var webLinks = [
    {
        name: "Google",
        link: "https://www.google.com",
        bg: "#FF5C5C",
    },
    {
        name: "Acorn",
        link: "https://acorn.utoronto.ca/",
        bg: "#5A63DB",
    },
    {
        name: "Quercus",
        link: "https://q.utoronto.ca/",
        bg: "#FF5B81",
    },
    {
        name: "Outlook",
        link: "https://www.outlook.com",
        bg: "#58B1FF",
    },
    {
        name: "Youtube",
        link: "https://www.youtube.com/",
        bg: "#FF2525",
    },
    {
        name: "Github",
        link: "https://github.com/",
        bg: "#1C1C1C",
    },
]


var weatherList = {
    "Clear": {
        icon: "🌞",
        color: "#F2FFA1",
    },
    "Thunder": {
        icon: "⛈",
        color: "#D8BAFE",
    },
    "Drizzle": {
        icon: "☔",
        color: "#CCE0EE",
    },
    "Rain": {
        icon: "🌧",
        color: "#9BD1F5",
    },
    "Snow": {
        icon: "🌨",
        color: "#FFFFFF",
    },
    "Clouds": {
        icon: "☁",
        color: "#DADADA",
    },
    "Fog": {
        icon: "🌫",
        color: "#AFEFDE",
    },
}


var activities = {
    wakeup: {
        text: "Good morning 🌄",
        image: "./images/morning.svg",
        color: "#B9CAFC",
    },
    breakfast: {
        text: "Morning energy! 🍳",
        image: "./images/breakfast.svg",
        color: "#FFE8C5",
    },
    morning: [
        {
            text: "Morning coffee ☕",
            image: "./images/coffee.svg",
            color: "#BBB2A7",
        },
        {
            text: "Stretch yourself 💪",
            image: "./images/stretch.svg",
            color: "#B9E9CA",
        },
        {
            text: "Talk to friends 😆",
            image: "./images/talk.svg",
            color: "#B6DEF2",
        },
    ],
    lunch: {
        text: "Lunch break 🍜",
        image: "./images/lunch.svg",
        color: "#E6E9B9",
    },
    afternoon: [
        {
            text: "Rest your eyes 🥽",
            image: "./images/eyes.svg",
            color: "#BFE9B9",
        },
        {
            text: "Go for a walk 🚶‍♀️",
            image: "./images/walk.svg",
            color: "#A3E3CE",
        },
    ],
    dinner: {
        text: "Dinner time 🍽",
        image: "./images/dinner.svg",
        color: "#FFC8C1",
    },
    evening: [
        {
            text: "Read a book 📔",
            image: "./images/read.svg",
            color: "#5B4404",
        },
        {
            text: "Watch a movie? 🍿",
            image: "./images/movie.svg",
            color: "#4C415A",
        },
        {
            text: "Do some sport 🛹",
            image: "./images/sport.svg",
            color: "#BB0000",
        },
        {
            text: "A hot bath 🛀",
            image: "./images/bath.svg",
            color: "#324C6D",
        },
    ],
    night: {
        text: "Good night 🌉",
        image: "./images/sleep.svg",
        color: "#001939",
    }
}

var suggestionLinks = [
    {
        title: "Reopening Ontario: Entering Stage 3",
        link: "https://www.ontario.ca/page/reopening-ontario",
        pic: "https://files.ontario.ca/stage1plan-image1-en.jpg",
    },
    {
        title: "What to expect during the NBA’s return",
        link: "https://www.sbnation.com/nba/2020/7/29/21335877/nba-preview-orlando-restart-check-in",
        pic: "https://cdn.vox-cdn.com/thumbor/Qa8HVyp6xVSxfil3cpCoR7h4byY=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/20668996/NBA.png",
    },
    {
        title: "League of Legends Global Power Rankings",
        link: "https://www.espn.com/esports/story/_/id/29590341/league-legends-global-power-rankings-august-3",
        pic: "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F1013%2Fr446321_1296x729_16%2D9.jpg",
    },
    {
        title: "SNH48 7th general election",
        link: "https://snh48g.fandom.com/wiki/7th_General_Election",
        pic: "https://snh48.today/wp-content/uploads/2020/07/a04b2a1dgy1gggi3zmnd3j21z59kxx6z1.jpg",
    },
]
