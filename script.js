const form = document.querySelector("form");
const recipeBox = document.querySelector(".recipeBox");
const container = document.querySelector(".container");

//edamam account info
const id = "be1d0e5f";
const key = "8a59033a24964f5cffe45fb6c93ce6e8";

let search = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search = event.target.querySelector("input").value;
  
  fetch(`https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${key}&from=0&to=20`)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    if (data.count != 0) {
      display(data.hits);
      console.log(data);
    } else {
      noDisplay();
    }
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });
  
});

function display(results) {
  let display = "";

  results.map((result) => {
    display += `
      <div class="recipe">

        <a href="${result.recipe.url}">
          <img src="${result.recipe.image}" alt="img">

          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
          </div>

          <div class="row">
            <div class="col">
              <p class="cal">${result.recipe.calories.toFixed(0)} cal</p>
            </div>

            <div class="col">
              <ul class="data">
                <li class="protein">Protein <span>${result.recipe.totalNutrients.PROCNT.quantity.toFixed(0)} g</span></li>
                <li class="fat">Fat <span>${result.recipe.totalNutrients.FAT.quantity.toFixed(0)} g</span></li>
                <li class="carb">Carb <span>${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(0)} g</span></li>
              </ul>
            </div>
          </div>
        </a>

      </div>
    `
  });
  
  recipeBox.innerHTML = display;
}

function noDisplay() {
  document.getElementById("input").value = "";
  document.getElementById("input").placeholder = "No recipes found";
  document.getElementById("input").style.setProperty("--change", "#cd1b1b");
}
