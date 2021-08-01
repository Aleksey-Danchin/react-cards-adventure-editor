import styles from "./styles.module.css";

const Card = (props) => {
	const { front, back } = props;

	return (
		<div className={styles.card}>
			{front}
			{back}
		</div>
	);
};

export default Card;
