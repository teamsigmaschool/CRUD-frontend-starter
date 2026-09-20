import { useEffect, useState } from "react";

// Replace these URLs with your own API endpoints
const API = {
  recipes: "https://your-api.com/recipes",
  recipeById: "https://your-api.com/recipes/1",
  createRecipe: "https://your-api.com/recipes",

  users: "https://your-api.com/users",
  createUser: "https://your-api.com/users",

  categories: "https://your-api.com/categories",
};

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(API.recipes)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <section>
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <article key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <small>
            Author: {recipe.author} | Category: {recipe.category}
          </small>
        </article>
      ))}
    </section>
  );
}

function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(API.createRecipe, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ingredients,
        instructions,
      }),
    });

    setName("");
    setIngredients("");
    setInstructions("");

    alert("Recipe added!");
  }

  return (
    <section>
      <h2>Add Recipe</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Recipe name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
        />

        <button type="submit">Add Recipe</button>
      </form>
    </section>
  );
}

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API.users)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <section>
      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </section>
  );
}

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(API.createUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    setName("");
    setEmail("");

    alert("User added!");
  }

  return (
    <section>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Add User</button>
      </form>
    </section>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(API.categories)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section>
      <h2>Categories</h2>

      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>KitchenBase</h1>
      <p>A simple recipe collection.</p>

      <Recipes />
      <AddRecipe />

      <Users />
      <AddUser />

      <Categories />
    </main>
  );
}

export default App;
