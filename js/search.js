import { 
  filter,
  listenFilter 
} from './filter.js';

const form = document.querySelector("form");
const searchBar = document.getElementById("input");

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

      localStorage.setItem("data", JSON.stringify(data.hits));

      const recipeBox = document.querySelector(".recipeBox");

      recipeBox.innerHTML = getRecipes(data.hits);
      console.log(data.hits.length);

      listenFilter();

    } else if (search === "") {
      noInput();
    } else {
    // no results -> call function
      noRecipes();
    }
    
  })
  // error handling
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

function noInput() {
  searchBar.placeholder = "Please fill in this field";
  searchBar.style.setProperty("--change", "#cd1b1b");
};


export {
  getRecipes
}