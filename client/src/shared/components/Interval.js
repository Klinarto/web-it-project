import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Time } from "./Interval.styled";

const Interval = (props) => {
	const calcTimeLeft = useCallback(() => {
		const updatedAt = new Date(props.updatedAt);
		let currentDate = new Date();
		// timeLimit is in ms
		let timeLimit = 0.5 * 60 * 1000;
		let difference = timeLimit - (currentDate - updatedAt);
		let timeLeft = null;
		if (difference > 0) {
			timeLeft = {
				min: Math.floor((difference / 1000 / 60) % 60),
				sec: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	}, [props.updatedAt]);

	const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

	const setLate = props.setLate;
	let min = 0;
	let sec = 0;

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(calcTimeLeft());
		}, 1000);

		console.log(timeLeft);

		return () => clearInterval(interval);
	}, [calcTimeLeft, timeLeft]);

	useEffect(() => {
		if (!timeLeft) {
			setLate(true);
		}
		return () => {};
	}, [setLate, timeLeft]);

	if (timeLeft) {
		min = timeLeft.min;
		sec = timeLeft.sec;
	}
	if (min < 10) {
		min = "0" + min;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}

	return (
		<Fragment>
			{timeLeft ? (
				<Time>
					<header>
						{min}:{sec}
					</header>
				</Time>
			) : null}
		</Fragment>
	);
};

export default Interval;
