import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import cart from "./../../assets/cart.png";
import user from "./../../assets/user.png";
import "./header.css";

function Header(props) {
  const cartData = useSelector((state) => state.Reducer.cartData);
  const history = useHistory();
  return (
    <div>
      <Grid container md={12}>
        <Grid item md={12} xs={12} sm={12}>
          <div className="header-bar">
            <div className="header-content">
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  paddingLeft: "1rem",
                }}
              >
                SM
              </div>
              <div className="header-cart-div">
                <div onClick={() => history.push("/cart")}>
                  <img
                    src={cart}
                    width="40"
                    style={{ cursor: "pointer" }}
                    alt="cart"
                  />
                  <div className="cart-data-length">{cartData.length}</div>
                </div>
                <div className="user-profile">
                  <img src={user} width="40" alt="user" />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
