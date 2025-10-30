import { useCart } from '../context/CartContext';
import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';

const Checkout = () => {
	const { cart, cartTotal, clearCart } = useCart();
	const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });
	const [placed, setPlaced] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handlePlaceOrder = () => {
		setPlaced(true);
		clearCart();
	};

	if (placed) {
		return (
			<section className="section-padding min-h-screen bg-white">
				<div className="container-custom text-center">
					<h1 className="text-2xl md:text-4xl font-display font-semibold mb-6">Order Placed!</h1>
					<p className="text-gray-600 mb-6">Thank you for your purchase. You will receive a confirmation email soon.</p>
				</div>
			</section>
		);
	}

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-2xl mx-auto">
				<h1 className="text-2xl md:text-4xl font-display font-semibold mb-8">Checkout</h1>
				<form className="space-y-6 mb-8">
					<Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
					<Input label="Email" name="email" value={form.email} onChange={handleChange} required type="email" />
					<Input label="Address" name="address" value={form.address} onChange={handleChange} required />
					<div className="flex gap-4">
						<Input label="City" name="city" value={form.city} onChange={handleChange} required />
						<Input label="ZIP" name="zip" value={form.zip} onChange={handleChange} required />
					</div>
				</form>
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-2">Order Summary</h2>
					<ul className="mb-2">
						{cart.map((item) => (
							<li key={item.cartId} className="flex justify-between text-sm mb-1">
								<span>{item.name} x{item.quantity}</span>
								<span>{formatPrice(item.price * item.quantity)}</span>
							</li>
						))}
					</ul>
					<span className="text-xl font-semibold">Total: {formatPrice(cartTotal)}</span>
				</div>
				<Button onClick={handlePlaceOrder} className="w-full">Place Order</Button>
			</div>
		</section>
	);
};

export default Checkout;
