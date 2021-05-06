import {
	Image,
	DIV,
	TDPC,
	Wrapper,
	TD,
	InTR,
	Price,
	ImageBig,
	MyButton,
	LeftWrapper,
	RightWrapper,
	Title,
	Buttons,
	AddItem,
} from "../pages/Menu.style";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import { useEffect, useState } from "react";

export default function MenuItem(props) {
	const { item, setOrder } = props;
	const name = item.name;
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const updateOrder = () => {
			setOrder((prevOrder) => ({
				...prevOrder,
				[name]: quantity,
			}));
		};
		updateOrder();
		return () => {};
	}, [quantity, setOrder, name]);
	return (
		<TDPC>
			<InTR>
				<ImageBig src={item["image"]} />
			</InTR>
			<tr>
				<p>
					<b>{item["name"]} </b>
					<Price>{item["price"]}</Price>
					<br />
					{item["detail"]}
					<br />
					<hr />
				</p>
			</tr>
			<IconButton
				aria-label="Remove"
				onClick={() => {
					if (quantity > 0) {
						setQuantity(quantity - 1);
						// console.log(`${item.name}: ${quantity}`);
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
					// console.log(`${item.name}: ${quantity}`);
				}}
			>
				<AddCircleOutlineIcon />
			</IconButton>
		</TDPC>
	);
}
