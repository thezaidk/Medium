import { BlogCard } from '../components/BlogCard';
import { Appbar } from '../components/Appbar';
import { useBlogs, useUser, useUserBlogs } from '../hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BlogSkeleton } from '../components/BlogSkeleton';

export interface userInfoPros {
    id: string;
    name: string;
    email: string;
    bio: string;
}

export const Blogs = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isUserBlogsPage = location.pathname === "/user/blogs";
    const { loading: allBlogsLoading, blogs: allBlogs } = useBlogs();
    const { loading: userBlogsLoading, blogs: userBlogs } = useUserBlogs();
    const { userLoading, user } = useUser();

    const loading = isUserBlogsPage ? userBlogsLoading : allBlogsLoading;
    const blogs = isUserBlogsPage ? userBlogs : allBlogs;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token === "") {
            navigate("/signin");
        }
    }, [navigate]);

    if (loading || userLoading) {
        return (
            <div>
                <Appbar currentPath={location.pathname} userInfo={user} />
                <div className="flex flex-col">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div>
                <Appbar currentPath={location.pathname} userInfo={user} />
                <div className='flex justify-center pt-10'>
                    <div className='text-lg font-bold'>No blog posted yet...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar currentPath={location.pathname} userInfo={user} />
            <div className='flex justify-center mt-7 sm:mt-10 mx-5 sm:mx-0'>
                <div className='max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl'>
                    {blogs.map(blog => (
                        <BlogCard 
                            key={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            id={blog.id}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={formatDate(blog.publishedDate)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
