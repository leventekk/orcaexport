import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";

function App() {
	return (
		<div className="container">
			<Header />

			<main>
				<Home />
				<Toaster position="bottom-right" />
			</main>
		</div>
	);
}

export default App;
