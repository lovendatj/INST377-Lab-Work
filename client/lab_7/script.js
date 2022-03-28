async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main-form');
  const submit = document.querySelector('.submit');
  const restoInput = document.querySelector('#resto_name');
  const zipInput = document.querySelector('#zipcode');

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
