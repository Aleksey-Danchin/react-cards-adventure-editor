import { createContext } from "react";
import { useBackspace } from "../hooks";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const CardContext = createContext();

const Card = (props) => {
	const { front, back } = props;

	const backspace = useBackspace();

	const value = useMemo(
		() => ({
			width: props?.width ?? backspace.cardWidth,
			height: props?.height ?? backspace.cardHeight,
		}),
		[backspace.cardHeight, backspace.cardWidth, props?.height, props?.width]
	);

	return (
		<CardContext.Provider value={{ value }}>
			<div className={styles.card}>
				{front}
				{back}
			</div>
		</CardContext.Provider>
	);
};

export default Card;

Card.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
