import { useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.css";

export const BackspaceContext = createContext();

const Backspace = (props) => {
	const { children } = props;

	const [value, setValue] = useState({
		offsetX: 0,
		offsetY: 0,
		scale: 1,
	});

	const ref = useRef();

	return (
		<BackspaceContext.Provider value={value}>
			<Draggable nodeRef={ref}>
				<div
					ref={ref}
					className={styles.backspace}
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					{children}
				</div>
			</Draggable>
		</BackspaceContext.Provider>
	);
};

export default Backspace;
