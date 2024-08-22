import { Appbar } from "@/components/Appbar"
import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config";
import { useUser } from "@/hooks"
import axios from "axios";
import { ClipboardPen } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { user} = useUser();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(getResponse => {
            setTitle(getResponse.data.post.title);
            setDescription(getResponse.data.post.content || '');
        }).catch(error => {
            console.error("Error fetching blog details:", error);
            navigate("/signin"); // In case the token is invalid
        });
    }, [id, navigate]);

    const onUpdate = async () => {
        await axios.put(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content: description,
            id: id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        navigate(`/blog/${id}`);
    }

    return (
        <div>
            <Appbar currentPath={location.pathname} userInfo={user} />
            <div className="block sm:flex justify-center items-center">
                <ClipboardPen
                    strokeWidth={2}
                    size={30}
                    className="hidden sm:block ml-5"
                />
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    className="w-full max-w-2xl px-10 md:px-2 text-gray-900 dark:text-gray-200 dark:bg-inherit text-5xl font-semibold rounded-lg focus:outline-none"
                    placeholder="Title"
                    required
                />
            </div>
            <div className="block sm:flex justify-center">
                <div className="w-full max-w-2xl px-2 sm:px-10">
                    <Editor 
                        onChange={(content: string) => setDescription(content)} 
                        initialContent={description}
                    />
                </div>
                <div>
                    <Button size="lg" className="mx-10 mt-3" onClick={onUpdate}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}