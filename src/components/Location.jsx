import { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.css";

const Location = (props) => {
	const { children } = props;

	const ref = useRef();

	return (
		<Draggable nodeRef={ref}>
			<div ref={ref} className={styles.location}>
				<div className={styles["location-cards"]}>{children}</div>
			</div>
		</Draggable>
	);
};

export default Location;
