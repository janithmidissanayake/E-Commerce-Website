import React, { useContext } from "react";
import { StoreContext } from "../Store";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);

  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <title>Cart Shopping</title>
      <h1>Cart shopping</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="danger">
              cart is empty.Products are not addded.
            </Alert>
          ) : (
            <ListGroup>
              {cartItems.map((items) => (
                <ListGroup.Item key={items._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={items.image}
                        alt={items.name}
                        className="img-fluid-rounded img-thumbnails"
                      ></img>{" "}
                      <Link to={`/product/${items.slug}`}>{items.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={items.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{items.quantity}</span>{" "}
                      <Button variant="light" disabled={items.quantity === 1}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col md={3}>${items.price}</Col>

                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
