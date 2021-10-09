import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import "./cart.css";

function Cart(props) {
  const products = useSelector((state) => state.Reducer.cartData);
  const history = useHistory();
  return (
    <div>
      <div className="cart-title"> Shopping Cart</div>
      <div className="back-btn">
        <button
          className="button"
          style={{ width: "200px", height: "50px" }}
          onClick={() => {
            history.push("/");
          }}
        >
          Back to Product's Page
        </button>
      </div>

      <div className="cards-section">
        <Grid container md={12} xs={12} sm={12}>
          {products.length > 0 &&
            products.map((product, i) => {
              return (
                <Grid md={3} sm={6} xs={12} style={{ paddingTop: "1rem" }} key={product.id}>
                  <div className="card">
                    <div className="product-title">{product.title}</div>
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
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default Cart;
