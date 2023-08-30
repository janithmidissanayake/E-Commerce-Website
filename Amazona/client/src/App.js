import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import StoreProvider, { StoreContext } from "./Store";
import CartScreen from "./Screens/CartScreen";

function App() {
  const { state } = useContext(StoreContext);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="secondary" varient="secondary">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand style={{ color: "white !important" }}>
                  {" "}
                  Amazona
                </Navbar.Brand>
              </LinkContainer>

              <Nav className="me-auto">
                <Nav.Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />

            </Routes>
          </Container>
        </main>
        <footer className="text-center">
          <div>All Right Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
