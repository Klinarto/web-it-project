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
import mapStyle from "../../utilities/Mapstyle";
import { objectIsEmpty, calculateDistance } from "../../utilities/Utils";

export default function Map() {
	// used to center map, default center is Melbourne
	const [center, setCenter] = useState({ lat: -37.8136, lng: 144.9631 });
	// used to ste zoom level in maps
	const [zoom, setZoom] = useState(15);

	// used for infowindow marker
	const [selected, setSelected] = useState(null);

	// stores current location in latlng object (e.g. {lat: number, lng: number})
	const [currentLocation, setCurrentLocation] = useState({});

	// from @react-google-maps/api
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GMAP_KEY,
	});

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

	// when the map loads, create a ref to the map to avoid re-renders
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

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
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={zoom}
				options={options}
				onLoad={onMapLoad}
			>
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
				</div>
			) : null}
		</Fragment>
	);
}
