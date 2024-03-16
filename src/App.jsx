import { Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";
import AllEmployee from "./pages/AllEmployee";
import EditEmployee from "./pages/EditEmployee";
import InvetoryManagerHome from "./pages/InventoryManagerHome";
import CreateInventory from "./pages/CreateInventory";
import AllInventories from "./pages/AllInventories";
import EditInventories from "./pages/EditInventories";
import CreateSupplier from "./pages/CreateSupplier";
import SupplierManagerHome from "./pages/SupplierManagerHome";
import AllSuppliers from "./pages/AllSuppliers";
import EditSupplier from "./pages/EditSupplier";
import DeliveryManagerHome from "./pages/DeliveryManagerHome";
import CreateDelivery from "./pages/CreateDelivery";
import AllDeliveries from "./pages/AllDeliveries";
import EditDeliveries from "./pages/EditDeliveries";
import TransportManagerHome from "./pages/TransportManagerHome";
import CreateTransport from "./pages/CreateTransport";
import AllTransports from "./pages/AllTransports";
import EditTransports from "./pages/EditTransports";
import ProductManagerHome from "./pages/ProductManagerHome";
import CreateProduct from "./pages/CreateProduct";
import AllProducts from "./pages/AllProducts";
import EditProducts from "./pages/EditProducts";
import PaymentManagerHome from "./pages/PaymentManagerHome";
import CreatePayment from "./pages/CreatePayment";
import AllPayments from "./pages/AllPayments";
import EditPayment from "./pages/EditPayment";
import CustomerHome from "./pages/CustomerHome";
import CustomerManagerHome from "./pages/CustomerManagerHome";

const App = () => {
  return (
    <ToastContextProvider>
  <AuthContextProvider>
  <Layout>
    <Switch>
      <Route path="/employee-manager" element={<Home></Home>} />
      <Route path="/inventory-manager" element={<InvetoryManagerHome></InvetoryManagerHome>}/>
      <Route path="/supplier-manager" element={<SupplierManagerHome></SupplierManagerHome>}/>
      <Route path="/delivery-manager" element={<DeliveryManagerHome></DeliveryManagerHome>}/>
      <Route path="/transport-manager" element={<TransportManagerHome></TransportManagerHome>}/>
      <Route path="/product-manager" element={<ProductManagerHome></ProductManagerHome>}/>
      <Route path="/payment-manager" element={<PaymentManagerHome></PaymentManagerHome>}/>
      <Route path="/customer" element={<CustomerHome></CustomerHome>}/>
      <Route path="/customer-manager" element={<CustomerManagerHome></CustomerManagerHome>}/>

      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/create" element={<CreateEmployee></CreateEmployee>} />
      <Route path="/allemployees" element={<AllEmployee></AllEmployee>} />
      <Route path="/edit/:id" element={<EditEmployee></EditEmployee>} />
      <Route path="/createinventory" element={<CreateInventory></CreateInventory>}/>
      <Route path="/allinventories" element={<AllInventories></AllInventories>}/>
      <Route path ="/editinvenory:id" element={<EditInventories></EditInventories>}/>
      <Route path ="/createsuppliers" element={<CreateSupplier></CreateSupplier>}/>
      <Route path="/allsuppliers" element={<AllSuppliers></AllSuppliers>}/>
      <Route path="/editsupplier:id" element={<EditSupplier></EditSupplier>}/>
      <Route path="/createdeliveries" element={<CreateDelivery></CreateDelivery>}/>
      <Route path="/alldeliveries" element={<AllDeliveries></AllDeliveries>}/>
      <Route path="/editdeliveries:id" element={<EditDeliveries></EditDeliveries>}/>
      <Route path="/createtransports" element={<CreateTransport></CreateTransport>}/>
      <Route path="/alltransports" element={<AllTransports></AllTransports>}/>
      <Route path="/edittransports:id" element={<EditTransports></EditTransports>}/>
      <Route path="/createproducts" element={<CreateProduct></CreateProduct>}/>
      <Route path="/allproducts" element={<AllProducts></AllProducts>}/>
      <Route path="/editproducts:id" element={<EditProducts></EditProducts>}/>
      <Route path="/createpayment" element={<CreatePayment></CreatePayment>}/>
      <Route path="/allpayment" element={<AllPayments></AllPayments>}/>
      <Route path="editpayments:id" element={<EditPayment></EditPayment>}/>

       


    </Switch>
  </Layout>
  </AuthContextProvider>
  </ToastContextProvider>
  )
};

export default App;