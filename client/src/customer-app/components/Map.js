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
import mapStyle from "../utilities/Mapstyle";
import haversine from "haversine-distance";
import { objectIsEmpty } from "../utilities/Utils";

export default function Map() {
	const [center, setCenter] = useState({ lat: -37.8136, lng: 144.9631 });
	const [zoom, setZoom] = useState(15);
	const [vendors, setVendors] = useState([]);
	const [selected, setSelected] = useState(null);
	const [currentLocation, setCurrentLocation] = useState({});

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GMAP_KEY,
	});

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

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
		styles: mapStyle,
	};

	const mapRef = useRef();

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

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
					/>
				);
			});
		}
	};

	const displayVendorButtons = () => {
		if (vendors) {
			return vendors.map((vendor) => {
				const location = {
					lat: vendor.location.lat,
					lng: vendor.location.lng,
				};
				return (
					<div>
						<button
							key={vendor._id}
							onClick={() => {
								console.log(location);
								panTo(location);
							}}
						>
							{vendor.name}
						</button>
						<p>
							Distance: {distanceToCurrentLocation(currentLocation, location)}
						</p>
					</div>
				);
			});
		}
	};

	const distanceToCurrentLocation = (to, from) => {
		if (!objectIsEmpty(to) && !objectIsEmpty(from)) {
			return calculateDistance(to, from);
		}
	};

	const displayCurrentLocation = () => {
		if (!objectIsEmpty(currentLocation)) {
			return (
				<Marker
					title={"Current location"}
					position={currentLocation}
					onClick={() => {
						setSelected({
							location: currentLocation,
							name: "current location",
							locationDetails: "",
						});
					}}
				/>
			);
		}
	};

	const from = { lat: -37.8136, lng: 144.9631 };
	const to = { lat: -33.8688, lng: 151.2093 };

	// calculate distance (in meters) between two latlng points
	const calculateDistance = (to, from) => {
		return haversine(to, from);
	};

	// get current location of user
	const getCurrentLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				if (position.coords) {
					const location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					setCurrentLocation(location);
					panTo(location);
					console.log(currentLocation);
				}
			});
		} else {
			console.log("Geolocation is not available");
		}
	};

	// render the map
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
				{displayCurrentLocation()}
			</GoogleMap>
		);
	};

	if (loadError) {
		return <h3>Unable to load map</h3>;
	}

	const loadingDiv = (
		<div>
			<h1>Loading</h1>
		</div>
	);
	return (
		<Fragment>
			{isLoaded ? renderMap() : loadingDiv}
			{isLoaded ? (
				<div>
					<button
						onClick={() => {
							getCurrentLocation();
						}}
					>
						Current Location
					</button>
					{displayVendorButtons()}
					<button
						onClick={() => {
							const dist = calculateDistance(from, to);
							console.log(dist);
						}}
					>
						Calculate Distance
					</button>
				</div>
			) : null}
		</Fragment>
	);
}
