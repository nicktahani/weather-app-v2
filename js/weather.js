
/*

TODO:

Convert to react app: https://github.com/nicktahani/weather-app-v3
Better organization -- remove onclicks in html (replace with event listeners)

*/

function getNewLocation() {
  //get user-specified location from search box
  let location = document.getElementById('zipbox').value

  if (!location) {
    location = 'san francisco,us'
  }

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&APPID=26c157eab6caa2265bab9800960adaf9`

  fetch(url)
    .then(async response => {
        if (!response.ok) {
          return Promise.reject(`Looks like there was a problem. Status Code: ${response.status}`)
        }
        // get the response
        return await response.json()
      }
    )
    .then(go)
    .catch(err => {
      console.error(`Fetch Error: ${err}`);
    })
}

function go(data) {
  // console.log(data)

  // TODO error-check the data here (e.g. misspelled query)
  const forecastList = data.list
    // console.log(forecastList)
  const temperature = forecastList.slice(0, 5).map(temps => temps.main.temp)

  console.log(temperature)

  const currDate = forecastList[0].dt_txt
  document.querySelector('#topImage').textContent = currDate

  const currTemp = Math.ceil(forecastList[0].main.temp) 
  document.querySelector('#cityTemp').innerHTML = `${currTemp}&#xb0;F`

  const city = data.city.name
  const country = data.city.country
  document.querySelector('#cityName').textContent = `${city}, ${country}`

  const tempDesc = forecastList[0].weather[0].main
  document.querySelector('#cityDesc').textContent = tempDesc

  document.getElementById('weatherBox').textContent = ''

  //generate test cards to see how they look 
  for (let i = 0; i < 5; i++) {
    weatherCard(`${i}`, 'Mon', 'Sunny', '30/20')
  }
}

function weatherCard(idNum, day, cond, hilow) {
  const parentDiv = document.getElementById('weatherBox')

  const mydiv = document.createElement('div')
  mydiv.id = `card${idNum}`

  const dayDiv = document.createElement('div')
  dayDiv.id = `fday${idNum}`
  const d = document.createTextNode(day)
  dayDiv.appendChild(d)
  mydiv.appendChild(dayDiv)


  const condDiv = document.createElement('div')
  condDiv.id = `fcond${idNum}`
  const c = document.createTextNode(cond)
  condDiv.appendChild(c)
  mydiv.appendChild(condDiv)

  const hilowDiv = document.createElement('div')
  hilowDiv.id = `fhilow${idNum}`
  const hl = document.createTextNode(hilow)
  hilowDiv.appendChild(hl)
  mydiv.appendChild(hilowDiv)

  parentDiv.appendChild(mydiv)
}

document.getElementById('submit')
  .addEventListener('click', getNewLocation)



