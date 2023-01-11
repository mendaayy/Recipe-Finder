import { 
  getRecipes 
} from './search.js';

function listenFilter() {
  const filterButtons = document.querySelector(".filterButtons");
  // show filter buttons
  filterButtons.style.display = "block";

  let filterBtn = filterButtons.getElementsByClassName("filterBtn");

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function() {

      // add active class to the current filter button 
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active"; 

      const data = JSON.parse(localStorage.getItem("data"));
      const recipeBox = document.querySelector(".recipeBox");

      // display data based on filter
      if (filterBtn[i].value === '') {
        recipeBox.innerHTML = getRecipes(data);
      } else {

        recipeBox.innerHTML = filter(data, filterBtn[i].value);
      }
    });
  }
}

/**
 * This function get recipes array of objects based on mealtype
 * 
 * @param  {object} results - the JSON promise
 * @param  {string} mealtype - this could be either breakfast, lunch/dinner or snacks
 * @return {object} returns the JSON array of objects
*/

function filter(results, mealtype) {
  console.log(mealtype)
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

  //console.log(recipes.length)
  // if array is empty
  if (!recipes.length){
    display +=
    `
      <h2>No recipes found</h2>
    `
    const noRecipeBox = document.querySelector(".noRecipeBox");

    noRecipeBox.innerHTML = display;
  }

  return recipes;
}

export { 
  listenFilter,
  filter
};
