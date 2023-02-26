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
                    <div class="flex justify-start space-x-2 pt-2">
                        <button onclick="loadMealDetail(${meal.idMeal})"
                            type="button"
                            class="inline-block rounded bg-primary px-6 pt-2.5 pb-2 bg-[#FFC107]
                            text-xs font-medium leading-normal text-black 
                            shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out 
                            hover:bg-amber-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                            focus:bg-amber-400 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                            data-te-toggle="modal"
                            data-te-target="#staticBackdrop"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `

        // step-4: appendChild
        mealsContainer.appendChild(mealDiv);

    })
    document.getElementById("show-all").style.visibility = 'visible';
}

// async await
const loadMealDetail = async(idMeal) => {
    console.log(idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error)
    }
}

const displayMealDetails = (meal) => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealsDetails = document.getElementById('mealDetailsBody');
    mealsDetails.innerHTML = `
        <img class="object-cover" src="${meal.strMealThumb}">
    `
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