import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

  function displayCocktail(data) {

    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById("cocktail"); 
    const wrapperdiv = document.getElementsByClassName("section dynamic-container");
    // cocktail name
    const cocktailName = cocktail.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading);
   
    // cocktail image
    const cocktailImg = document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    //document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
    
    // coctail ingredients
    const cocktailIngredients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);
  
    const getIngredients = Object.keys(cocktail)
      .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
      })
      .reduce(function (ingredients, ingredient) {
        if (cocktail[ingredient] != null) {
          ingredients[ingredient] = cocktail[ingredient];
        }
        return ingredients;
      }, {});
  
    for (let key in getIngredients) {
      let value = getIngredients[key];
     let  listItem = document.createElement("li");
      listItem.innerHTML = value;
      cocktailIngredients.appendChild(listItem);
    }
    
  
  }

export default function decorate(block) {
  /* change to Div , a */
  const teasergriddiv = document.createElement('div');
  teasergriddiv.className='test';
  teasergriddiv.id='cocktail';
  const overlaydiv = document.createElement('div');
  overlaydiv.id='overlay';
  block.append(teasergriddiv);
  //block.append(overlaydiv);

  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayCocktail(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));


  
}




