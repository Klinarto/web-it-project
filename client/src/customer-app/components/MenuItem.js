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
	AddItem
} from "../pages/Menu.style";

export default function MenuItem(item) {
    var quantity = 0;
    console.log(item);
	return (
		<TDPC>
			<InTR>
				<ImageBig src={item['image']} />
			</InTR>
			<tr>
				<p>
					<b>{item['name']} </b>
					<Price>{item['price']}</Price>
					<br/>
					{item['detail']}
					<br/>
					<hr/>
				</p>
			</tr>
			<Buttons>
				<AddItem>-</AddItem>
				{quantity}
				<AddItem>+</AddItem>
			</Buttons>
		</TDPC>
	);
}