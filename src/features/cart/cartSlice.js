import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
	cartItems: cartItems,
	amount: 0,
	total: 0,
	isLoading: true,
};

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
});

export const { clearCart, removeItem, decrease, increase, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
