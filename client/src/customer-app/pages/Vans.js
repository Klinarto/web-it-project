import React, { useState, useEffect } from "react";
import Map from "../../shared/components/Map";
import axios from "axios";
// import { Wrapper, PopUpHeader, PopUpBody, PopUpTitle, PopUpCloseButton } from "../pages/Vans.style";
import { Fragment } from "react";
import { Dialog } from "@material-ui/core";

export default function SimpleModal() {
	const [vendors, setVendors] = useState([]);
	const [modalStyle] = React.useState(getModalStyle);

	const [selected, setSelected] = useState(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	function getModalStyle() {
		const top = 50;
		const left = 50;

		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}
	const body = (
		<div style={modalStyle}>
			<h2 id="simple-modal-title">Text in a modal</h2>
			<p id="simple-modal-description">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
		  </p>
			<SimpleModal />
		</div>
	);
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
		<Fragment >
			<Map data={vendors} selected={selected} setSelected={setSelected} onClick={() => setSelected(null)} />
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Dialog>
			{selected ?

				handleOpen()

				// <Wrapper >

				// 	<PopUpHeader >
				// 		<PopUpTitle>{selected.name}</PopUpTitle>
				// 		<PopUpCloseButton onClick={() => setSelected(null)}>&times;</PopUpCloseButton>
				// 	</PopUpHeader>

				// 	<PopUpBody  >
				// 		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				// 	</PopUpBody>
				// </Wrapper>
				: handleClose()}
		</Fragment>
	);
}

// function Modal({ children, shown, close }) {
// 	return shown ? (
// 		<Aaaa
// 			onClick={() => {
// 				// close modal when outside of modal is clicked
// 				close();
// 			}}
// 		>
// 			<Bbbb
// 				className="modal-content"
// 				onClick={e => {
// 					// do not close modal if anything inside modal content is clicked
// 					e.stopPropagation();
// 				}}
// 			>
// 				<button onClick={close}>Close</button>
// 				{children}
// 			</Bbbb>
// 		</Aaaa>
// 	) : null;
// }
