const searchGarjIrneDark = () => {
    document.getElementsByClassName('searchDark')[0].style.display = "block";
    document.getElementsByClassName("locationDark")[0].style.display = "none";
}
const searchGarjIrneLight = () => {
    document.getElementsByClassName('searchLight')[0].style.display = "block";
    document.getElementsByClassName("locationLight")[0].style.display = "none";
}
const input = document.querySelector(".searchLight");
const inputDark = document.querySelector(".searchDark");
const cityNameLight = document.querySelector('.locationLight');
const cityNameDark = document.querySelector('.locationDark');
const condPicLight = document.getElementsByClassName("conditionPicLight")[0];
const condPicDark = document.getElementsByClassName('conditionPicDark')[0];
let today = new Date();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let currMonth = months[today.getMonth()];
document.getElementsByClassName('dateLight')[0].innerHTML = currMonth + " " + today.getDate() + ", " + today.getFullYear();
document.getElementsByClassName('dateDark')[0].innerHTML = currMonth + " " + today.getDate() + ", " + today.getFullYear();
let unixNow = Math.floor(Date.now()/1000)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&appid=b54c363da58b83c8327f53f5ddbc81c0`).then((res) => {
        return res.json();
    }).then((data) => {
        displayDataDefault(data.main.temp, data.weather[0].main, data.sys.sunrise, data.sys.sunset)
    })
    function displayDataDefault(tempRawDefault, statusDefault, unixSRDefault, unixSSDefault) {
        let day = true
        document.getElementsByClassName("degreeLight")[0].innerHTML = Math.round(tempRawDefault - 273) + "°"
        document.getElementsByClassName("conditionLight")[0].innerHTML = statusDefault
        document.getElementsByClassName("degreeDark")[0].innerHTML = Math.round(tempRawDefault - 273) + "°"
        document.getElementsByClassName("conditionDark")[0].innerHTML = statusDefault
        if(unixNow >= unixSRDefault && unixNow <= unixSSDefault) {
            day = true
            document.getElementsByClassName("lightContainer")[0].style.display = 'flex';
            document.getElementsByClassName("darkContainer")[0].style.display = 'none';
            document.getElementsByTagName("body")[0].style.backgroundColor = "#F3F4F6";
        } else {
            day = false
            document.getElementsByClassName("lightContainer")[0].style.display = 'none';
            document.getElementsByClassName("darkContainer")[0].style.display = 'flex';
            document.getElementsByTagName("body")[0].style.backgroundColor = "#0B0F1A";
        }
        if(statusDefault == "Clouds") {
            if(day==true){
                condPicLight.src = "/clouds.png";
            } else {
                condPicDark.src = "/clouds (1).png";
            }
        } else if (statusDefault == "Thunderstorm") {
            if(day==true){
                condPicLight.src = "/thunderday.png";
            } else {
                condPicDark.src = "/thunderNight.png";
            }
        } else if (statusDefault == "Drizzle") {
            if(day==true){
                condPicLight.src = "/rain.png";
            } else {
                condPicDark.src = "/rain (1).png";
            }
        } else if (statusDefault == "Rain") {
            if(day==true){
                condPicLight.src = "/rain.png";
            } else {
                condPicDark.src = "/rain (1).png";
            }
        } else if (statusDefault == "Snow") {
            if(day==true){
                condPicLight.src = "/snow.png";
            } else {
                condPicDark.src = "/snow (1).png";
            }
        } else if (statusDefault == "Clear") {
            if(day==true){
                condPicLight.src = "/Sun.png";
            } else {
                condPicDark.src = "/Sun (2).png";
            }
        } else {
            if(day==true){
                condPicLight.src = "/Wind.png";
            } else {
                condPicDark.src = "/Wind (1).png";
            }
        }
    }

input.addEventListener('keypress', (event) => {
    if(event.keyCode == 13) {
        getWeather(input.value)
        console.log(input.value)
        document.getElementsByClassName('searchLight')[0].style.display = "none";
        document.getElementsByClassName("locationLight")[0].style.display = "block";
    }
})
inputDark.addEventListener('keypress', (event) => {
    if(event.keyCode == 13) {
        getWeather(inputDark.value)
        document.getElementsByClassName('searchDark')[0].style.display = "none";
        document.getElementsByClassName("locationDark")[0].style.display = "block";
    }
})
async function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b54c363da58b83c8327f53f5ddbc81c0`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        if (data.message) {
            alert("City not found :(")
        }else{
            displayData(data.name, data.main.temp, data.weather[0].main, data.sys.sunrise, data.sys.sunset)
        }
    })
}

function displayData(Name, tempRaw, status, unixSR, unixSS) {
    cityNameLight.innerText = Name
    cityNameDark.innerText = Name
    let day = true 
    document.getElementsByClassName("degreeLight")[0].innerHTML = Math.round(tempRaw - 273) + "°"
    document.getElementsByClassName("conditionLight")[0].innerHTML = status
    document.getElementsByClassName("degreeDark")[0].innerHTML = Math.round(tempRaw - 273) + "°"
    document.getElementsByClassName("conditionDark")[0].innerHTML = status
    if(unixNow >= unixSR && unixNow <= unixSS) {
        day = true
        document.getElementsByClassName("lightContainer")[0].style.display = 'flex';
        document.getElementsByClassName("darkContainer")[0].style.display = 'none';
        document.getElementsByTagName("body")[0].style.backgroundColor = "#F3F4F6";
    } else {
        day = false
        document.getElementsByClassName("lightContainer")[0].style.display = 'none';
        document.getElementsByClassName("darkContainer")[0].style.display = 'flex';
        document.getElementsByTagName("body")[0].style.backgroundColor = "#0B0F1A";
    }
    if(status == "Clouds") {
        if(day==true){
            condPicLight.src = "weathercondition/cloudyDay.png";
        } else {
            condPicDark.src = "weathercondition/cloudyNight.png";
        }
    } else if (status == "Thunderstorm") {
        if(day==true){
            condPicLight.src = "weathercondition/thunderDay.png";
        } else {
            condPicDark.src = "weathercondition/thunderNight.png";
        }
    } else if (status == "Drizzle") {
        if(day==true){
            condPicLight.src = "weathercondition/rainyDay.png";
        } else {
            condPicDark.src = "weathercondition/rainyNight.png";
        }
    } else if (status == "Rain") {
        if(day==true){
            condPicLight.src = "weathercondition/rainyDay.png";
        } else {
            condPicDark.src = "weathercondition/rainyNight.png";
        }
    } else if (status == "Snow") {
        if(day==true){
            condPicLight.src = "weathercondition/snowyDay.png";
        } else {
            condPicDark.src = "weathercondition/snowyNight.png";
        }
    } else if (status == "Clear") {
        if(day==true){
            condPicLight.src = "weathercondition/clearDay.png";
        } else {
            condPicDark.src = "weathercondition/clearNight.png";
        }
    } else {
        if(day==true){
            condPicLight.src = "weathercondition/windyDay.png";
        } else {
            condPicDark.src = "weathercondition/windyNight.png";
        }
    }
}