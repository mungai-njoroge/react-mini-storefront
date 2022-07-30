import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../store/actions";

import { extractDefaultAttrs, fetchProduct } from "../composables";
import { CartItem, Product } from "../interfaces";
import { ReactComponent as Cart } from "../images/cart-white.svg";
import Price from "../components/Price";

interface Props {
  product: Product;
  addToCart: (product: CartItem) => void;
}

class ItemCard extends React.Component<Props, {}> {
  handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!this.props.product.id) return;

    fetchProduct(this.props.product.id).then((res) => {
      const prod = res.data.product as Product;
      const cartItem = {
        ...prod,
        selectedAttrs: extractDefaultAttrs(prod.attributes),
        quantity: 0,
      } as CartItem;
      this.props.addToCart(cartItem);
    });
  };
  render() {
    return (
      <Link
        to={`/product/${this.props.product.id}`}
        className={`itemcard h-shadow ${
          !this.props.product.inStock ? "out-of-stock" : ""
        }`}
      >
        <div className="image">
          <img src={this.props.product.gallery[0]} alt="" />
          <div className="img-overlay"></div>
        </div>

        <div className="item-name">{this.props.product.name}</div>
        <Price prices={this.props.product.prices} />
        <div className="add-to-cart-btn" onClick={this.handleAddToCart}>
          <Cart />
        </div>
      </Link>
    );
  }
}

export default connect(null, { addToCart })(ItemCard);
