import React, {
	useState,
	Fragment,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import mapStyle from "../../utilities/Mapstyle";
import useCurrentLocation from "./useCurrentLocation";
import { calculateDistance } from "../../utilities/Utils";

export default function Map(props) {
	// used to center map, default center is Melbourne
	const [center, setCenter] = useState(null);
	// used to ste zoom level in maps
	const [zoom] = useState(15);

	// stores current location in latlng object (e.g. {lat: number, lng: number})
	const currentLocation = useCurrentLocation();

	const [data, setData] = useState(null);

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
		height: "calc(100vh - 64px - 3vh)",
		width: "100%",
		// height: "95vh",
		// width: "100%",
	};

	const mapRef = useRef();
	const selected = props.selected;
	const setSelected = props.setSelected;
	const setOpen = props.setOpen;

	// const getCurrentLocation = useCallback(() => {
	// 	if ("geolocation" in navigator) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				const location = {
	// 					lat: position.coords.latitude,
	// 					lng: position.coords.longitude,
	// 				};
	// 				setCurrentLocation(location);
	// 			},
	// 			(error) => {
	// 				console.warn(`Error(${error.code}): ${error.message}`);
	// 			},
	// 			{ enableHighAccuracy: true, timeout: 5000 }
	// 		);
	// 	} else {
	// 		console.log("Geolocation is not available");
	// 	}
	// }, []);

	useEffect(() => {
		let mounted = true;

		if (mounted && props.data) {
			setData(props.data);
			// console.log(data);
		}
		return () => {};
	}, [props.data, data]);

	useEffect(() => {
		if (currentLocation) {
			setCenter(currentLocation);
		} else {
			setCenter({ lat: -37.8136, lng: 144.9631 });
		}
		return () => {};
	}, [currentLocation]);

	// when the map loads, create a ref to the map to avoid re-renders
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const displayCurrentLocation = () => {
		if (currentLocation) {
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

	const displayData = () => {
		if (data) {
			return data.map((element) => {
				return (
					<Marker
						onClick={() => {
							setSelected(element);
							setOpen(true);
						}}
						key={element.id}
						title={element.name}
						position={{ lat: element.location.lat, lng: element.location.lng }}
					/>
				);
			});
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
				{displayData()}
				{selected
					? // <InfoWindow
					  // 	position={{
					  // 		lat: selected.location.lat,
					  // 		lng: selected.location.lng,
					  // 	}}
					  // 	onCloseClick={() => {
					  // 		setSelected(null);
					  // 	}}
					  // >
					  // 	<div>
					  // 		<div><h2>{selected.name}</h2>
					  // 			<p>{selected.locationDetails}</p></div>
					  // 	</div>
					  // </InfoWindow>
					  ""
					: null}
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
	return <Fragment>{isLoaded ? renderMap() : loadingDiv}</Fragment>;
}
