import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: [],
	amount: 0,
	total: 0,
	isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
	try {
		// console.log(name);
		// console.log(thunkAPI);
		// console.log(thunkAPI.getState());
		// thunkAPI.dispatch(openModal());
		const response = await axios(url);

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Something went wrong');
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Object is mutable because of immex library (integrated in Redux)
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const itemID = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemID);
		},
		increase: (state, action) => {
			const itemID = action.payload;
			// Since cartItem is a complex value (object), it will reference the original and not a copy (as primitive types).
			// Mutation is possible.
			const cartItem = state.cartItems.find((item) => item.id === itemID);
			cartItem.amount += 1;
		},
		decrease: (state, action) => {
			const itemID = action.payload;
			// Same as above
			const cartItem = state.cartItems.find((item) => item.id === itemID);
			cartItem.amount -= 1;
		},
		calculateTotals: (state) => {
			const { amount, total } = state.cartItems.reduce(
				(acc, item) => {
					const { amount, price } = item;
					acc.amount += amount;
					acc.total += amount * price;
					return acc;
				},
				{ amount: 0, total: 0 }
			);

			state.amount = amount;
			state.total = parseFloat(total).toFixed(2);
		},
	},
	extraReducers: {
		[getCartItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const { clearCart, removeItem, decrease, increase, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
