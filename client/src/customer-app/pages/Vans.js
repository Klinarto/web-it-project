import React, {
	useState,
	Fragment,
	useEffect,
	useCallback,
	useRef,
} from "react";
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";

const libraries = ["geometry"];

export default function Vans() {
	const [center, setCenter] = useState({ lat: -37.8136, lng: 144.9631 });
	const [zoom, setZoom] = useState(15);
	const [vendors, setVendors] = useState([]);
	const [selected, setSelected] = useState(null);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GMAP_KEY,
		libraries,
	});

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	useEffect(() => {
		let isMounted = true;
		const fetchVendors = async () => {
			try {
				const res = await axios.get("/vendor");
				if (isMounted) {
					setVendors(res.data);
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

	const displayVendors = () => {
		if (vendors) {
			return vendors.map((vendor) => {
				return (
					<Marker
						key={vendor._id}
						title={vendor.name}
						position={{
							lat: vendor.location.lat,
							lng: vendor.location.lng,
						}}
						onClick={() => {
							setSelected(vendor);
						}}
						// icon={{
						// 	url: "../../cookieLogo.png",
						// }}
					/>
				);
			});
		}
	};

	const displayVendorButtons = () => {
		if (vendors) {
			return vendors.map((vendor) => {
				return (
					<button
						key={vendor._id}
						onClick={() => {
							panTo({
								lat: vendor.location.lat,
								lng: vendor.location.lng,
							});
						}}
					>
						{vendor.name}
					</button>
				);
			});
		}
	};

	const calculateDistance = () => {
		const from = { lat: -37.8136, lng: 144.9631 };
		const to = { lat: -33.8688, lng: 151.2093 };
		console.log(mapRef);
		// const distance = mapRef.geometry.spherical.computeDistanceBetween(from, to);
		// console.log(distance);
	};

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
	const renderMap = () => {
		return (
			<GoogleMap
				mapContainerStyle={{
					height: "80vh",
					width: "100%",
				}}
				center={center}
				zoom={zoom}
				options={options}
				onLoad={onMapLoad}
			>
				{displayVendors()}
				{selected ? (
					<InfoWindow
						position={{
							lat: selected.location.lat,
							lng: selected.location.lng,
						}}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<div>
							<h2>{selected.name}</h2>
							<p>{selected.locationDetails}</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		);
	};

	if (loadError) {
		return <h3>Unable to load map</h3>;
	}

	return (
		<Fragment>
			{isLoaded ? renderMap() : <h1>Loading</h1>}
			<div>
				<button onClick={getCurrentLocation}>Current Location</button>
				{displayVendorButtons()}
				<button onClick={calculateDistance}>Calculate Distance</button>
			</div>
		</Fragment>
	);
}
