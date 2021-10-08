import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditRecipeForm from "./components/EditRecipeForm";
import Navigation from "./components/Navigation";
import NewRecipeForm from "./components/NewRecipeForm";
import RecipePage from "./components/RecipePage";
import RecipeGridDisplay from "./components/RecipesGridDisplay";

function App() {
	// const BASE_URL = process.env.REACT_APP_BASE_URL;

	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/'>
						<RecipeGridDisplay />
					</Route>
					<Route exact path='/recipes/new'>
						<NewRecipeForm />
					</Route>
					<Route exact path='/recipes/:id/edit'>
						<EditRecipeForm />
					</Route>
					<Route exact path='/recipes/:id'>
						<RecipePage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
