import "./App.css";
import Connection from "./Pages/Connection";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productdetails from "./Pages/Productdetails";
import CategorieProduct from "./components/CategorieProduct/CategorieProduct";
import Search from "./Pages/Search";
import More from "./Pages/More";
import Profiles from "./Pages/Profiles";
import Cart from "./Pages/Cart";
import Messages from "./Pages/Messages";
import ProfileComponets from "./Pages/ProfileComponets";
import Admin from "./Pages/Admin";
import MoreComponents from "./Pages/MoreComponents";
import OrderDet from "./components/OrderDet/OrderDet";
import axios from "axios";
import Myorders from "./Pages/Myorders";
import { useState, useEffect } from "react";
import ContactUs from "./components/ContactUs/ContactUs";
import AdminConnection from "./AdminComponents/AdminConnection/AdminConnection";
import "reactjs-popup/dist/index.css";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function App() {
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [acces, setAcces] = useState("oui");
  const [adminConnection, setAdminConnection] = useState(false);

  const changeAdminConnection = () => {
    setAdminConnection(true);
  };

  const changeA = (param) => {
    setAcces(param);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userEcomme"));

    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      axios
        .get(`${BackendUrl}/verify`, { withCredentials: true })
        .then((response) => {
          setAcces("oui");
          // console.log({ local: user.token });
          // console.log(response.data);
        })
        .catch((error) => {
          setAcces("non");
          console.log(error.response);
        });
    }

    const admin = JSON.parse(localStorage.getItem("AdminEcomme"));
    if (admin) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${admin.token}`;
      axios
        .get(`${BackendUrl}/verifyAdmin`, { withCredentials: true })
        .then((response) => {
          setAdminConnection(true);
          // console.log({ local: user.token });
          // console.log(response.data);
          // console.log(response);
        })
        .catch((error) => {
          setAdminConnection(false);
          // console.log(error);
        });
    }

    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((Categories) => {
        setAllCategories(Categories.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/products`)
      .then((Categories) => {
        setAllProducts(Categories.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              acces === "oui" ? (
                <Home allCategories={allCategories} allProducts={allProducts} />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />
          <Route
            path="/Home"
            element={
              acces === "oui" ? (
                <Home allCategories={allCategories} allProducts={allProducts} />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />

          <Route
            path="/ContactUs"
            element={
              acces === "oui" ? <ContactUs /> : <Connection chg={changeA} />
            }
          />

          <Route
            path="/Messages"
            element={
              acces === "oui" ? <Messages /> : <Connection chg={changeA} />
            }
          />
          <Route
            path="/Categories"
            element={
              acces === "oui" ? (
                <Categories allCategories={allCategories} />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />
          <Route
            path="/ProductDet/:id"
            element={
              acces === "oui" ? (
                <Productdetails
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />
          <Route
            path="/Categorie/:Cat"
            element={
              acces === "oui" ? (
                <CategorieProduct
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />
          <Route
            path="/Categorie/:Cat/:product"
            element={
              acces === "oui" ? (
                <CategorieProduct
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          />
          <Route
            path="/Cart"
            element={acces === "oui" ? <Cart /> : <Connection chg={changeA} />}
          ></Route>
          <Route
            path="/More"
            element={acces === "oui" ? <More /> : <Connection chg={changeA} />}
          ></Route>
          <Route
            path="/Search"
            element={
              acces === "oui" ? (
                <Search
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          ></Route>
          <Route
            path="/Profile"
            element={
              acces === "oui" ? <Profiles /> : <Connection chg={changeA} />
            }
          ></Route>
          <Route
            path="/Admin"
            element={
              adminConnection ? (
                <Admin
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <AdminConnection chg={changeAdminConnection} />
              )
            }
          ></Route>
          <Route
            path="/Admin/:op"
            element={
              adminConnection ? (
                <Admin
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <AdminConnection chg={changeAdminConnection} />
              )
            }
          ></Route>
          <Route
            path="/Admin/:op/:id"
            element={
              adminConnection ? (
                <Admin
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <AdminConnection chg={changeAdminConnection} />
              )
            }
          ></Route>
          <Route
            path="/Profile/:op"
            element={
              acces === "oui" ? (
                <ProfileComponets />
              ) : (
                <Connection chg={changeA} />
              )
            }
          ></Route>
          <Route
            path="/More/:op"
            element={
              acces === "oui" ? (
                <MoreComponents />
              ) : (
                <Connection chg={changeA} />
              )
            }
          ></Route>
          <Route
            path="/Order"
            element={
              acces === "oui" ? (
                <Myorders
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          ></Route>
          <Route
            path="/Order/:id"
            element={
              acces === "oui" ? (
                <OrderDet
                  allCategories={allCategories}
                  allProducts={allProducts}
                />
              ) : (
                <Connection chg={changeA} />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
