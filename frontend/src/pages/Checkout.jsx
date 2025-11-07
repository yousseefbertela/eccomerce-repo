import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const Checkout = () => {
	const { cartDoc: cart, loading: cartLoading } = useCart();
	const { createOrder, loading: orderLoading } = useOrders();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		fullName: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		country: 'Egypt',
	});
	const [placed, setPlaced] = useState(false);
	const [orderData, setOrderData] = useState(null);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handlePlaceOrder = async (e) => {
		e.preventDefault();

		// Validate form
		if (!form.fullName || !form.phone || !form.address || !form.city) {
			toast.error('Please fill in all required fields');
			return;
		}

		// Check if cart is empty (silent check, OrderContext will show toast if needed)
		if (!cart || !cart.items || cart.items.length === 0) {
			return;
		}

		// Check authentication (silent check, OrderContext will show toast if needed)
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		try {
			// Prepare shipping address
			const shippingAddress = {
				fullName: form.fullName,
				phone: form.phone,
				address: form.address,
				city: form.city,
				postalCode: form.postalCode,
				country: form.country,
			};

			// Create order (OrderContext handles success/error toasts)
			const order = await createOrder(shippingAddress, 'cash_on_delivery');

			if (order) {
				setOrderData(order);
				setPlaced(true);
				// Redirect to order details after 3 seconds
				setTimeout(() => {
					navigate(`/account?tab=orders`);
				}, 3000);
			}
		} catch (error) {
			console.error('Failed to place order:', error);
			// OrderContext already shows error toast, no need to duplicate
		}
	};

	// Show confirmation screen
	if (placed && orderData) {
		return (
			<section className="section-padding min-h-screen bg-white">
				<div className="container-custom text-center max-w-md mx-auto">
					<div className="mb-6">
						<div className="text-5xl mb-4">✅</div>
						<h1 className="text-2xl md:text-4xl font-display font-semibold mb-2">Order Placed!</h1>
						<p className="text-gray-600 mb-4">
							Thank you for your purchase. Your order has been confirmed.
						</p>
					</div>

					<div className="bg-gray-50 p-6 rounded mb-6 text-left">
						<p className="mb-2"><strong>Order ID:</strong> {orderData._id}</p>
						<p className="mb-2"><strong>Status:</strong> {orderData.orderStatus}</p>
						<p className="mb-2"><strong>Total:</strong> {formatPrice(orderData.totalPrice)}</p>
						<p className="text-sm text-gray-600">
							You will receive a confirmation email shortly.
						</p>
					</div>

					<Button onClick={() => navigate('/account?tab=orders')} className="w-full">
						View Order
					</Button>
				</div>
			</section>
		);
	}

	// Show checkout form
	if (!cart || !cart.items || cart.items.length === 0) {
		return (
			<section className="section-padding min-h-screen bg-white">
				<div className="container-custom text-center max-w-md mx-auto">
					<h1 className="text-2xl md:text-4xl font-display font-semibold mb-6">Your Cart is Empty</h1>
					<p className="text-gray-600 mb-8">Add some items before checking out.</p>
					<Button onClick={() => navigate('/shop')} className="w-full">
						Continue Shopping
					</Button>
				</div>
			</section>
		);
	}

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-2xl mx-auto">
				<h1 className="text-2xl md:text-4xl font-display font-semibold mb-8">Checkout</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Checkout Form */}
					<form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
						<div>
							<h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
							<Input
								label="Full Name"
								name="fullName"
								value={form.fullName}
								onChange={handleChange}
								required
								placeholder="John Doe"
							/>
							<Input
								label="Phone"
								name="phone"
								value={form.phone}
								onChange={handleChange}
								required
								placeholder="+20 123 456 7890"
								type="tel"
								className="mt-4"
							/>
							<Input
								label="Address"
								name="address"
								value={form.address}
								onChange={handleChange}
								required
								placeholder="123 Main Street"
								className="mt-4"
							/>
							<div className="grid grid-cols-2 gap-4 mt-4">
								<Input
									label="City"
									name="city"
									value={form.city}
									onChange={handleChange}
									required
									placeholder="Cairo"
								/>
								<Input
									label="Postal Code"
									name="postalCode"
									value={form.postalCode}
									onChange={handleChange}
									placeholder="12345"
								/>
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium mb-2">Country</label>
								<select
									name="country"
									value={form.country}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
								>
									<option value="Egypt">Egypt</option>
									<option value="UAE">UAE</option>
									<option value="Saudi Arabia">Saudi Arabia</option>
									<option value="Kuwait">Kuwait</option>
								</select>
							</div>
						</div>

						<Button
							type="submit"
							disabled={orderLoading || cartLoading}
							className="w-full mt-8"
						>
							{orderLoading ? 'Placing Order...' : 'Place Order'}
						</Button>
					</form>

					{/* Order Summary Sidebar */}
					<div className="lg:col-span-1">
						<div className="sticky top-20 bg-gray-50 p-6 rounded">
							<h2 className="text-lg font-semibold mb-4">Order Summary</h2>

							<div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
								{cart.items?.map((item, index) => (
									<div key={index} className="flex justify-between text-sm">
										<span className="text-gray-600">
											{item.product?.name || 'Product'} x {item.quantity}
										</span>
										<span className="font-medium">
											{formatPrice(item.price * item.quantity)}
										</span>
									</div>
								))}
							</div>

							<div className="border-t border-gray-300 pt-4 space-y-2">
								<div className="flex justify-between text-sm">
									<span>Subtotal</span>
									<span>{formatPrice(cart.totalPrice || 0)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Shipping</span>
									<span>Free</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Tax</span>
									<span>{formatPrice(0)}</span>
								</div>
								<div className="border-t border-gray-300 mt-4 pt-4 flex justify-between text-lg font-semibold">
									<span>Total</span>
									<span>{formatPrice(cart.totalPrice || 0)}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
