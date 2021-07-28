import { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.css";
import { useBackspace } from "../hooks";
import { useMemo } from "react";

const Location = (props) => {
	const { children } = props;

	const ref = useRef();
	const { offsetX, offsetY, scale } = useBackspace();

	const style = useMemo(
		() => ({
			left: `${offsetX}px`,
			top: `${offsetY}px`,
		}),
		[offsetX, offsetY]
	);

	return (
		<Draggable nodeRef={ref}>
			<div ref={ref} className={styles.location} style={style}>
				<div className={styles["location-cards"]}>{children}</div>
			</div>
		</Draggable>
	);
};

export default Location;
