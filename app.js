const container = document.querySelector(".container");
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
let searchQuery = "";
const APP_ID = "b76e94f6";
const APP_key = "7d0534d2aed897b1b1f611c207b688ee";


//---------------------searching---------------------------//

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      searchQuery = e.target.querySelector("input").value;
      fetchAPI();
   });

 //---------------------------api key-------------------------//
  
   async function fetchAPI() {
    const URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=60`;
    const response = await fetch(URL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
  }

  //----------------------functionality-----------------------//
  
  
  function generateHTML(results) {
    let generatedHTML = ""
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${ result.recipe.url }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        </div> 
      `
      
    })

    //--------------------result----------------------//
    searchResultDiv.innerHTML = generatedHTML;
  }