import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from './BlogIndex';

// Article components — one import per post
import RentToOwnPost from './Blog';

const POST_COMPONENTS: Record<string, React.FC> = {
  'rent-to-own-hero-splendor-125': RentToOwnPost,
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const Component = slug ? POST_COMPONENTS[slug] : undefined;
  const meta = BLOG_POSTS.find((p) => p.slug === slug);

  if (!Component || !meta) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl font-black text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Post not found</h1>
        <p className="text-slate-500 mb-8">This article doesn't exist or may have been moved.</p>
        <Link
          to="/blog"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return <Component />;
};

export default BlogPost;
