import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from "./components/Sidebar";
import MapView from "./pages/MapView";
import FarmerManagement from "./pages/FarmerManagement";



function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/map" element={<MapView />} />
            <Route path="/farmers" element={<FarmerManagement />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
