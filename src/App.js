import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	return <div className='App'>{BASE_URL}</div>;
}

export default App;
