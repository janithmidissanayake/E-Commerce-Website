import React, { useEffect,useReducer,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../Component/Rating";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet";
import Loading from "../Component/LoadingBox";
import { StoreContext } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [state, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  const { product,loading, error  } = state;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCh_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state: contextState, dispatch: ctxDispatch } = useContext(StoreContext);


  const addToCartHandler=() =>{
    ctxDispatch({type:"CART_ADD_ITEM" , payload: {...product,quantity:1}})    
  }

  return loading ? (
    <Loading/>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            src={`${process.env.PUBLIC_URL}/${product.image}`}
            alt={product.name}
            className="image-large"
          />
        </Col>
        <Col md={3}>
          <ListGroup varient="flush">
            <ListGroup.Item>
                <Helmet><title>{product.name}</title></Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>price : $ {product.price}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>price :</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Button variant="primary" onClick={addToCartHandler}>Add to Cart</Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {product.name}
    </div>
  );
}
export default ProductScreen;
