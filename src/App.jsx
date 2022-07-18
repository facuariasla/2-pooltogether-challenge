import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Buy from "./pages/Buy";
import Home from "./pages/Home";
import Payment from "./pages/Payment";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/payment" element={<Payment />} />

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
