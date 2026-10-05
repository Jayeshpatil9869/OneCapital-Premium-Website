import { Navigate } from 'react-router-dom';
import { ProductOfferPage } from '@/src/components/sections/solutions/ProductOfferPage';
import { getProductById } from '@/src/data/products';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';

type ProductPageProps = {
  productId: string;
};

export default function ProductPage({ productId }: ProductPageProps) {
  const product = getProductById(productId);

  usePageSeo({
    title: product?.seoTitle ?? 'Our Products',
    description: product?.seoDescription ?? '',
    path: product?.path ?? '/solutions',
    keywords: product?.keywords,
    image: '/images/solutions/solutions-hub.jpg',
    type: 'product',
    jsonLd: product
      ? buildServiceJsonLd({
          name: product.title,
          description: product.seoDescription,
          path: product.path,
          serviceType: product.title,
        })
      : undefined,
  });

  if (!product) return <Navigate to="/solutions" replace />;

  return <ProductOfferPage product={product} />;
}
