import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import DashboardLayout from "./components/DashboardLayout";
import CreateAPI from "./pages/create";
import APIDetails from "./pages/APIDetails";
import Auth from "./pages/auth";
import RateLimit from "./pages/rateLimit";
import LoadBalance from "./pages/loadBalance";
import Settings from "./pages/settings";
import Security from "./pages/security";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <DashboardLayout>
              <CreateAPI />
            </DashboardLayout>
          }
        ></Route>
        <Route
          path="/api/:id"
          element={
            <DashboardLayout>
              <APIDetails />
            </DashboardLayout>
          }
        ></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path="/ratelimit" element={<RateLimit/>}></Route>
        <Route path="/loadbalancing" element={<LoadBalance/>}></Route>
        <Route path="/security" element={<Security/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
