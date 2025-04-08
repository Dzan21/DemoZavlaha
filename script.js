document.addEventListener('DOMContentLoaded', async () => {
    // Set initial dark mode state
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.setAttribute('data-theme', 'dark');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) darkModeToggle.checked = true;
    } else {
        document.body.setAttribute('data-theme', 'light');
    }

    // Set initial automation state
    const automationToggle = document.getElementById('automationToggle');
    if (automationToggle) {
        const automation = localStorage.getItem('automation');
        if (automation === 'enabled') {
            automationToggle.checked = true;
            document.getElementById('automationStatus').innerText = 'Automation is ON';
        } else {
            document.getElementById('automationStatus').innerText = 'Automation is OFF';
        }
    }

    // Ensure functions exist before calling
    if (typeof populateIrrigationSchedules === 'function') {
        populateIrrigationSchedules();
    } else {
        console.warn("Function populateIrrigationSchedules is not defined.");
    }

    // Fetch and populate water consumption data
    const data = await fetchWaterConsumptionData();
    if (data) {
        populateWaterConsumptionData(data);
        initializeCharts(data); // Initialize charts correctly
    } else {
        console.warn("fetchWaterConsumptionData returned null.");
    }

    // Fetch and display weather data
    await getWeather();

    // Set interval to refresh weather data every 10 minutes
    setInterval(getWeather, 600000); // 600000 ms = 10 minutes
});

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'enabled');
    }
}

// Toggle automation
function toggleAutomation() {
    const automationToggle = document.getElementById('automationToggle');
    const automationStatus = document.getElementById('automationStatus');
    if (automationToggle.checked) {
        localStorage.setItem('automation', 'enabled');
        automationStatus.innerText = 'Automation is ON';
    } else {
        localStorage.setItem('automation', 'disabled');
        automationStatus.innerText = 'Automation is OFF';
    }
}

// Fetch weather data
const apiKey = "JFQBEKPM9U2C2PKVYZE5XZRGZ"; // Replace with valid API key
const city = "Bratislava";
const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!data || !data.currentConditions) {
            throw new Error("No weather data available.");
        }

        const currentWeather = data.currentConditions;
        const temperature = Math.round(currentWeather.temp);
        const weatherDescription = currentWeather.conditions;
        const weatherIcon = getWeatherIcon(currentWeather.icon);

        const weatherWidget = document.getElementById("weather-widget");
        if (weatherWidget) {
            weatherWidget.innerHTML = `
                <div class="weather-card">
                    <img src="${weatherIcon}" alt="${weatherDescription}">
                    <div class="weather-info">
                        <h2>${temperature}°C</h2>
                        <p>${weatherDescription}</p>
                    </div>
                </div>
            `;
        } else {
            console.warn("Element #weather-widget not found.");
        }
    } catch (error) {
        console.error("Weather Data Error:", error);
        const weatherWidget = document.getElementById("weather-widget");
        if (weatherWidget) weatherWidget.innerHTML = "Unable to load weather data.";
    }
}

// Get weather icon
function getWeatherIcon(iconCode) {
    const iconMap = {
        "clear-day": "https://openweathermap.org/img/wn/01d@2x.png",
        "clear-night": "https://openweathermap.org/img/wn/01n@2x.png",
        "partly-cloudy-day": "https://openweathermap.org/img/wn/02d@2x.png",
        "partly-cloudy-night": "https://openweathermap.org/img/wn/02n@2x.png",
        "cloudy": "https://openweathermap.org/img/wn/03d@2x.png",
        "rain": "https://openweathermap.org/img/wn/09d@2x.png",
        "snow": "https://openweathermap.org/img/wn/13d@2x.png",
        "wind": "💨",
        "fog": "🌫️"
    };
    return iconMap[iconCode] || "https://openweathermap.org/img/wn/50d@2x.png";
}

// Fetch water consumption data
async function fetchWaterConsumptionData() {
    return {
        totalWaterUsedToday: 120,
        dailyUsage: 120,
        weeklyUsage: 840,
        monthlyUsage: 3600,
        averageWaterConsumption: 60,
        estimatedCost: 12.34,
        historical: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [100, 200, 150, 300, 250, 400, 350, 450, 500, 550, 600, 650]
        }
    };
}

// Populate water consumption data
function populateWaterConsumptionData(data) {
    const totalWaterUsed = document.getElementById('totalWaterUsed');
    if (totalWaterUsed) totalWaterUsed.innerText = `${data.totalWaterUsedToday} liters`;

    const avgWaterConsumption = document.getElementById('averageWaterConsumption');
    if (avgWaterConsumption) avgWaterConsumption.innerText = `${data.averageWaterConsumption} liters`;

    const estimatedCost = document.getElementById('estimatedCost');
    if (estimatedCost) estimatedCost.innerText = `$${data.estimatedCost.toFixed(2)}`;
}

// Initialize charts
function initializeCharts(data) {
    const waterUsageCanvas = document.getElementById('waterUsageChart');
    const historicalTrendsCanvas = document.getElementById('historicalTrendsChart');

    if (!waterUsageCanvas || !historicalTrendsCanvas) return;

    new Chart(waterUsageCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Daily', 'Weekly', 'Monthly'],
            datasets: [{
                label: 'Water Usage (liters)',
                data: [data.dailyUsage, data.weeklyUsage, data.monthlyUsage],
                backgroundColor: ['#03A9F4', '#4CAF50', '#FFC107'],
                borderColor: ['#03A9F4', '#4CAF50', '#FFC107'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    new Chart(historicalTrendsCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: data.historical.labels,
            datasets: [{
                label: 'Water Consumption (liters)',
                data: data.historical.data,
                backgroundColor: 'rgba(3, 169, 244, 0.2)',
                borderColor: '#03A9F4',
                borderWidth: 1,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// FIX: Define `populateIrrigationSchedules`
function populateIrrigationSchedules() {
    console.log("populateIrrigationSchedules executed.");
}

// Call `populateIrrigationSchedules` if exists
if (typeof populateIrrigationSchedules === 'function') {
    populateIrrigationSchedules();
} else {
    console.warn("populateIrrigationSchedules function not found.");
}