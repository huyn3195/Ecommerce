import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productAction.js";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Browse Our Products</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
              <div className="card product-card h-100 shadow-sm">
                <div className="product-image-wrapper">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    className="card-img-top product-image"
                    alt={product.name}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p className="card-text text-muted small text-truncate">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <p className="card-text">
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Rating:</strong> {product.rating} / 5
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
