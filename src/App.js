import React from "react";
import { Route,  Switch } from "react-router-dom";
import Header from './components/Header/header';
import Products from './components/Products/products';
import ViewProduct from './components/ViewProduct/viewProduct';
import Cart from './components/Cart/cart';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/view">
          <ViewProduct />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
