import React from "react";
import {
	Container,
	TopWrapper,
	TopImage,
	BottomImage,
	Title,
	Button,
} from "./Rate.style";
import { Rating } from "@material-ui/lab";
import coffeeBackgroundHalf from "../../images/coffeeBackgroundHalf.png";
import coffeeCup from "../../images/coffeeCup.png";
import axios from "axios";

export function Rate() {
	const [value, setValue] = React.useState(2);
	const [hover, setHover] = React.useState(-1);

	const onClick = async () => {
		if (localStorage.getItem("vendor")) {
			const id = JSON.parse(localStorage.getItem("vendor"))._id;
			try {
				const data = { rating: value, id: id };
				const res = await axios.put(`/vendor/rate`, data, {
					headers: { "Content-Type": "application/json" },
				});
				console.log(res);
			} catch (error) {
				console.log(error.response.data);
			}
		}
	};

	return (
		<Container>
			<TopWrapper>
				<TopImage alt="coffeeCup-image" src={coffeeCup} />
				<Title>Rate your experience</Title>
				<Rating
					name="half-rating"
					defaultValue={0}
					precision={0.5}
					style={{
						color: "black",
						transform: "scale(1.5)",
					}}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					onChangeActive={(event, newHover) => {
						setHover(newHover);
					}}
				/>
				<br />
				<p>
					{value}
					{hover}
				</p>
				<Button onClick={onClick}>Submit</Button>
			</TopWrapper>

			<BottomImage alt="coffee-image" src={coffeeBackgroundHalf} />
		</Container>
	);
}
export default Rate;
