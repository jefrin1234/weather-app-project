

const searchButton = document.getElementById('search')


searchButton.addEventListener('click' ,async () => {
  const apiKey = '8aae5bfe5172a0fa90fde739ccced26a'
  const city = document.getElementById('city').value;


  if (!city) {
    alert('Please enter a city name');
    return
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    displayWeatherData(data)
    
  })
  .catch(error => {
    console.log('Error fetching data:' + error );
    alert('error fetching data try again ')
  })




function displayWeatherData(data){

  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');


  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if(data.cod === '404'){
    weatherInfoDiv.innerHTML = `<p>${data.message}</P>`;
  }
  else{

   const cityName = data.name;
   const temparature = Math.round(data.main.temp - 273.15);
   const description = data.weather[0].description;
   const iconCode = data.weather[0].icon;
   const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

   const temparatureHTML =` <p>${temparature}&deg;C</p>`;

   const weatherHtml = `
   <p>${cityName}</p>
   <p>${description}</p>
   `;

   tempDivInfo.innerHTML = temparatureHTML;
   weatherInfoDiv.innerHTML = weatherHtml;
   weatherIcon.src = iconUrl;
   weatherIcon.alt = description

   showImage();

   function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
   }



  }
}

}
)