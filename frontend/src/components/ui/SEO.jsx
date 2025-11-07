import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'E-Commerce Store - Premium Fashion',
  description = 'Discover premium fashion and lifestyle products. Shop the latest collections with free shipping.',
  keywords = 'fashion, clothing, e-commerce, shopping, premium, style',
  image = '/og-image.jpg',
  url = 'https://yourstore.com',
  type = 'website'
}) => {
  const fullTitle = title.includes('E-Commerce Store') ? title : `${title} | E-Commerce Store`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
