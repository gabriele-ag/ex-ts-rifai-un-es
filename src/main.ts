
type RecipeData = {
  readonly id: number
  readonly name: string
  cuisine: string
  difficulty: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  caloriesPerServing: number
  rating: number
  reviewCount: number
  mealType: string[]
}

type ChefData = {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  address: {
    address: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
    state: string
  }
}



async function getChefBirthday(id: number): Promise<string | null> {

  try {
    // Recupero la ricetta
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
    const recipe: RecipeData = await recipeResponse.json()

    // Recupero lo chef
    const chefResponse = await fetch(`https://dummyjson.com/users/${recipe.id}`)
    const chef: ChefData = await chefResponse.json()

    if(!recipeResponse.ok || !chefResponse.ok) {
      throw new Error("Errore nella risposta")
    }

    console.log(recipe)
    console.log(chef)
    
    return chef.birthDate || null
  } catch(error) {
    throw new Error ("Impossibile recuperare i dati")
  }

}

getChefBirthday(1)
.then(birthday => console.log("Data di nascita:", birthday))
.catch(err => console.log("Errore:", err.message))