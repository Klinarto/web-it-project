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
import {
	Container,
	Title,
	CurrentLocationButton,
	OrderButton,
	Float_Container,
	VanButton,
	VanButtonTitle,
	VanButtonDistance,
} from "../pages/Vans.style";

export default function Map() {
	// used to center map, default center is Melbourne
	const [center, setCenter] = useState();
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

	const getCurrentLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					setCurrentLocation(location);
				},
				(error) => {
					console.warn(`Error(${error.code}): ${error.message}`);
				},
				{ enableHighAccuracy: true, timeout: 5000 }
			);
		} else {
			console.log("Geolocation is not available");
		}
	}, []);

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

	useEffect(() => {
		getCurrentLocation();
		if (!objectIsEmpty(currentLocation)) {
			setCenter(currentLocation);
		} else {
			setCenter({ lat: -37.8136, lng: 144.9631 });
		}
		return () => {};
	}, [currentLocation, getCurrentLocation]);

	// googleMap component options
	const options = {
		disableDefaultUI: true,
		zoomControl: true,
		// uses custom map style stored in mapStyle
		styles: mapStyle,
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
						<VanButton
							onClick={() => {
								console.log(location);
								panTo(location);
							}}
						>
							<VanButtonTitle>{vendor.name}</VanButtonTitle>
							<VanButtonDistance>
								{" "}
								{calculateDistance(currentLocation, location)} m
							</VanButtonDistance>
						</VanButton>
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

	// render the map
	const renderMap = () => {
		return (
			<GoogleMap
				mapContainerStyle={{
					height: "100vh",
					width: "70%",
					float: "right",
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

	// temp loading div
	const loadingDiv = (
		<div>
			<h1>Loading</h1>
		</div>
	);
	return (
		<Fragment>
			<Float_Container>
				<Container>
					<div>
						<Title>Vans near you </Title>
						<CurrentLocationButton
							onClick={() => {
								getCurrentLocation();
							}}
						>
							Curr
						</CurrentLocationButton>
					</div>

					{isLoaded ? (
						<div style={{ overflowY: "scroll", height: "85vh" }}>
							{displayVendorButtons()}
						</div>
					) : null}
					<OrderButton>Order</OrderButton>
				</Container>
				{isLoaded ? renderMap() : loadingDiv}
			</Float_Container>
		</Fragment>
	);
}
