import { Link } from "react-router-dom";
import "../Styles/ProductCardDisplay.styles.css";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";

export default function ProductCardDisplay({ product }) {
	const { image, name, price, id, type } = product;
	const { updateCart } = useContext(CartContext);

	return (
		<div style={{ margin: "10px", textAlign: "center",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",padding:"10px"}}>
			<Link to={`/product/${id}`}>
				<img width="198" height="198" alt="product" src={image} />
				<div className="productTileCard">{name}</div>
				<div className="productTileCard">({type})</div>
			</Link>
			<button
				onClick={() => {
					updateCart(product, 1);
				}}
				className="btnPrice"
			>
				<span style={{ margin: " 10px" }}>
					<FaCartPlus />
				</span>{" "}
				$ {price}
			</button>
		</div>
	);
}
