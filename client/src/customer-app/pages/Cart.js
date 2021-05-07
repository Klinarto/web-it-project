import axios from "axios";

export default function Cart() {
	const orderList = JSON.parse(localStorage.getItem("order"));
	console.log(orderList);

	const makeOrder = async (order) => {
		try {
			console.log(order);
			const userData = JSON.parse(localStorage.getItem("userData"));
			console.log(userData);
			const data = { vendorId: "60939f9aa6762b64b82547b3" };

			if (Object.entries(order).length !== 0) {
				data["foodItems"] = order;
			}
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
