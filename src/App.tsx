import { useState } from "react";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import Home from "./paginas/home/Home";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
