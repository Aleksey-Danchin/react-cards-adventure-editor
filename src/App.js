import { Card, Location, Side } from "./components";

const App = () => {
	return (
		<Location onAdd={() => console.log("onAdd")}>
			<Card front={<Side />} back={<Side />} />
			<Card front={<Side />} back={<Side />} />
			<Card front={<Side />} back={<Side />} />
		</Location>
	);
};

export default App;
