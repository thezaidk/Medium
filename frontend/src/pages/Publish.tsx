import { Appbar } from "@/components/Appbar";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import { useUser } from "@/hooks";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { user, userLoading } = useUser();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token === "") {
            navigate("/signin");
        }
    }, [navigate]);

    useEffect(() => {
        if (id) {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(getResponse => {
                setTitle(getResponse.data.post.title);
                setDescription(getResponse.data.post.content);
            }).catch(error => {
                console.error("Error fetching blog details:", error);
                navigate("/signin"); // In case the token is invalid
            });
        }
    }, [id, navigate]);

    const onPost = async () => {
        if (title === "" || description === "") {
            alert("Complete your story");
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content: description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            navigate(`/blog/${response.data.id}`);

        } catch (error) {
            console.error("Error posting the blog:", error);
        }
    }

    if (userLoading) {
        return (
            <div>
                <Appbar currentPath={location.pathname} userInfo={user} />
                <ArticleSkeleton />
            </div>
        );
    }

    return (
        <div>
            <Appbar currentPath={location.pathname} userInfo={user} />
            <div className="flex justify-start sm:justify-center items-center px-2">
                <CirclePlus className="hidden sm:flex" strokeWidth={1} size={30} />
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    className="w-full max-w-3xl px-10 md:px-2 text-gray-900 dark:text-gray-200 dark:bg-inherit text-5xl font-semibold rounded-lg focus:outline-none"
                    placeholder="Title"
                    required
                />
            </div>
            <div className="block sm:flex px-2 justify-center">
                <div className="w-full max-w-2xl ">
                    <Editor
                        onChange={(content: string) => setDescription(content)} 
                        initialContent={description} 
                        editable={true}
                    />
                </div>
                <div>
                    <Button size="lg" className="mx-10 mt-3" onClick={onPost}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
};
