import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Add from "./Pages/Add";
 import Edit from "./Pages/Edite";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
     <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;
