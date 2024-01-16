import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Add from "./Pages/Add";
import InterfaceEdit from "./Pages/InterfaceEdit";
import LinedPaperEdit from "./Pages/LinedPaperEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/interface/:id" element={<InterfaceEdit />} />
        <Route path="/edit/linedpaper/:id" element={<LinedPaperEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
