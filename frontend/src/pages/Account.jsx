import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';
import Button from '../components/ui/Button';

const TABS = [
	{ key: 'orders', label: 'Orders' },
	{ key: 'wishlist', label: 'Wishlist' },
	{ key: 'profile', label: 'Profile' },
];

const Account = () => {
	const { user, logout } = useAuth();
	const [tab, setTab] = useState('orders');

	if (!user) {
		return (
			<section className="section-padding min-h-screen bg-white">
				<div className="container-custom text-center">
					<h1 className="text-2xl md:text-4xl font-display font-semibold mb-6">Account</h1>
					<p className="text-gray-600 mb-6">Please log in to view your account.</p>
					<Button as="a" href="/login">Login</Button>
				</div>
			</section>
		);
	}

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em]">Account</h1>
					<Button variant="secondary" onClick={logout}>Logout</Button>
				</div>
				<div className="flex gap-4 mb-8">
					{TABS.map((t) => (
						<button
							key={t.key}
							onClick={() => setTab(t.key)}
							className={`px-4 py-2 text-xs uppercase tracking-wider border rounded-full font-light transition-colors duration-200 ${tab === t.key ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-neutral'}`}
						>
							{t.label}
						</button>
					))}
				</div>
				<div>
					{tab === 'orders' && (
						<div>
							<h2 className="text-lg font-semibold mb-4">Your Orders</h2>
							{mockOrders.length === 0 ? (
								<p className="text-gray-600">No orders yet.</p>
							) : (
								<ul className="space-y-4">
									{mockOrders.map((order) => (
										<li key={order._id} className="border p-4 rounded">
											<div className="flex justify-between mb-2">
												<span className="font-semibold">Order #{order.orderNumber}</span>
												<span className="text-xs text-gray-500">{order.status}</span>
											</div>
											<div className="text-sm text-gray-600 mb-2">{order.items.length} item(s)</div>
											<div className="text-sm">Total: <span className="font-semibold">€{order.total}</span></div>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
					{tab === 'wishlist' && (
						<div>
							<h2 className="text-lg font-semibold mb-4">Wishlist</h2>
							<p className="text-gray-600">Wishlist functionality coming soon.</p>
						</div>
					)}
					{tab === 'profile' && (
						<div>
							<h2 className="text-lg font-semibold mb-4">Profile</h2>
							<p className="text-gray-600">Profile editing coming soon.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Account;
