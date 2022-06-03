import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, calculateTotals } from '../features/cart/cartSlice';
import CartItem from './CartItem';

const CartContainer = () => {
	const { cartItems, amount, total } = useSelector((store) => store.cart);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems, dispatch]);

	if (amount < 1) {
		return (
			<section className='cart'>
				<header>
					<h2>your bag</h2>
					<h4 className='empty-cart'>is currently empty</h4>
				</header>
			</section>
		);
	}

	return (
		<section className='cart'>
			<header>
				<h2>Your Bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<hr />
				<div className='cart-total'>
					<h4>
						Total <span>${total}</span>
					</h4>
				</div>
				<button className='btn clear-btn' onClick={() => dispatch(clearCart())}>
					Clear Cart
				</button>
			</footer>
		</section>
	);
};

export default CartContainer;
