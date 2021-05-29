import React, { useState, useEffect } from "react";
import Map from "../../shared/components/Map";
import axios from "axios";
import {
	PopUpHeader,
	PopUpBody,
	PopUpTitle,
	PopUpCloseButton,
} from "../pages/Vans.style";
import { Fragment } from "react";
import { Dialog } from "@material-ui/core";

export default function SimpleModal() {
	const [vendors, setVendors] = useState([]);
	// const [modalStyle] = React.useState(getModalStyle);

	const [selected, setSelected] = useState(null);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

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

	const renderDialog = () => {
		if (selected) {
			return (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<PopUpHeader>
						<PopUpTitle>{selected.name}</PopUpTitle>
						<PopUpCloseButton onClick={handleClose}>&times;</PopUpCloseButton>
					</PopUpHeader>
					<PopUpBody></PopUpBody>
				</Dialog>
			);
		}
	};
	return (
		<Fragment>
			<Map
				data={vendors}
				selected={selected}
				setOpen={setOpen}
				setSelected={setSelected}
			/>
			{renderDialog()}
		</Fragment>
	);
}
