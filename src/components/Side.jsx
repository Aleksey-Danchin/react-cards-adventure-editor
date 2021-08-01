import styles from "./styles.module.css";
import { useBackspace } from "../hooks";
import { useMemo } from "react";

const Side = (props) => {
	const { width, height, scale } = useBackspace();

	const style = useMemo(
		() => ({
			width: `${width * scale}px`,
			height: `${height * scale}px`,
		}),
		[width, height, scale]
	);

	return <div className={styles.side} style={style}></div>;
};

export default Side;
