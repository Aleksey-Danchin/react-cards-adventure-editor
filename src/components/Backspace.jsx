import { useCallback } from "react";
import { useRef } from "react";
import { useState, createContext } from "react";
import styles from "./styles.module.css";

import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { useEffect } from "react";

export const BackspaceContext = createContext();

const SCALE_STEP = 0.1;
const TOP_LEFT_POSITION = { x: 0, y: 0 };

const Backspace = (props) => {
	const { children, width, height } = props;

	const mainRef = useRef();
	const ctrlRef = useRef();

	const [value, setValue] = useState({
		scale: 1,
		width,
		height,
	});

	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const dragHandler = useCallback(
		(e, data) =>
			setOffset(({ x, y }) => ({
				x: Math.max(0, x + data.deltaX),
				y: Math.max(0, y + data.deltaY),
			})),
		[]
	);

	const wheelHandler = useCallback((e, ...args) => {
		e.preventDefault();

		const dir = Math.sign(e.deltaY);

		setValue(({ scale, ...data }) => ({
			...data,
			scale: Math.max(0.1, Math.min(1, scale + dir * SCALE_STEP)),
		}));
	}, []);

	useEffect(() => {
		const { current } = ctrlRef;

		if (current) {
			current.addEventListener("wheel", wheelHandler);

			return () => {
				current.removeEventListener("wheel", wheelHandler);
			};
		}
	}, [wheelHandler]);

	return (
		<BackspaceContext.Provider value={{ ...value, ...offset }}>
			<Draggable
				position={TOP_LEFT_POSITION}
				nodeRef={ctrlRef}
				onDrag={dragHandler}
				scale={1 / value.scale}
			>
				<div ref={ctrlRef} className={styles.backspace}></div>
			</Draggable>

			<Draggable positionOffset={offset} nodeRef={mainRef} disabled>
				<div ref={mainRef}>{children}</div>
			</Draggable>
		</BackspaceContext.Provider>
	);
};

export default Backspace;

Backspace.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

Backspace.defaultProps = {
	width: 200,
	height: 300,
};
