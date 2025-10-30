import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import { mockProducts, mockCategories } from '../data/mockData';

const Collection = () => {
	const { slug } = useParams();
	const location = useLocation();
	const category = mockCategories.find((cat) => cat.slug === slug);
	const products = mockProducts.filter((p) =>
		category ? p.category.toLowerCase().includes(category.name.toLowerCase()) : true
	);

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
						{/* Product Count */}
						<div className="mb-8">
							<p className="text-white font-light">
								{products.length} {products.length === 1 ? 'Product' : 'Products'}
							</p>
						</div>

					{/* Product Grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
						{products.map((product, index) => (
							<ProductCard key={product._id} product={product} index={index} />
						))}
					</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Collection;
