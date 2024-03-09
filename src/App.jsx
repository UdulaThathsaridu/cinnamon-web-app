import { Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";

const App = () => {
  return (
    <ToastContextProvider>
  <AuthContextProvider>
  <Layout>
    <Switch>
      <Route path="/" element={<Home></Home>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/create" element={<CreateEmployee></CreateEmployee>} />
    </Switch>
  </Layout>
  </AuthContextProvider>
  </ToastContextProvider>
  )
};

export default App;