import MainWindow from "./Windows/mainWindow/mainWindow";
import QueryWindow from "./Windows/queryWindow/queryWindow";
import AddWindow from "./Windows/addWindow/addWindow";
import DeleteWindow from "./Windows/deleteWindow/deleteWindow";
import ChangeWindow from "./Windows/changeWindow/changeWindow";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div className="pagina">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/mainWindow" />} />
          <Route path="/mainWindow" element={<MainWindow />} />
          <Route path="/queryWindow" element={<QueryWindow />} />
          <Route path="/addWindow" element={<AddWindow />} />
          <Route path="/deleteWindow" element={<DeleteWindow />} />
          <Route path="/changeWindow" element={<ChangeWindow />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
