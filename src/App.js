import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipesContainer from "./components/RecipesContainer";

function App() {
	// const BASE_URL = process.env.REACT_APP_BASE_URL;

	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/recipes'>
						<RecipesContainer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
