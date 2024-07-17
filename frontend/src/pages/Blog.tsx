import { useEffect } from 'react'
import { useBlog, useUser } from "../hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Article } from "../components/Article";
import { Appbar } from "../components/Appbar";
import { ArticleSkeleton } from "../components/ArticleSkeleton";

export const Blog= () => {
    const navigate= useNavigate();
    const location= useLocation();
    const { id } = useParams();
    const { user, userLoading } = useUser();
    const {loading, blog }= useBlog({ id : id || "" });

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token || token === ""){
            navigate("/signin")
        }
    }, [navigate])

    if(loading || userLoading){
        return <div>
            <Appbar currentPath={location.pathname} userInfo={user} />
            <ArticleSkeleton />
        </div>
    }

    if(!blog){
        return (
            <div>Blog not found</div>
        )
    }

    return (
        <div>
            <Appbar currentPath={location.pathname} userInfo={user}/>
            <div className='flex justify-center mt-10'>
                <div className='max-w-sm sm:max-w-md md:max-w-xl lg:max-w-4xl'>
                    <Article blog={blog} />
                </div>
            </div>
        </div>
    )
}