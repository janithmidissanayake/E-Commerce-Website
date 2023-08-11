import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../Component/Product"; 
import { Helmet } from "react-helmet";
import LoadingBox from "../Component/LoadingBox";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  const { loading, error, products } = state;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/product");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCh_fAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="feature-product">Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox/>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>    
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
            <Product product={product}></Product>
            </Col>
          ))}
          </Row>
        )}
         
      </div>
    </div>
  );
};
export default HomeScreen;
