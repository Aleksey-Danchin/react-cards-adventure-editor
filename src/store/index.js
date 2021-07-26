import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editor";

const store = configureStore({
	reducer: {
		editor: editorReducer,
	},
});

export default store;
