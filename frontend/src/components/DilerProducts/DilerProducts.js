import React from "react";

function DilerProducts({ products, onLinkClick }) {
    
    return (
        <div>
            <h2>All Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Link</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>
                                <a
                                    href="#"
                                    onClick={() => onLinkClick(product)}
                                >
                                    {product.product_url}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DilerProducts