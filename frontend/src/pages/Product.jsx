import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import ProductReviews from '../components/product/ProductReviews';
import SizeGuide from '../components/product/SizeGuide';
import SEO from '../components/ui/SEO';

const Product = () => {
	const { slug } = useParams();
	const product = useMemo(
		() => mockProducts.find((p) => p.slug === slug),
		[slug]
	);

	const { addToCart } = useCart();
	const { toggleWishlist, isInWishlist } = useWishlist();

	const [activeImage, setActiveImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
	const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
	const [quantity, setQuantity] = useState(1);
	const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

	if (!product) {
		return (
			<section className="section-padding">
				<div className="container-custom text-center">
					<h1 className="text-2xl md:text-3xl font-display font-semibold mb-3">Product not found</h1>
					<p className="text-gray-600 mb-6">The product you're looking for does not exist or has been moved.</p>
					<Link to="/shop">
						<Button>Back to Shop</Button>
					</Link>
				</div>
			</section>
		);
	}

	const related = useMemo(() => {
		return mockProducts
			.filter((p) => p._id !== product._id && p.category === product.category)
			.slice(0, 4);
	}, [product]);

	const priceToShow = product.salePrice ?? product.price;

	const handleAddToCart = () => {
		// Require selections if options are available
		const size = product.sizes?.length ? selectedSize : null;
		const colorName = product.colors?.length ? selectedColor?.name : null;
		addToCart(product, quantity, size, colorName);
	};

	const increment = () => setQuantity((q) => q + 1);
	const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

	return (
		<>
			<SEO 
				title={`${product.name} | ANGAL`}
				description={product.description}
				keywords={`${product.category}, ${product.name}, fashion, streetwear, ${product.sizes?.join(', ')}`}
				canonicalUrl={`/product/${product.slug}`}
				image={product.images?.[0]}
			/>
			<section className="section-padding">
			<div className="container-custom">
				{/* Breadcrumbs */}
				<nav className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
					<Link to="/" className="hover:text-black">Home</Link>
					<span className="mx-2">/</span>
					<Link to={`/shop/${product.category?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black">
						{product.category}
					</Link>
					<span className="mx-2">/</span>
					<span className="text-black">{product.name}</span>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Gallery */}
					<div>
						<div className="aspect-[3/4] bg-neutral relative overflow-hidden">
							<motion.img
								key={activeImage}
								initial={{ opacity: 0, scale: 1.02 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4 }}
								src={product.images[activeImage]}
								alt={`${product.name} - ${activeImage + 1}`}
								className="w-full h-full object-cover"
							/>
						</div>

						{product.images?.length > 1 && (
							<div className="grid grid-cols-4 gap-3 mt-4">
								{product.images.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setActiveImage(idx)}
										className={`relative aspect-[3/4] overflow-hidden border ${
											activeImage === idx ? 'border-black' : 'border-transparent'
										} hover:border-black transition-colors`}
										aria-label={`View image ${idx + 1}`}
									>
										<img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
									</button>
								))}
							</div>
						)}
					</div>

					{/* Info + Actions */}
					<div className="lg:pl-6 lg:sticky lg:top-24 self-start">
						{/* Title */}
						<h1 className="text-2xl md:text-4xl font-display font-semibold mb-2">{product.name}</h1>

						{/* Rating */}
						<div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
							<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
							<span>{product.rating}</span>
							<span className="text-gray-400">·</span>
							<span>{product.reviewCount} reviews</span>
						</div>

						{/* Price */}
						<div className="flex items-center gap-3 mb-6">
							<span className="text-2xl font-semibold">{formatPrice(priceToShow)}</span>
							{product.salePrice && (
								<span className="text-gray-500 line-through">{formatPrice(product.price)}</span>
							)}
						</div>

						{/* Colors */}
						{product.colors?.length > 0 && (
							<div className="mb-6">
								<p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">Color</p>
								<div className="flex items-center gap-2">
									{product.colors.map((c) => (
										<button
											key={c.name}
											onClick={() => setSelectedColor(c)}
											className={`w-9 h-9 rounded-full border ${
												selectedColor?.name === c.name ? 'border-black ring-1 ring-black' : 'border-gray-300'
											}`}
											style={{ backgroundColor: c.value }}
											title={c.name}
											aria-label={c.name}
										/>)
									)}
								</div>
							</div>
						)}

						{/* Sizes */}
						{product.sizes?.length > 0 && (
							<div className="mb-6">
								<div className="flex items-center justify-between mb-2">
									<p className="text-xs uppercase tracking-[0.2em] text-gray-600">Size</p>
									<button
										onClick={() => setIsSizeGuideOpen(true)}
										className="text-xs uppercase tracking-[0.2em] text-accent hover:underline"
									>
										Size Guide
									</button>
								</div>
								<div className="flex flex-wrap gap-2">
									{product.sizes.map((s) => (
										<button
											key={s}
											onClick={() => setSelectedSize(s)}
											className={`px-4 py-2 border text-sm uppercase tracking-wider ${
												selectedSize === s ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'
											}`}
										>
											{s}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Quantity + Wishlist */}
						<div className="flex items-center gap-4 mb-6">
							<div className="inline-flex items-center border border-gray-300">
								<button onClick={decrement} className="p-2 hover:bg-gray-100" aria-label="Decrease quantity">
									<Minus className="w-4 h-4" />
								</button>
								<span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
								<button onClick={increment} className="p-2 hover:bg-gray-100" aria-label="Increase quantity">
									<Plus className="w-4 h-4" />
								</button>
							</div>

							<button
								onClick={() => toggleWishlist(product)}
								className={`p-3 rounded-full border transition-colors ${
									isInWishlist(product._id) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 hover:border-black'
								}`}
								aria-label="Add to wishlist"
								title={isInWishlist(product._id) ? 'In wishlist' : 'Add to wishlist'}
							>
								<Heart className="w-5 h-5" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
							</button>
						</div>

						{/* Add to cart */}
						<div className="mb-8">
							<Button
								onClick={handleAddToCart}
								className="w-full flex items-center justify-center gap-2"
								disabled={!product.inStock}
								icon={ShoppingCart}
								iconPosition="left"
							>
								{product.inStock ? 'Add to Cart' : 'Out of Stock'}
							</Button>
						</div>

						{/* Description / Details */}
						<div className="space-y-4">
							<details className="border-b pb-4" open>
								<summary className="cursor-pointer list-none flex items-center justify-between py-2">
									<span className="text-sm uppercase tracking-[0.2em]">Description</span>
									<span className="text-xl">+</span>
								</summary>
								<p className="text-gray-700 leading-relaxed mt-2">{product.description}</p>
							</details>

							<details className="border-b pb-4">
								<summary className="cursor-pointer list-none flex items-center justify-between py-2">
									<span className="text-sm uppercase tracking-[0.2em]">Composition & Care</span>
									<span className="text-xl">+</span>
								</summary>
								<ul className="text-gray-700 mt-2 list-disc list-inside space-y-1">
									<li>Fabric: 100% premium cotton blend</li>
									<li>Care: Machine wash cold, gentle cycle</li>
									<li>Do not bleach; line dry; cool iron if needed</li>
									<li>Made in EU</li>
								</ul>
							</details>

							<details className="border-b pb-4">
								<summary className="cursor-pointer list-none flex items-center justify-between py-2">
									<span className="text-sm uppercase tracking-[0.2em]">Shipping & Returns</span>
									<span className="text-xl">+</span>
								</summary>
								<p className="text-gray-700 mt-2">
									Free shipping on orders over €100. Returns accepted within 30 days in original condition.
								</p>
							</details>
						</div>
					</div>
				</div>

				{/* Customer Reviews */}
				<ProductReviews productId={product._id} productName={product.name} />

				{/* Related products */}
				{related.length > 0 && (
					<div className="mt-16">
						<h2 className="text-xl md:text-2xl font-display font-semibold mb-6 text-center">You may also like</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
							{related.map((p, idx) => (
								<ProductCard key={p._id} product={p} index={idx} />
							))}
						</div>
					</div>
				)}
			</div>

			{/* Size Guide Modal */}
			<SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
			</section>
		</>
	);
};

export default Product;
