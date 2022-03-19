async function mainEvent() { // the async keyword means we can make API requests
    const form = document.querySelector('.main-form');
    const submit = document.querySelector('.submit');
  
    const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  
    if (arrayFromJson.data.length > 0) {
      console.log(arrayFromJson.data);
      form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
        submitEvent.preventDefault(); // This prevents your page from refreshing!
        console.log('form submission'); 
        submit.style.display = 'block';
        dataHandler(arrayFromJson.data);
      });
    }
  }
  
  const dataHandler = (data) => {
    console.log('dataHandler');
    const randIntInclusive = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };
    const range = [ ... Array(15).keys() ];
    const restList = document.querySelector('.resto-list');
    const restElement = document.querySelectorAll('.resto-element');
    restElement.forEach(element => {
      element.remove();
    });
  
  
    range.forEach((i) => {
      const randomIndex = randIntInclusive(0, data.length - 1);
      const randomItem = data[randomIndex];
      const newItem = document.createElement('li');
      // Add class name to newItem
      newItem.className = 'resto-element';
      newItem.innerHTML = `
        <li>
          <h3>${randomItem.name}</h3>
        </li>
      `;
      restList.appendChild(newItem);
    });
  
  }
  
  // this actually runs first! It's calling the function above
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  