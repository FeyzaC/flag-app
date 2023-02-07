url = "https://restcountries.com/v3/all";

window.addEventListener("load", () => {
  getUrl();
});

let getCountry = [];

const getUrl = async function () {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${res.status}`);
    }
    const data = await response.json();
    rendernew(data);
  } catch {
    renderError(err);
  }
};

const renderError = (err) => {
  const h1 = document.querySelector("h1");
  h1.innerText = `<h3>${err}</h3>`;
};

const rendernew = function (data) {
  const countryName = data.forEach((e) => {
    const { common } = e.name;
    const listOne = document.getElementById("list_one");
    listOne.innerHTML += `<option value="${common}">${common}</option>`;
    getCountry = data;
  });
};

document.getElementById("input").addEventListener("change", () => {
  const inputValue = document.getElementById("input").value;
  if (inputValue) {
    const selectedCountry = getCountry.filter(
      (e) => e.name.common === inputValue
    );
    renderCountry(selectedCountry[0]);
  }
});

const renderCountry = (c) => {
  const {
    name: { common },
    region,
    languages,
    currencies,
    population,
    borders,
    maps,
    capital,
  } = c;
  const countries = document.querySelector(".countries");
  countries.innerHTML = `
    <div class="card" >
<img src=" ${c.flags[1]}" class="imgClass" alt="flag" />
<div><h5 class="">${common}</h5></div>
<p><i class="fa-solid fa-earth-oceania"></i> Region:${region}</p>
<p> <i class="fas fa-lg fa-landmark"></i>Capitals:${capital}</p>
<p>  <i class="fas fa-lg fa-comments"></i>Languages:${Object.values(
    languages
  )}</p>
<p>  <i class="fas fa-lg fa-money-bill-wave"></i> Currencies:${
    Object.values(currencies)[0].name
  },${Object.values(currencies)[0].symbol}</p>
<p> <i class="fa-solid fa-people-group"></i></i>Population:${population.toLocaleString(
    "en-US"
  )}</p>
<p>  <i class="fa-sharp fa-solid fa-road-barrier"></i>Borders:${
    borders ? borders : "None"
  }</p>
<p><i class="fa-solid fa-map-location-dot"></i>Map:<a href=${
    maps.googleMaps
  } target='_blank'> Go to google map</a></p></div>
    `;
};
