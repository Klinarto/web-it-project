import React, { useState } from "react";
// import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import { Fragment } from "react";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
export default function MenuItemModal(props) {
	const { open, setOpen, item, returnQuantity } = props;

	const [quantity, setQuantity] = useState(0);

	const handleClose = () => {
		setQuantity(0);
		setOpen(false);
	};

	const sendQuantityToParent = () => {
		returnQuantity(quantity);

		handleClose();
	};
	return (
		<Fragment>
			{/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open dialog
			</Button> */}
			<Dialog
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}
				maxWidth={"md"}
			>
				{" "}
				<div style={{ display: "flex" }}>
					<IconButton
						onClick={() => handleClose()}
						style={{ position: "absolute", top: "-1%", left: "-1%" }}
					>
						<CloseIcon></CloseIcon>
					</IconButton>

					<div
						style={{
							margin: "2% 5%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{" "}
						<div>
							<h1>{item.name}</h1>
							<h2>{item.price}</h2>
							<p>{item.detail}</p>
						</div>
						<TextField
							id="outlined-multiline-static"
							label="Add a note"
							multiline
							rows={4}
							placeholder="More sugar"
							variant="outlined"
						/>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "10% 0%",
							}}
						>
							<IconButton
								aria-label="Remove"
								onClick={() => {
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
									setQuantity(quantity + 1);
								}}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "auto",
							}}
						>
							<button onClick={() => sendQuantityToParent()}>
								Add {quantity > 0 ? quantity : null} to cart
								{quantity > 0 ? ` • $${quantity * 4.5}` : null}
							</button>
						</div>
					</div>

					<div>
						<div>
							<img
								src={item.image}
								alt=""
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									overflow: "hidden",
									height: "80vh",
								}}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</Fragment>
	);
}
