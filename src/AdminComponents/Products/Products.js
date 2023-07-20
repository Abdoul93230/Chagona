import React, { useEffect, useState } from "react";
import "./Products.css";
import { Star } from "react-feather";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function Products() {
  const [products, setProduct] = useState([]);
  const [type, setTypes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(20);
  const [totalPage, setTotalPage] = useState(0);
  const [titel, setTitel] = useState("All");
  const [erreur, setErreur] = useState(null);

  const titre = (param) => {
    setTitel(param);
  };

  useEffect(() => {
    axios
      .get(`${BackendUrl}/Products`)
      .then((res) => {
        if (titel === "All") {
          if (res.data.data.length > 0) {
            setProduct(res.data.data);
            setTotalPage(Math.ceil(res.data.data.length / perPage));
            setErreur(null);
          }
        }
      })
      .catch((error) => {
        setErreur(error.response.data.message);
      });

    axios
      .get(`${BackendUrl}/getAllType/`)
      .then((res) => {
        setTypes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [titel]);

  const searchProductByType = (param) => {
    axios
      .get(`${BackendUrl}/searchProductByType/${param}`)
      .then((res) => {
        setProduct(res.data.products);
        setTotalPage(Math.ceil(res.data.products.length / perPage));
        setCurrentPage(0);
        setErreur(null);
      })
      .catch((error) => {
        setErreur(error.response.data.message);
      });
  };

  const searchProductByName = (param) => {
    if (searchName.length < 2) {
      alert("le produit à rechercher doit avoir au moins 2 caractères");
      return;
    }
    axios
      .get(`${BackendUrl}/searchProductByName/${param}`)
      .then((res) => {
        setProduct(res.data.products);
        setTotalPage(Math.ceil(res.data.products.length / perPage));
        setCurrentPage(0);
        setErreur(null);
      })
      .catch((error) => {
        setErreur(error.response.data.message);
      });
  };

  const AllProducts = () => {
    axios
      .get(`${BackendUrl}/Products`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setProduct(res.data.data);
          setTotalPage(Math.ceil(res.data.data.length / perPage));
          setCurrentPage(0);
          setErreur(null);
        }
      })
      .catch((error) => {
        setErreur(error.response.data.message);
      });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const displayedProducts = products.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  return (
    <div className="AdminProducts">
      <h2>Products / {titel}</h2>
      <div className="top">
        <ul>
          {type.map((param, index) => {
            if (index < 5) {
              return (
                <li
                  key={index}
                  onClick={() => {
                    titre(param.name);
                    searchProductByType(param._id);
                  }}
                >
                  {param.name}
                </li>
              );
            }
            return null;
          })}

          <li
            onClick={() => {
              titre("All");
              setErreur(null);
              AllProducts();
            }}
          >
            All
          </li>
        </ul>
        <div className="search">
          <input
            type="search"
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search Products (name)"
          />
          <input
            onClick={() => {
              searchProductByName(searchName);
            }}
            type="submit"
            value="Search"
          />
        </div>
      </div>
      <div className="midel">
        {!erreur ? (
          displayedProducts.map((param, index) => {
            return (
              <div className="carde" key={index}>
                <h5>Chaussures</h5>
                <h3>{param.name}</h3>
                <h6>${param.prix}</h6>
                <h4>
                  <Star className="etoil" />
                  <Star className="etoil" />
                  <Star className="etoil" />
                  <Star className="etoil" />
                  <Star className="etoil" />
                </h4>
                <p>{param.description.substring(0, 50)}</p>
                <button>
                  <Link
                    to={`/Admin/ProductDet/${param._id}`}
                    className="button"
                  >
                    View More
                  </Link>
                </button>
              </div>
            );
          })
        ) : (
          <h1>{erreur}</h1>
        )}
      </div>
      {products.length > perPage ? (
        <ReactPaginate
          pageCount={totalPage}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Products;
