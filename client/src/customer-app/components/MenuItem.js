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
	const item = props.item;
	const [quantity, setQuantity] = useState(0);
	useEffect(() => {
		props.setOrder((prevOrder) => ({
			...prevOrder,
			[item.name]: quantity,
		}));
		return () => {};
	}, [quantity, item.name, props]);
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
					// console.log(`${props.name}: ${quantity}`);
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
					// console.log(`${props.name}: ${quantity}`);
					setQuantity(quantity + 1);
				}}
			>
				<AddCircleOutlineIcon />
			</IconButton>
		</TDPC>
	);
}
