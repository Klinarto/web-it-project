import axios from "axios";
import {
	Container,
	OrderList,
	OrderItem,
  LeftWrapper,
  RightWrapper,
  Division
} from "./Cart.style";

export default function Cart() {
	const orderList = JSON.parse(localStorage.getItem("order"));
  const orderPrice = JSON.parse(localStorage.getItem("price"));
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
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};
  console.log(Object.entries(orderList));
	return (
		<Container>
      

        <Division>
          <LeftWrapper>
            {Object.entries(orderList).map(function (item) {
              return (
                <OrderList>
                  <OrderItem>
                    {item[1]} x {item[0]}
                  </OrderItem>
                </OrderList>
              );
            })}
          </LeftWrapper>
          <RightWrapper>
            {Object.entries(orderPrice).map(function (item) {
              return (
                <OrderList>
                  <OrderItem>
                    $ {item[1]}
                  </OrderItem>
                </OrderList>
              );
            })}
          </RightWrapper>
        </Division>

			<button
				onClick={() => {
					makeOrder(orderList);
				}}
			>
				make order
			</button>
		</Container>
	);
}
