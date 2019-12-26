/*

TO DO:

better organization -- split up into multiple functions, remove onclicks in html (replace with event lisenters), look in to fetch api 

*/

function getNewLocation() {

  //const request = new XMLHttpRequest()

  //get user-specified location from search box
  const location = document.getElementById('zipbox').value

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&APPID=26c157eab6caa2265bab9800960adaf9`

  fetch(url)
	  .then((response) => {
	      if (response.status !== 200) {
	        console.log(`Looks like there was a problem. Status Code: ${response.status}`)
	        return
	      }

	      // Examine the text in the response
	      response.json().then(go)
	    }
	  )
	  .catch((err) => {
	    console.log(`Fetch Error ${err}`);
	  })

function go(data) {
	console.log(data)

	const date = data.list[1].dt_txt
	document.querySelector('#topImage').textContent = date

	const temp = Math.ceil(data.list[1].main.temp) 
	const t = temp + "&#xb0;F"
	document.querySelector('#cityTemp').innerHTML = t

	const city = data.city.name
	document.querySelector('#cityName').textContent = city

	const tempDesc = data.list[1].weather[0].main
	document.querySelector('#cityDesc').textContent = tempDesc
}

// .then(go)

// const go = (data) => {

// }
  /*
  request.open('GET', url, true)

  request.onload = function() {
  	// console.log(this.response)
 
  	const data = JSON.parse(this.response)

  	// show some stuff on the frontend
  	const date = data.list[1].dt_txt
  	document.querySelector('#topImage').textContent = date

  	const temp = Math.ceil(data.list[1].main.temp) 
  	document.querySelector('#cityTemp').textContent = temp

  	const city = data.city.name
  	document.querySelector('#cityName').textContent = city

  	const tempDesc = data.list[1].weather[0].main
  	document.querySelector('#cityDesc').textContent = tempDesc


  	// console.log(data.list[1].dt_txt)

		for(const k in data) {
			// alert(k)
			// if (k == 'list') {
				switch(k) {
				case 'main':
					console.log(data[k].temp)
					break
				case 'wind':
				   console.log(data[k].speed)
					break
				// case 'dt_txt':
				// 	const dateTime = data[k].dt_txt.split(' ')
				// 	const date = dateTime[0]
				// 	const time = dateTime[1]
					// console.log(date + ' ' + time)
				default:
					break
			}
		// }
		}
	}

  request.send()
*/

}

document.getElementById('submit').addEventListener('click', getNewLocation)

