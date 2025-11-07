import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductCard from '../components/shop/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import { categoriesAPI, productsAPI } from '../lib/api';

const Collection = () => {
	const { slug } = useParams();
	const location = useLocation();
	const [category, setCategory] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const { data: cat } = await categoriesAPI.getBySlug(slug);
				setCategory(cat);
				const res = await productsAPI.getByCategory(slug);
				setProducts(res.data || []);
			} catch (e) {
				console.error('Failed to load collection', e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [slug]);

	// Determine parent category
	const isNewArrivals = location.pathname.startsWith('/new-arrivals');
	const isCollections = location.pathname.startsWith('/collections');
	
	const breadcrumbs = [];
	if (isNewArrivals) {
		breadcrumbs.push({ label: 'New Arrivals', href: '/new-arrivals' });
	} else if (isCollections) {
		breadcrumbs.push({ label: 'Collections', href: '/collections' });
	}
	if (category) {
		breadcrumbs.push({ label: category.name });
	}

	// Assign background image based on category
	const getBackgroundImage = () => {
		if (!category) return '/assets/images/background1.jpeg';
		
		const backgroundMap = {
			'new-arrivals': '/assets/images/background1.jpeg',
			'tops': '/assets/images/background 2.jpg',
			'bottoms': '/assets/images/background1.jpeg',
			'outerwear': '/assets/images/background 2.jpg',
			'accessories': '/assets/images/background1.jpeg',
			'footwear': '/assets/images/background 2.jpg',
		};
		
		return backgroundMap[slug] || '/assets/images/background1.jpeg';
	};

	const bgImage = getBackgroundImage();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="min-h-screen relative"
		>
			{/* Full Page Background */}
			{bgImage && (
				<>
					<div 
						className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
						style={{ backgroundImage: `url(${bgImage})` }}
					/>
					<div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-0" />
				</>
			)}

			{/* Content */}
			<div className="relative z-10">
				{/* Page Header */}
				<PageHeader 
					title={category ? category.name : 'Collection'}
					subtitle={category ? `${category.description || 'Explore the latest from our collection'}` : 'Discover our curated collections.'}
					breadcrumbs={breadcrumbs}
					backgroundImage={null}
					fullScreen={true}
				/>

				{/* Products */}
				<div className="section-padding">
					<div className="container-custom">
						{loading ? (
							<div className="flex justify-center items-center py-20">
								<div className="text-center">
									<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
									<p className="text-white">Loading products...</p>
								</div>
							</div>
						) : products.length === 0 ? (
							<div className="text-center py-20">
								<h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
								<p className="text-gray-300 mb-8">This collection is currently empty. Check back soon!</p>
								<a 
									href="/shop" 
									className="inline-block px-8 py-3 bg-white text-black font-bold hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wider"
								>
									Browse All Products
								</a>
							</div>
						) : (
							<>
								{/* Product Count */}
								<div className="mb-8">
									<p className="text-white font-light text-lg">
										{products.length} {products.length === 1 ? 'Product' : 'Products'}
									</p>
								</div>

								{/* Product Grid */}
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
									{products.map((product, index) => (
										<ProductCard key={product._id} product={product} index={index} />
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Collection;
