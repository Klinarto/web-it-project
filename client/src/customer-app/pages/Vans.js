import React, { useState, Fragment, useEffect } from "react";

import Map from "../../shared/components/Map";
import axios from "axios";
import { objectIsEmpty } from "../../utilities/Utils";

export default function Vans() {
	// array of vendors
	const [vendors, setVendors] = useState([]);

	useEffect(() => {
		// used for cleanup
		let isMounted = true;

		// fetch list of vendors from db
		const fetchVendors = async () => {
			try {
				const res = await axios.get("/vendor");
				if (isMounted) {
					setVendors(res.data);
					console.log(vendors);
				}

				// console.log(vendors);
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
			<Map />
		</Fragment>
	);
}
