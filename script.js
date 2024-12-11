
// Code to scroll to the main loading page!

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  });


// Hamburger Menu 

const hamMenu = document.querySelector(".ham-menu");
const menuList = document.querySelector(".menu-list");
const menuLinks = document.querySelectorAll(".menu-list a"); // Select all menu links

// Toggle menu on hamburger click
hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    menuList.classList.toggle("active");
});

// Collapse menu on link click
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamMenu.classList.remove("active");
        menuList.classList.remove("active");
    });
});



// Typewriter Effect

const mainNameElement = document.querySelector(".main-name");
const nameText = "Shiva Neupane"; // The text to type out
let currentIndex = 0;

function typeWriter() {
    if (currentIndex < nameText.length) {
        mainNameElement.textContent += nameText[currentIndex];
        currentIndex++;
        setTimeout(typeWriter, 150); // Adjust speed (150ms per character)
    }
}



// Start the typewriter effect
document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
});





// SKills Section Bar Loading

let boxes = document.querySelectorAll(".box");

window.onload = function(){
    setTimeout(() => {
        load_bars();
    }, 1000);
    
}
function load_bars(){
    boxes.forEach(box => {
        let line = box.querySelector(".line")
        let increasing_percentage = box.querySelector(".increasing-percentage")
        let total_percentage = box.querySelector(".total-percentage")

        let p = 0;
        let my_interval = setInterval(() => {
            p++;
            line.style.width = p + "%";
            increasing_percentage.innerHTML = p + "%";
            if(increasing_percentage.innerHTML == total_percentage.innerHTML){
                clearInterval(my_interval);
            }
        }, 25);
    });
}



// Contact Form USING JS to save into sheet


const scriptURL = `https://script.google.com/macros/s/AKfycbwSYpALrlFtrDJDinttmULQ1whx48nZXjpTdqxnE_Y3wMBGB3fVG_Q2SjYF3zIMuxqUyg/exec`

const form = document.forms['CONTACTFORM']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {method:'POST', body: new FormData(form)})
    .then(response => alert("Your Form Submitted Successfully!"))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))

})


// Getting Weather based on Location 

const apiKey = "2f4b62df4cf943e3e54b22e8ac3dc3b5";

// Function to fetch weather data based on latitude and longitude
async function fetchWeather(lat, lon) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();

        // Update city and temperature
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to get the user's location using Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon); // Fetch weather data with user's location
            },
            (error) => {
                console.error("Error getting location:", error);
                document.querySelector(".city").innerHTML = "Enable Location";
                document.querySelector(".temperature").innerHTML = "";
            }
        );
    } else {
        console.error("Geolocation not supported by this browser.");
        document.querySelector(".city").innerHTML = "Geolocation Unsupported";
        document.querySelector(".temperature").innerHTML = "--";
    }
}

// Call the function to get the user's location and fetch weather data
getUserLocation();
