import { useCallback } from "react";
import { useRef } from "react";
import { useState, createContext } from "react";
import styles from "./styles.module.css";

import PropTypes from "prop-types";

export const BackspaceContext = createContext();

const Backspace = (props) => {
	const { children, cardWidth, cardHeight } = props;

	const ref = useRef();

	const [value, setValue] = useState({
		offsetX: 0,
		offsetY: 0,
		scale: 1,
		cardWidth,
		cardHeight,
	});

	const [mouse, setMouse] = useState({
		dragging: false,
		startX: 0,
		startY: 0,
	});

	const mouseMoveHandler = useCallback(
		(e) => {
			if (!mouse.dragging || !ref.current) {
				return;
			}

			setValue((value) => ({
				...value,
				offsetX: Math.max(0, value.offsetX + e.clientX - mouse.startX),
				offsetY: Math.max(0, value.offsetY + e.clientY - mouse.startY),
			}));

			setMouse((mouse) => ({
				...mouse,
				startX: e.clientX,
				startY: e.clientY,
			}));
		},
		[mouse.dragging, mouse.startX, mouse.startY]
	);

	const mouseDownHandler = useCallback((e) => {
		if (!ref.current) {
			return;
		}

		setMouse((mouse) => ({
			...mouse,
			dragging: e.target === ref.current,
			startX: e.clientX,
			startY: e.clientY,
		}));
	}, []);

	const mouseUpHandler = useCallback((e) => {
		if (!ref.current) {
			return;
		}

		setMouse((mouse) => ({
			...mouse,
			dragging: false,
		}));
	}, []);

	const mouseLeaveHandler = useCallback((e) => {
		setMouse((mouse) => ({
			...mouse,
			dragging: false,
		}));
	}, []);

	const wheelHandler = useCallback((e) => {
		const dir = Math.sign(e.deltaY);

		setValue((value) => ({
			...value,
			scale: Math.max(1, Math.min(20, value.scale * 10 + dir)) / 10,
		}));
	}, []);

	return (
		<BackspaceContext.Provider value={value}>
			<div
				ref={ref}
				className={styles.backspace}
				onMouseMove={mouseMoveHandler}
				onMouseDown={mouseDownHandler}
				onMouseUp={mouseUpHandler}
				onMouseLeave={mouseLeaveHandler}
				onWheel={wheelHandler}
			>
				{children}
			</div>
		</BackspaceContext.Provider>
	);
};

export default Backspace;

Backspace.propTypes = {
	cardWidth: PropTypes.number.isRequired,
	cardHeight: PropTypes.number.isRequired,
};

Backspace.defaultProps = {
	cardWidth: 100,
	cardHeight: 75,
};
