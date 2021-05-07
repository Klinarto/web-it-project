import React, { Fragment } from "react";
import Map from "../components/Map";
import { Container, Title, Division, LeftDetail, MyButton } from "../pages/Vans.style";

export default function Vans() {
	// display vendor buttons where when its clicked

	return (
		<Fragment>
			<Map />
			<Container>
				<Title>Closest Vans</Title>
				<Division>
					<LeftDetail>
					</LeftDetail>
				</Division>
				<MyButton>Order</MyButton>
			</Container>

		</Fragment>
	);
}
