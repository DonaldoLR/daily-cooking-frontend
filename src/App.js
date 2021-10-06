import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipeGridDisplay from "./components/RecipesGridDisplay";

function App() {
	// const BASE_URL = process.env.REACT_APP_BASE_URL;

	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/recipes'>
						<RecipeGridDisplay />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
