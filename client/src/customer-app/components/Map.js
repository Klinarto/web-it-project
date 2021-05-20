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
import { objectIsEmpty, calculateDistance } from "../utilities/Utils";

export default function Map() {
	// used to center map, default center is Melbourne
	const [center, setCenter] = useState({ lat: -37.8136, lng: 144.9631 });
	// used to ste zoom level in maps
	const [zoom, setZoom] = useState(15);

	// array of vendors
	const [vendors, setVendors] = useState([]);

	// used for infowindow marker
	const [selected, setSelected] = useState(null);

	// stores current location in latlng object (e.g. {lat: number, lng: number})
	const [currentLocation, setCurrentLocation] = useState({});

	// from @react-google-maps/api
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GMAP_KEY,
	});

	useEffect(() => {
		// used for cleanup
		let isMounted = true;

		// fetch list of vendors from db
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

	// googleMap component options
	const options = {
		disableDefaultUI: true,
		zoomControl: true,
		gestureHandling: "greedy",
		// uses custom map style stored in mapStyle
		styles: mapStyle,
	};

	const mapContainerStyle = {
		height: "95vh",
		width: "100%",
	};

	const mapRef = useRef();

	// when the map loads, create a ref to the map to avoid re-renders
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	// display vendors as markers in the map
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
					<div key={vendor._id}>
						<button
							onClick={() => {
								console.log(location);
								panTo(location);
							}}
						>
							{vendor.name}
						</button>
						{/* Print distance from current location to vendor */}
						<p>Distance: {calculateDistance(currentLocation, location)}</p>
					</div>
				);
			});
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
				mapContainerStyle={mapContainerStyle}
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

	// temp loading div
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
				</div>
			) : null}
		</Fragment>
	);
}
