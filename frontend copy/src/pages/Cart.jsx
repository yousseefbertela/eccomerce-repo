import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
	const {
		cart,
		updateQuantity,
		removeFromCart,
		clearCart,
		cartTotal,
	} = useCart();

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom">
				<h1 className="text-2xl md:text-4xl font-display font-semibold mb-8">Your Cart</h1>
				{cart.length === 0 ? (
					<div className="text-center py-16">
						<p className="text-gray-600 mb-6">Your cart is empty.</p>
						<Link to="/shop">
							<Button>Continue Shopping</Button>
						</Link>
					</div>
				) : (
					<>
						<div className="mb-8 flex flex-col gap-6">
							{cart.map((item) => (
								<div key={item.cartId} className="flex items-center gap-6 border-b pb-6">
									<img src={item.images[0]} alt={item.name} className="w-24 h-32 object-cover rounded" />
									<div className="flex-1">
										<h2 className="text-lg font-semibold mb-1">{item.name}</h2>
										<p className="text-xs text-gray-500 mb-2">{item.category}</p>
										<div className="flex gap-2 text-xs text-gray-600 mb-2">
											{item.selectedSize && <span>Size: {item.selectedSize}</span>}
											{item.selectedColor && <span>Color: {item.selectedColor}</span>}
										</div>
										<div className="flex items-center gap-2">
											<button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
											<span className="px-3">{item.quantity}</span>
											<button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2">
										<span className="text-lg font-semibold">{formatPrice(item.price * item.quantity)}</span>
										<button onClick={() => removeFromCart(item.cartId)} className="text-xs text-red-500 hover:underline">Remove</button>
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
							<div>
								<span className="text-xl font-semibold">Subtotal: {formatPrice(cartTotal)}</span>
							</div>
							<div className="flex gap-4">
								<Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
								<Link to="/checkout">
									<Button>Checkout</Button>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
