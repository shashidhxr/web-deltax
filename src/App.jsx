import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import DashboardLayout from "./components/DashboardLayout";
import CreateAPI from "./pages/create";
import APIDetails from "./pages/APIDetails";
import Auth from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
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
        />
        <Route path="/auth" element={<Auth></Auth>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
