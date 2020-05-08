import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({product}) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">{product.name}
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <Link to="/">
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-2 card-btn-1">
                            View Product
                        </button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
                        Add to cart
                    </button>
                </div>               
            </div>
        </div>
    );
};

export default Card; 