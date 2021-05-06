import axios from "axios";

export default function Cart() {
	const orderList = JSON.parse(localStorage.getItem("order"));
	console.log(orderList);

	const makeOrder = async (order) => {
		try {
			const userData = JSON.parse(localStorage.getItem("userData"));
			console.log(userData);
			const data = { foodItems: order, vendorId: "6080184f1cb9346538047c22" };
			const res = await axios.post("/order", data, {
				headers: {
					"Content-Type": "application/json",
					"x-access-token": userData.token,
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	return (
		<p>
			<ul></ul>
			<button
				onClick={() => {
					makeOrder(orderList);
				}}
			>
				make order
			</button>
		</p>
	);
}
