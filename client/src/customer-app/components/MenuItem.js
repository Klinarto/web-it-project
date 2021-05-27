import React from "react";
import { UL, Division, Price, ImageBig, Buttons } from "../pages/Menu.style";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useEffect, useState } from "react";

export default function MenuItem(props) {
	const { item, setOrder } = props;
	const name = item.name;
	const [quantity, setQuantity] = useState(props.quantity);

	// const updateOrder = () => {
	// 	setOrder((prevOrder) => ({
	// 		...prevOrder,
	// 		[name]: quantity,
	// 	}));
	// };

	useEffect(() => {
		const updateOrder = () => {
			setOrder((prevOrder) => ({
				...prevOrder,
				[name]: quantity,
			}));
		};

		if (quantity >= 0) {
			updateOrder();
		}
		// console.log("updating order");

		return () => {};
	}, [quantity, setOrder, name]);
	return (
		<Division>
			<div>
				<ImageBig src={item["image"]} />
			</div>

			<div>
				<UL>
					<b>{item["name"]}</b> <Price>{item["price"]}</Price>
				</UL>
				<UL>{item["detail"]}</UL>
			</div>

			<div>
				<Buttons>
					<IconButton
						aria-label="Remove"
						onClick={() => {
							if (quantity > 0) {
								setQuantity(quantity - 1);
							}
						}}
					>
						<RemoveCircleOutlineOutlinedIcon />
					</IconButton>
					{quantity}
					<IconButton
						aria-label="Add"
						onClick={() => {
							setQuantity(quantity + 1);
						}}
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Buttons>
				{/* <IconButton onClick={() => updateOrder()}>
					<AddShoppingCartIcon />
				</IconButton> */}
			</div>
		</Division>
	);
}
