import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	locations: [{ id: 1, x: 10, y: 10 }],

	cards: [
		{ id: 1, locationId: 1, order: 1 },
		{ id: 2, locationId: 1, order: 2 },
	],

	sides: [
		{ cardId: 1, side: "front" },
		{ cardId: 1, side: "back" },
		{ cardId: 2, side: "front" },
		{ cardId: 2, side: "back" },
	],
};

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = editorSlice.actions;

export default editorSlice.reducer;
