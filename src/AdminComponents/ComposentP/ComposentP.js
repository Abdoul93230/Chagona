import React from "react";
import "./ComposentP.css";
import { Link } from "react-router-dom";
import {
  Home,
  BarChart2,
  MessageSquare,
  Folder,
  Users,
  MessageCircle,
  HelpCircle,
  LogOut,
  Search,
  ChevronDown,
  Bell,
  Menu,
  X,
  Plus,
  Settings,
} from "react-feather";
import AFournisseurUpdate from "../AFournisseurUpdate/AFournisseurUpdate";
import AodersDet from "../AodersDet/AodersDet";
import ACustomerDet from "../ACustomerDet/ACustomerDet";
import AddProductA from "../AddProductA/AddProductA";
import AOrders from "../AOrders/AOrders";
import ACustomers from "../ACustomers/ACustomers";
import Popup from "reactjs-popup";
import image from "../../Images/sac2.png";
import Inbox from "../Inbox/Inbox";
import Analytics from "../Analytics/Analytics";
import Overview from "../Overview/Overview";
import Products from "../Products/Products";
import AProductDet from "../AProductDet/AProductDet";
import AProductUpdat from "../AProductUpdat/AProductUpdat";
import AFournisseurs from "../AFournisseurs/AFournisseurs";
import AFournisseurDet from "../AFournisseurDet/AFournisseurDet";
import AddFournisseur from "../AddFournisseurs/AddFournisseur";
import AddCategorie from "../AddCategorie/AddCategorie";
import ProductPub from "../ProductPub/ProductPub";
import Sellers from "../Sellers/Sellers";
import SellerDet from "../SellerDet/SellerDet";
import { useParams } from "react-router-dom";

const admin = JSON.parse(localStorage.getItem("AdminEcomme"));
function ComposentP({ allCategories, allProducts }) {
  const params = new useParams();
  // console.log(params.op);

  const show = () => {
    const a = document.querySelector(".ComposentP .sidBar .sb").classList;
    if (a.contains("cache")) {
      a.remove("cache");
      a.add("showBar");
    } else {
      a.add("cache");
      a.remove("showBar");
    }
  };

  return (
    <div className="ComposentP">
      <div className="sidBar">
        <div className="sb cache">
          <X
            onClick={show}
            className="show heid style"
            style={{ width: 40, height: 40 }}
          />
          <h2>LOGO</h2>
          <ul>
            <Link to="/Admin" className="li" onClick={show}>
              <Home className="i" /> Home
            </Link>
            <Link to="/Admin/Analytics" className="li" onClick={show}>
              <BarChart2 className="i" /> Analytics
            </Link>
            <Link to="/Admin/Imbox" className="li" onClick={show}>
              <MessageSquare className="i" /> Imbox <span>5</span>
            </Link>
            <Link to="/Admin/Products" className="li" onClick={show}>
              <Folder className="i" /> Products
            </Link>
            <Link to="/Admin/ACustomers" className="li" onClick={show}>
              <Users className="i" /> customers
            </Link>
            <Link to="/Admin/AOrders" className="li" onClick={show}>
              <MessageCircle className="i" /> Orders
            </Link>
            <Link to="/Admin/AddProductA" className="li" onClick={show}>
              <Plus className="i" /> Add Product
            </Link>
            <Link to="/Admin/AFournisseurs" className="li" onClick={show}>
              <HelpCircle className="i" /> Fournisseurs
            </Link>
            <Link to="/Admin/Sellers" className="li" onClick={show}>
              <HelpCircle className="i" /> Sellers
            </Link>
            <Link className="li" to="/Admin/AddCategorie" onClick={show}>
              <Settings className="i" /> Add Categorie
            </Link>
            <Link className="li" to="/Admin/ProductPub" onClick={show}>
              <Settings className="i" /> ProductPub
            </Link>
          </ul>
          <button>
            <LogOut /> LogOut
          </button>
        </div>
      </div>
      <div className="sidTop">
        <Menu onClick={show} className="show heid" />
        <div className="search">
          <Search className="ii" />
          <form>
            <input type="search" placeholder="Search ..." />
          </form>
        </div>

        <div className="select">
          <div className="left">
            <div className="i ii">
              <MessageCircle style={{ width: "20px" }} />
            </div>
            <div className="i">
              <Bell style={{ width: "20px" }} />
              <span>3</span>
            </div>
          </div>
          <div className="right">
            <img src={image} alt="loading" />
            <div className="pp">
              <Popup
                trigger={
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    {" "}
                    <h5>{admin?.name}</h5>{" "}
                    <ChevronDown style={{ marginLeft: "8px" }} />
                  </button>
                }
                position="bottom center"
              >
                <div style={{ height: 200 }}>
                  Popupjiuweiufei ufiiuhosehwis jewvcirge xfroiex wfew09iwwev
                  iwjx vyweve !!
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
      <div className="midell">
        {params.op === "Analytics" ? (
          <Analytics />
        ) : params.op === "Imbox" ? (
          <Inbox />
        ) : params.op === "Products" ? (
          <Products />
        ) : params.op === "ProductDet" ? (
          <AProductDet />
        ) : params.op === "ProductUpdat" ? (
          <AProductUpdat />
        ) : params.op === "AddProductA" ? (
          <AddProductA />
        ) : params.op === "ACustomers" ? (
          <ACustomers />
        ) : params.op === "AOrders" ? (
          <AOrders />
        ) : params.op === "ACustomerDet" ? (
          <ACustomerDet />
        ) : params.op === "AodersDet" ? (
          <AodersDet allCategories={allCategories} allProducts={allProducts} />
        ) : params.op === "AFournisseurs" ? (
          <AFournisseurs />
        ) : params.op === "Sellers" ? (
          <Sellers />
        ) : params.op === "AFournisseurDet" ? (
          <AFournisseurDet />
        ) : params.op === "SellerDet" ? (
          <SellerDet />
        ) : params.op === "AddFournisseur" ? (
          <AddFournisseur />
        ) : params.op === "AddCategorie" ? (
          <AddCategorie />
        ) : params.op === "AFournisseurUpdate" ? (
          <AFournisseurUpdate />
        ) : params.op === "ProductPub" ? (
          <ProductPub />
        ) : (
          <Overview />
        )}
      </div>
    </div>
  );
}

export default ComposentP;
