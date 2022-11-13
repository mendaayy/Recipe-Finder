const form = document.querySelector("form");
const recipeBox = document.querySelector(".recipeBox");
const noRecipeBox = document.querySelector(".noRecipeBox");
const searchBar = document.getElementById("input");
const filterButtons = document.querySelector(".filterButtons");

//edamam API account info
const id = "be1d0e5f";
const key = "8a59033a24964f5cffe45fb6c93ce6e8";

/**
 * [searched item]
 * @type {String} search
 */
let search = "";

/**
 * Listen to submit event
 *
 * @type {element} - the target of the event
 * @listens document#submit - the namespace and name of the event
 */

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search = event.target.querySelector("input").value;
  
  /**
   * This fetch method is used to request data/recipes from the api database Edamam and to display them
   *  
   * @param  {string} the URL to which the request is to be made
   * @return {object} the display of the response
   */
  
  fetch(`https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${key}&from=0&to=20`)
  .then((response) => response.json())
  .then((data) => {
    // well results from the JSON response -> display the items/data
    if (data.count != 0) {
      recipeBox.innerHTML = getRecipes(data.hits);
      console.log(data);

      const filterAll = document.querySelector("#filter-all");
      const filterBreakfast = document.querySelector("#filter-breakfast");
      const filterLunchDinner = document.querySelector("#filter-lunchDinner");
      const filterSnack = document.querySelector("#filter-snack");


      // show filter buttons
      filterButtons.style.display = "block";
      filterAll.classList.remove("filterBtn");
      filterAll.classList.add("active");
      filterBreakfast.classList.add("filterBtn");
      filterLunchDinner.classList.add("filterBtn");
      filterSnack.classList.add("filterBtn");

      // buttons = clicked -> call functions and  add/remove class
      filterAll.addEventListener('click', (event) => {
        recipeBox.innerHTML = getRecipes(data.hits);
        filterAll.classList.remove("filterBtn");
        filterAll.classList.add("active");
        filterBreakfast.classList.add("filterBtn");
        filterLunchDinner.classList.add("filterBtn");
        filterSnack.classList.add("filterBtn");
      });

      filterBreakfast.addEventListener('click', (event) => {
        recipeBox.innerHTML = filter(data.hits, 'breakfast');
        filterBreakfast.classList.remove("filterBtn");
        filterBreakfast.classList.add("active");
        filterAll.classList.add("filterBtn");
        filterLunchDinner.classList.add("filterBtn");
        filterSnack.classList.add("filterBtn");
      });

      filterLunchDinner.addEventListener('click', (event) => {
        recipeBox.innerHTML = filter(data.hits, 'lunch/dinner');
        filterLunchDinner.classList.remove("filterBtn");
        filterLunchDinner.classList.add("active");
        filterBreakfast.classList.add("filterBtn");
        filterAll.classList.add("filterBtn");
        filterSnack.classList.add("filterBtn");
      });

      filterSnack.addEventListener('click', (event) => {
        recipeBox.innerHTML = filter(data.hits, 'snack');
        filterSnack.classList.remove("filterBtn");
        filterSnack.classList.add("active");
        filterBreakfast.classList.add("filterBtn");
        filterLunchDinner.classList.add("filterBtn");
        filterAll.classList.add("filterBtn");
      });

    } else {
    // no results -> call function
      noRecipes();
    }
  })
  // error handling
  .catch((err) => {
      console.log('error: ' + err);
  });
});

/**
 * Get all recipes array of objects
 * 
 * @param  {object} results - the JSON promise
 * @return {object} returns the JSON array of objects
 */

const getRecipes = (results) => {
  const recipes = results
  // iterate over the results
  .map((result) => 
    `
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
  ).join("\n");

  return recipes; 
};

/**
 * This function get recipes array of objects based on mealtype
 * 
 * @param  {object} results - the JSON promise
 * @param  {string} mealtype - this could be either breakfast, lunch/dinner or snacks
 * @return {object} returns the JSON array of objects
*/

function filter(results, mealtype) {
  const recipes = results
  .filter(result => result.recipe.mealType.includes(mealtype))
  // iterate over the results
  .map((result) => 
    `
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
  ).join("\n");

  let display = "";

  // if array is empty
  if (!recipes.length){
    display +=
    `
      <h2>No recipes found</h2>
    `
    noRecipeBox.innerHTML = display;
  }

  return recipes;
}


searchBar.style.setProperty("--change", "rgb(127 127 127)");

/**
 * This function changes the input's placeholder and color when there's no result
 * 
 * @return {element} - returns the element that has the ID attribute "input"
 */

function noRecipes() {
  searchBar.value = "";
  searchBar.placeholder = "No recipes found";
  searchBar.style.setProperty("--change", "#cd1b1b");
};


