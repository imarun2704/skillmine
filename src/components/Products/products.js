import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { actionTypes } from "./../../redux/actionTypes/actionTypes";
import "./product.css";
import CircularProgress from "@mui/material/CircularProgress";

const Products = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickedCategory, setClickedCategory] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setLoader(true);
    getAllCategory();
    if (localStorage.getItem("backtoproducts")) {
      getProductsByCategory(localStorage.getItem("backtoproducts"));
    }
  }, []);

  const getAllCategory = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLoader(false);
          setCategories(data);
        }
      });
  };
  const getProductsByCategory = (el) => {
    setLoader(true);
    setClickedCategory(el);
    fetch(`https://fakestoreapi.com/products/category/${el}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLoader(false);
          setProducts(data);
        }
      });
  };

  const viewProduct = (product) => {
    if (product) {
      fetch(`https://fakestoreapi.com/products/${product.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            history.push("/view");
            dispatch({
              type: actionTypes.VIEW_PRODUCT,
              payload: json,
            });
          }
        });
    }
  };
  const searchProducts = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      getProductsByCategory(clickedCategory);
    }
    let filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().indexOf(e.target.value) !== -1; // returns true or false
    });
    setProducts(filteredProducts);
  };

  return (
    <div className="product-page">
      {loader ? (
        <div className="loader-products-page">
          <CircularProgress />{" "}
        </div>
      ) : (
        <Grid container md={12}>
          <Grid item md={12} xs={12}>
            <div>
              <div>
                <input
                  type="text"
                  className="search-bar"
                  onChange={(e) => searchProducts(e)}
                  Placeholder="Search by product"
                  name="search"
                />
              </div>
              <div>
                <div className="filter-options">
                  {categories.map((category, i) => {
                    return (
                      <div key={i}>
                        <button
                          className={` ${
                            clickedCategory === category
                              ? "active-btn"
                              : "filter-btn"
                          } `}
                          onClick={() => getProductsByCategory(category)}
                        >
                          {category}{" "}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="cards-section">
                  <Grid container md={12} xs={12} sm={12}>
                    {products.length > 0 &&
                      products.map((product, i) => {
                        return (
                          <Grid
                            md={3}
                            sm={6}
                            xs={12}
                            style={{ paddingTop: "1rem" }}
                            key={product.id}
                          >
                            <div className="card">
                              <div className="product-title">
                                {product.title}
                              </div>
                              <div className="product-img-price-div">
                                <div>
                                  <img
                                    src={product.image}
                                    className="product-image"
                                    width="130"
                                    alt="product"
                                  />
                                </div>
                                <div>
                                  <div>
                                    <div className="title-string">Price </div>
                                    <div className="product-price">
                                      Rs.{product.price}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="title-string">Rating </div>
                                    <div className="product-rating">
                                      {product.rating && product.rating.rate} /5
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="product-description">
                                <span className="product-description-title">
                                  Description :
                                </span>{" "}
                                {product.description.substring(0, 50)}........
                              </div>
                              <div className="button-div">
                                <div>
                                  <button
                                    className="button"
                                    onClick={() =>
                                      dispatch({
                                        type: actionTypes.ADD_TO_CART,
                                        payload: product,
                                      })
                                    }
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="button"
                                    onClick={() => viewProduct(product)}
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Grid>
                        );
                      })}
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Products;
