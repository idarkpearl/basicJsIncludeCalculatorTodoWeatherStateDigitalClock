const apiKey = "a940e740b69a462798a191725251311";

const getWeatherButton = document.getElementById("getWeatherButton");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const tableDiv = document.getElementById("weatherTable");

getWeatherButton.addEventListener("click", async function (event) {
    event.preventDefault();   // 🚀 stop page reload

    const city = cityInput.value.trim();
    if (!city) {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            weatherResult.innerHTML = `<p>City not found</p>`;
            return;
        }

        weatherResult.innerHTML = `
            <p id='localTimeNow'>Date & Time: ${data.location.localtime}</p>
            <img src="https:${data.current.condition.icon}" id="weatherIcon" alt="Weather Icon">
            <p id='tempNow'><strong>${data.current.temp_c}°C</strong></p>
            <p id='conditionNow'>${data.current.condition.text}</p>
            <h3 id='locationNow'>${data.location.name}, ${data.location.country}</h3>
            
        `;
        let tableHTML = `
    <table border="1" cellpadding="8" style="margin-top:20px;">
        <tr>
            <th>last_updated</th>
            <th>Feels like</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Humidity</th>
            <th>Precipitation</th>
            <th>pressure</th>

        </tr>
        <tr>
        <td class="Table data">${data.current.last_updated}</td>
        <td class="Table data">${data.current.feelslike_c}°C</td>
        <td class="Table data">${data.current.humidity}%</td>
        <td class="Table data">${data.current.wind_kph} km/h</td>
        <td class="Table data">${data.current.humidity}%</td>
        <td class="Table data">${data.current.precip_mm} mm</td> 
        <td class="Table data">${data.current.pressure_mb} mb</td> 
        </tr>
        
    </table>
`;

tableDiv.innerHTML = tableHTML;

    } catch (err) {
        weatherResult.innerHTML = "<p>Error fetching data.</p>";
    }
});