document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        getWeather();
    }
});

    
function getWeather(){
	const APIKey = '3f8c84ada8bd0610b0e63631900526ba';
	const city = document.querySelector('.searchbox input').value;
	const container = document.querySelector('.container');
	const weatherBox = document.querySelector('.weatherbox');
	const weatherDetails = document.querySelector('.weather_details');
	const error404 = document.querySelector('.not-found');


	if (city === '') return;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
		.then(response => response.json())
		.then(json => {
			const image = document.querySelector('.weatherbox img');
			const temperature = document.querySelector('.weatherbox .temperature');
			const description = document.querySelector('.weatherbox .description');
			const humidity = document.querySelector('.weather_details .humidity span');
			const wind = document.querySelector('.weather_details .wind span');
			const body =document.querySelector('body');

			if(json.cod == '404')
			{
				body.classList=['error'];
				container.style.height = '400px';
				weatherBox.classList.remove('active');
				weatherDetails.classList.remove('active');
				error404.classList.add('active');
				return;
			}
			container.style.height = '555px';
			weatherBox.classList.add('active');
			weatherDetails.classList.add('active');
			error404.classList.remove('active');

			switch (json.weather[0].main) {
				case 'Clear':
					image.src = 'img/clear.png';
					body.classList=['clear'];
					break;
				case 'Rain':
					image.src = 'img/rain.png';
					body.classList=['rain'];
					break;
				case 'Snow':
					image.src = 'img/snow.png';
					body.classList=['snow'];
					break;
				case 'Clouds':
					image.src = 'img/cloudy.png';
					body.classList=['cloudy'];
					break;
				case 'Mist':
				case 'Haze':
					image.src = 'img/mist.png';
					body.classList=['mist'];
					break;
				default:
					body.classList='';
					image.src = 'img/search.png';
			}

			temperature.innerHTML = `${json.main.temp}°C`; 
			description.innerHTML = json.weather[0].description; 
			humidity.innerHTML = `${json.main.humidity}%`;

			wind.innerHTML = json.wind.speed;
		});
}