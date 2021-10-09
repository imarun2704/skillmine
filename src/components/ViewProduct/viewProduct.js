import React from "react";
import { useHistory } from "react-router-dom";
import "./viewProduct.css";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "./../../redux/actionTypes/actionTypes";

function ViewProduct(props) {
  const product = useSelector((state) => state.Reducer.viewProduct);
  console.log(product, "hhhh");
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <div className="title">PRODUCT VIEW PAGE </div>
      <div className="cards-section">
        <Grid container md={12} xs={12} sm={12}>
          <Grid md={12} sm={12} xs={12} style={{ paddingTop: "1rem" }}>
            <div className="card">
              <div className="product-title" style={{ fontSize: "22px" }}>
                {product && product.title}
              </div>
              <div className="product-img-price-div">
                <div>
                  <img
                    src={product.image}
                    className="product-image"
                    width="230"
                    alt="product"
                    style={{ width: "140px", height: "125px" }}
                  />
                </div>
                <div>
                  <div>
                    <div className="title-string" style={{ fontSize: "20px" }}>
                      Price{" "}
                    </div>
                    <div className="product-price" style={{ fontSize: "25px" }}>
                      Rs.{product && product.price}
                    </div>
                  </div>
                  <div>
                    <div className="title-string" style={{ fontSize: "20px" }}>
                      Rating{" "}
                    </div>
                    <div
                      className="product-rating"
                      style={{ fontSize: "23px" }}
                    >
                      {product && product.rating && product.rating.rate} /5
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-description">
                <span
                  className="product-description-title"
                  style={{ fontSize: "16px" }}
                >
                  Description :
                </span>{" "}
                {product && product.description}
              </div>
              <div className="button-div">
                <div>
                  <button
                    className="button"
                    style={{ width: "200px", height: "50px" }}
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
                    style={{ width: "200px", height: "50px" }}
                    onClick={() => {
                      history.push("/");
                      localStorage.setItem("backtoproducts", product.category);
                    }}
                  >
                    Back to Product's Page
                  </button>
                </div>
              </div>
            </div>
          </Grid>
          );
        </Grid>
      </div>
    </div>
  );
}

export default ViewProduct;
