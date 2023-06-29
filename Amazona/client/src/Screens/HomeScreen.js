import React from "react";
import Data from "../Data";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <h1 className="feature-product">Featured Products</h1>
      <div className="products">
        {Data.product.map((product) => (
          <div key={product.slug} className="product">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>{product.price}</p>
              <button>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeScreen;
