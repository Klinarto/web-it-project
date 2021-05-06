import React, { useState, Fragment, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Grid } from "@material-ui/core";

export default function Vans() {
	const [center, setCenter] = useState({ lat: -37.8136, lng: 144.9631 });
	const [zoom, setZoom] = useState(15);
	const [vendors, setVendors] = useState([]);
	const [markers, setMarkers] = useState([]);

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	useEffect(() => {
		const fetchVendors = async () => {
			// console.log("Fetching vendors");
			try {
				const res = await axios.get("/vendor");

				// for (const vendor of res.data) {
				// 	console.log(vendor);
				// 	if (vendor.status == "open") {
				// 		setVendors((prevVendor) => [...prevVendor, vendor]);
				// 	}
				// }
				setVendors(res.data);
				// console.log(vendors);
			} catch (error) {
				console.log(error);
			}
		};

		fetchVendors();
		return () => {};
	}, [vendors]);

	const displayVendors = () => {
		if (vendors) {
			return vendors.map((van) => {
				return (
					<Marker
						key={van._id}
						title={van.name}
						position={{
							lat: van.location.lat,
							lng: van.location.lng,
						}}
						// icon={{
						// 	url: "../../cookieLogo.png",
						// }}
					/>
				);
			});
		}
	};

	const displayMarkers = () => {
		if (markers) {
			return markers.map((marker, key) => {
				console.log(marker);
				return (
					<Marker
						key={(marker, key)}
						position={{
							lat: marker.lat,
							lng: marker.lng,
						}}
					/>
				);
			});
		}
	};

	// if (markers[0]) console.log("Markers" + typeof markers[0].lat);
	// if (vendors[0]) console.log("Vendor" + typeof vendors[0].location.lat);

	const getCurrentLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		} else {
			console.log("Geolocation is not available");
		}
	};
	return (
		<Fragment>
			<LoadScript googleMapsApiKey={process.env.REACT_APP_GMAP_KEY}>
				<GoogleMap
					mapContainerStyle={{
						height: "100vh",
						width: "100%",
					}}
					center={center}
					zoom={zoom}
					options={options}
					// onClick={(e) => {
					// 	setMarkers((current) => [
					// 		...current,
					// 		{
					// 			lat: e.latLng.lat(),
					// 			lng: e.latLng.lng(),
					// 			time: new Date(),
					// 		},
					// 	]);
					// 	console.log(markers);
					// }}
				>
					{displayVendors()}
					{/* {displayMarkers()} */}
				</GoogleMap>
			</LoadScript>
			<div>
				<button onClick={getCurrentLocation}>Current Location</button>
			</div>
		</Fragment>
	);
}
