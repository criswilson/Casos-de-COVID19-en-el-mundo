const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
let countryE1 = document.querySelector(".js-country");
let confirmedE1 = document.querySelector(".js-confirmed");
let deathsE1 = document.querySelector(".js-deaths");
let recoveredE1 = document.querySelector(".js-recovered");
let activeE1 = document.querySelector(".js-active");
const horror = document.querySelector(".js-horror");
const dataContent = document.querySelector(".js-data");

async function getCases() {
  let country = input.value;
  if (country.length == 0) {
    dataContent.style.display = "none";
    horror.style.display = "block";
    return;
  }
  try {
    const responseData = await fetch(
      `https://api.covid19api.com/total/country/${country}`
    );
    const data = await responseData.json();

    const lastElement = data[data.length - 1];
    console.log(lastElement);
    if (
      (data.message && data.message == "Not Found") ||
      typeof data != "object"
    ) {
      dataContent.style.display = "none";
      horror.style.display = "block";
      console.log("El país ingresdo no existe");
    } else {
      dataContent.style.display = "block";
      horror.style.display = "none";
      input.value = null;
      countryE1.innerHTML = lastElement.Country;
      confirmedE1.innerHTML = lastElement.Confirmed;
      deathsE1.innerHTML = lastElement.Deaths;
      recoveredE1.innerHTML = lastElement.Recovered;
      activeE1.innerHTML = lastElement.Active;
    }
  } catch (error) {
    console.log("Ocurrió un error");
    console.log(error);
  }
}

button.addEventListener("click", getCases);

input.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    return getCases();
  }
});
