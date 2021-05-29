import React, { useState, Fragment, useEffect } from "react";

import Map from "../../shared/components/Map";
import axios from "axios";
import {
	LeftDetail,
	RightDetail,
	Container,
	Title,
	VansList,
} from "./Vans.style";
import { useHistory } from "react-router";
// import { objectIsEmpty } from "../../utilities/Utils";

export default function Vans() {
	// array of vendors
	const [vendors, setVendors] = useState([]);
	const [selected, setSelected] = useState(null);

	const history = useHistory();
	// const checkSelected = (vendors) => {};

	useEffect(() => {
		// used for cleanup
		let isMounted = true;

		// fetch list of vendors from db
		const fetchVendors = async () => {
			try {
				const res = await axios.get("/vendor");
				if (isMounted) {
					setVendors(res.data);
					// console.log(vendors);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchVendors();

		return () => {
			isMounted = false;
		};
	}, [vendors]);

	return (
		<Fragment>
			<Container>
				<LeftDetail>
					<Title>Closest Vans</Title>
					{vendors.map((vendor) => {
						return (
							// {
							//   isClicked_vendorid ? <> : <>
							// }
							<VansList
								key={vendor.id}
								onClick={() => {
									setSelected(vendor);
								}}
							>
								{vendor.name}
							</VansList>
						);
					})}
					<button
						onClick={() => {
							if (selected) {
								const vendor = { id: selected._id, name: selected.name };
								localStorage.setItem("vendor", JSON.stringify(vendor));
								history.push("/customer/menu");
							}
						}}
					>
						Order
					</button>
				</LeftDetail>
				<RightDetail>
					<Map data={vendors} selected={selected} setSelected={setSelected} />
				</RightDetail>
			</Container>
		</Fragment>
	);
}
