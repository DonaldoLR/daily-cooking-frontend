import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	return (
		<div className='App'>
			<Navigation />
			{BASE_URL}
		</div>
	);
}

export default App;
