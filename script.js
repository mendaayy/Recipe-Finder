const form = document.querySelector("form");
const recipeBox = document.querySelector(".recipeBox");

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
   * This fetch method is used to request data/recipes from the api database Edamam
   *  
   * @param  {string} the URL to which the request is to be made
   * @return {object} returns a JSON promise if succeeds
   */
  
  fetch(`https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${key}&from=0&to=20`)
  .then(function (response) {
      // parse the response as JSON
      return response.json(); 
  })
  .then(function (data) {
    // there are results from the JSON response, so display the items/data
    if (data.count != 0) {
      display(data.hits);
      console.log(data);
    } else {
    // no results, then call function
      noResults();
    }
  })
  // error handling
  .catch(function (err) {
      console.log('error: ' + err);
  });
});

/**
 *  This function upload/display the search results
 *  
 * @param  {object} results - the JSON response/results
 * @return {object} the display of the response
 */

function display(results) {
  let display = "";

  // returns array when done iterating over the results
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
  
  // display the result of mapping 
  recipeBox.innerHTML = display;
}

/**
 * @return {element} - returns the element that has the ID attribute "input"
 */
function noResults() {
  document.getElementById("input").value = "";
  document.getElementById("input").placeholder = "No recipes found";
  document.getElementById("input").style.setProperty("--change", "#cd1b1b");
}
