import axios from "axios";

export default function Cart() {
  const orderList = JSON.parse(localStorage.getItem("order"));
  console.log(orderList);

  const makeOrder = async (order) => {
    try {
      const res = await axios.post("/order", order, {
        header: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
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
