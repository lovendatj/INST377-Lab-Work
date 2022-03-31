async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main-form');
  const submit = document.querySelector('.submit');
  const restoInput = document.querySelector('#resto_name');
  const zipInput = document.querySelector('#zipcode');
  const map = L.map('map').setView([40.730610, -73.935242], 13);

  L.tileLayer('https://api.tile.openstreetmap.org/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  let arrayFromJson = await results.json(); // This changes it into data we can use - an object
  
  if (arrayFromJson.data.length > 0) {
    let currentArray = [];

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      submit.style.display = 'block';
      currentArray = randomData(arrayFromJson.data);
      createHTMLList(currentArray);
    });

    restoInput.addEventListener('input', async (inputEvent) => {
      if (currentArray.length < 1) { return; }
      inputEvent.preventDefault();
      const input = inputEvent.target.value;
      const filteredArray = currentArray.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
      createHTMLList(filteredArray);
    });

    zipInput.addEventListener('input', async (inputEvent) => {
      if (currentArray.length < 1) { return; }
      inputEvent.preventDefault();
      const input = inputEvent.target.value;
      const filteredArray = currentArray.filter(item => item.zip.includes(input));
      createHTMLList(filteredArray);
    });
  }
}

const createHTMLList = (data) => {
  const restList = document.querySelector('.resto-list');
  const restElement = document.querySelectorAll('.resto-element');

  
  restElement.forEach(element => {
    element.remove();
  });

  data.forEach(item => {
    const newItem = document.createElement('li');
    // Add class name to newItem
    newItem.className = 'resto-element';
    newItem.innerHTML = `
      <li>
        <h3>${item.name}</h3>
      </li>
    `;
    restList.appendChild(newItem);
  });
}

const randomData = (data) => {
  const randIntInclusive = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };
  const range = [ ... Array(15).keys() ];
  const randomItem = [];
  range.forEach(item => {
    randomItem.push(data[randIntInclusive(0, data.length - 1)]);
  });
  return randomItem;
};

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
