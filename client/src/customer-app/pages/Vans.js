import React, { useState, Fragment, useEffect } from "react";

import Map from "../../shared/components/Map";
import axios from "axios";
// import { objectIsEmpty } from "../../utilities/Utils";

export default function Vans() {
	// array of vendors
	const [vendors, setVendors] = useState([]);
	const [selected, setSelected] = useState(null);

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

	const storeVendorData = () => {
		console.log(selected);
		if (selected) {
			const vendor = { id: selected._id, name: selected.name };
			localStorage.setItem("vendor", JSON.stringify(vendor));
		} else {
			console.log("Vendor not selected");
		}
	};

	return (
		<Fragment>
			<Map data={vendors} selected={selected} setSelected={setSelected} />
			{vendors.map((vendor) => {
				return (
					<button
						key={vendor.id}
						onClick={() => {
							setSelected(vendor);
						}}
					>
						{vendor.name}
					</button>
				);
			})}
			<button
				onClick={() => {
					storeVendorData();
				}}
			>
				Order
			</button>
		</Fragment>
	);
}
