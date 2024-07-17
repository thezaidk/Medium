import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    author: {
        name: string;
        bio: string;
    };
    id: string;
    title: string;
    content: string;
    publishedDate: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    bio: string;
}

export const useUser= () => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setUser(response.data.user)
            setUserLoading(false)
        })
    }, [])

    return {
        userLoading,
        user
    }
}

export const useUserBlogs= () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/blogs`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlogs(response.data.posts)
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog= ({ id } : { id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlog(response.data.post)
            setLoading(false)
        })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs= () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlogs(response.data.posts)
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}

