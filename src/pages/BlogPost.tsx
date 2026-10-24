import { useParams } from 'react-router-dom';
import { BlogArticle } from '@/src/components/sections/insights/BlogArticle';
import { COMPANY } from '@/src/data/company';
import { getBlogPostBySlug } from '@/src/data/blog-posts';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildArticleJsonLd } from '@/src/lib/seo';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  usePageSeo({
    title: post?.seoTitle ?? `Blog | ${COMPANY.brandName}`,
    description: post?.seoDescription ?? 'Notes from the One Capital practice.',
    path: post?.href ?? '/blog',
    keywords: post ? [...post.keywords] : undefined,
    image: post?.image,
    type: 'article',
    jsonLd: post
      ? buildArticleJsonLd({
          headline: post.title,
          description: post.seoDescription,
          path: post.href,
          datePublished: post.published,
          image: post.image,
        })
      : undefined,
  });

  if (!post) return <NotFound />;

  return <BlogArticle post={post} />;
}
