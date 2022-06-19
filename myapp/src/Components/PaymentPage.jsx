import "../Styles/PaymentPage.style.css";
import logo from "../Images/logoMain.png";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import TextField from "@mui/material/TextField";

export default function PaymentPage() {
	const { cart, totalCartValue, emptyCart } = useContext(CartContext);
	const [formData, setFormData] = useState({});
	const { auth } = useContext(AuthContext);
	const history = useHistory();
	function handlePayment() {
		if (formData.address === undefined || formData.address.trim() === "")
			return alert("Enter valid address");
		if (formData.city === undefined || formData.city.trim() === "")
			return alert("Enter valid city");
		if (formData.country === undefined || formData.country.trim() === "")
			return alert("Enter valid country");
		if (formData.state === undefined || formData.state.trim() === "")
			return alert("Enter valid state");
		if (formData.zip === undefined || formData.zip.trim() === "")
			return alert("Enter valid zip code");
		if (formData.phone === undefined || formData.phone.trim() === "")
			return alert("Enter valid phone number");

		const orderData = {};
		cart.forEach((el) => (orderData[el.name] = el.quantity));
		const obj = {
			order_ids: [orderData],
		};

		axios
			.patch(
				`https://himalaya-usa.herokuapp.com/users/purchase/${auth}`,
				obj
			)
			.then((res) => res.data)
			.then((res) => console.log(res))
			.then(emptyCart())
			.then(history.push("/user/success"))
			.catch((err) => console.error(err.message));
	}
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div className="paymentAddressSec">
				<img src={logo} alt="logo"></img>
				<div className="expressCheckout">Express checkout</div>
				<button
					onClick={() => handlePayment()}
					className="btnPay purple"
				>
					Shop pay
				</button>
				<button
					onClick={() => handlePayment()}
					className="btnPay yellow"
				>
					Amazon pay
				</button>
				<button
					onClick={() => handlePayment()}
					className="btnPay black"
				>
					G pay
				</button>
				<hr />
				<div className="paymentSubHead">Contact information</div>
				<div>
					<input type="checkbox" />
					<span>Keep me up to data on news and offers</span>
				</div>

				<div className="paymentSubHead">Shipping address</div>
				<form>
					<div className="borderInput" style={{ display: "flex" }}>
						<TextField
							id="outlined-basic"
							label="First Name (optional)"
							variant="outlined"
							className="inputForm"
							name="firstName"
							onChange={(e) => handleChange(e)}
						/>
						<TextField
							id="outlined-basic"
							label="Last Name"
							variant="outlined"
							className="inputForm "
							type="text"
							name="lastName"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="borderInput">
						<TextField
							id="outlined-basic"
							label="Address"
							variant="outlined"
							className="inputForm"
							type="text"
							name="address"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="borderInput">
						<TextField
							id="outlined-basic"
							label="Apartment, suite, etc. (optional)"
							variant="outlined"
							className="inputForm"
							type="text"
							name="apartment"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="borderInput">
						<TextField
							id="outlined-basic"
							label="City"
							variant="outlined"
							className="inputForm"
							type="text"
							name="city"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="borderInput" style={{ display: "flex" }}>
						<TextField
							id="outlined-basic"
							label="Country/region"
							variant="outlined"
							className="inputForm"
							type="text"
							name="country"
							onChange={(e) => handleChange(e)}
						/>
						<TextField
							id="outlined-basic"
							label="State"
							variant="outlined"
							className="inputForm"
							type="text"
							name="state"
							onChange={(e) => handleChange(e)}
						/>
						<TextField
							id="outlined-basic"
							label="ZIP code"
							variant="outlined"
							className="inputForm"
							type="number"
							name="zip"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="borderInput">
						<TextField
							id="outlined-basic"
							label="Phone"
							variant="outlined"
							type="number"
							className="inputForm"
							name="phone"
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</form>
				<Link to="/products/health%20supplements">
					{" "}
					<button className="btnPaymentGreen">
						Continue to shipping
					</button>
				</Link>
				<Link to="/cart">
					<button className="btnPaymentWhite">Return to cart</button>
				</Link>
			</div>
			<div className="paymentCartSec">
				<div>
					{cart.map((el) => (
						<div key={el.id} style={{ margin: "10px" }}>
							<img widht="70" height="48" src={el.image} alt="" />{" "}
							<span style={{ marginLeft: 50 }}>{el.name}</span>
							<span
								style={{
									marginLeft: 50,
									paddingTop: 20,
									float: "right",
								}}
							>
								{" "}
								$ {(el.price * el.quantity).toFixed(2)}
							</span>
						</div>
					))}
				</div>
				<hr />
				<input type="text" placeholder="Discount code" />
				<button>Apply</button>
				<hr />
				<div>
					Subtotal{" "}
					<span style={{ float: "right" }}>
						$ {totalCartValue()}{" "}
					</span>{" "}
				</div>
				<div>
					Shipping{" "}
					<span style={{ float: "right" }}>
						$ {totalCartValue()}{" "}
					</span>{" "}
				</div>
				<hr />
				<div>
					Total{" "}
					<span style={{ float: "right" }}>$ {totalCartValue()}</span>{" "}
				</div>
			</div>
		</div>
	);
}
