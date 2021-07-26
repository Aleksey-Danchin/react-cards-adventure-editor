import { useContext } from "react";
import { BackspaceContext } from "../components/Backspace";

const useBackspace = () => useContext(BackspaceContext);

export default useBackspace;
