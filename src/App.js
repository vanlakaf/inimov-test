import "./assets/style/index.css";
import routes from "./routes";
import Navigation from "./tools/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div id="body-app">
        <Navigation routes={routes} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
