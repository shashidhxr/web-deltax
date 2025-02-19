import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import DashboardLayout from "./components/DashboardLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        } />
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
