// get all data and pass only some data using slice to show in the UI
const loadFood = async () => {
    url = "https://www.themealdb.com/api/json/v1/1/search.php?f=e";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayMeals(data.meals.slice(0, 6));
};
loadFood();

const displayMeals = (meals) =>{
    console.log(meals);
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';
    meals.forEach(meal => {
        console.log(meal)
        // step 2: create child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step-3 set content of the child
        mealDiv.innerHTML = `
        <div class="flex justify-center">
            <div class="flex flex-col rounded-lg bg-white shadow-lgmd:max-w-xl md:flex-row">
                <img
                class="h-5 w-10  rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src="${meal.strMealThumb}" alt="" />
                <div class="flex flex-col justify-start p-6">
                    <h5
                        class="mb-2 text-xl font-medium text-neutral-800 ">
                        ${meal.strMeal}
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 ">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    <p class="text-normal py-2 text-neutral-500"> Category:
                    ${meal.strCategory}
                    </p>
                    <p class="text-normal text-neutral-500 "> Area: 
                    ${meal.strArea}
                    </p>
                </div>
            </div>
        </div>
        `

        // step-4: appendChild
        mealsContainer.appendChild(mealDiv);

    })
    document.getElementById("show-all").style.visibility = 'visible';
}

const loadAllFood = async () => {
    url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.categories);
    displayAllMeals(data.categories);
};

const displayAllMeals = (meals) =>{
    console.log(meals);
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';
    meals.forEach(meal => {
        console.log(meal)
        // step 2: create child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step-3 set content of the child
        mealDiv.innerHTML = `
        <div class="flex justify-center">
            <div class="flex flex-col rounded-lg bg-white shadow-lgmd:max-w-xl md:flex-row">
                <img
                class="h-5 w-10  rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src="${meal.strCategoryThumb}" alt="" />
                <div class="flex flex-col justify-start p-6">
                    <h5
                        class="mb-2 text-xl font-medium text-neutral-800 ">
                        ${meal.strCategory}
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 ">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    <p class="text-normal py-2 text-neutral-500"> Category:
                    ${meal.strCategory}
                    </p>
                    <p class="text-normal text-neutral-500 "> Area: 
                    ${meal.strArea}
                    </p>
                </div>
            </div>
        </div>
        `

        // step-4: appendChild
        mealsContainer.appendChild(mealDiv);

    })
}

// show all data
document.getElementById("show-all").addEventListener("click", function () {
    loadAllFood();
    document.getElementById("show-all").style.visibility = 'hidden';
});

const loadSearchFood = async(searchText) => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
};
// search data
document.getElementById("btn-search").addEventListener("click", function () {
    const text = document.getElementById("search-text").value;
    loadSearchFood(text);
});