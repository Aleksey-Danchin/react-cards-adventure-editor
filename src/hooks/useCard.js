import { useContext } from "react";
import { CardContext } from "../components/Card";

const useCard = () => useContext(CardContext);

export default useCard;
