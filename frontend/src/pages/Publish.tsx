import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useEffect, ChangeEvent, useState } from 'react';
import { BACKEND_URL } from "../config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { user } = useUser();
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

    return (
        <div>
            <Appbar currentPath={location.pathname} userInfo={user} />
            <div className="flex justify-center w-full pt-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="mt-6 size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        value={title}
                        className="w-full text-gray-900 text-5xl font-semibold rounded-lg focus:outline-none block w-full p-2.5"
                        placeholder="Title"
                        required
                    />

                    <TextEditor value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button
                        onClick={async () => {
                            if (title === "" || description === "") {
                                alert("Complete your story");
                                return;
                            }

                            try {
                                if (location.pathname === "/publish") {
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
                                } else if (location.pathname.startsWith('/update/')) {
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

                            } catch (error) {
                                console.error("Error posting the blog:", error);
                            }
                        }}
                        type="submit"
                        className="relative inline-block text-lg group mt-4 ml-2"
                    >
                        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                            <span className="relative">Post</span>
                        </span>
                        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange, value }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, value: string }) {
    return (
        <div className="mt-2 w-full mb-16">
            <div className="flex items-center justify-between">
                <div className="rounded-b-lg pl-2 w-full">
                    <textarea
                        onChange={onChange}
                        value={value}
                        id="editor"
                        rows={12}
                        className="focus:outline-none block w-full text-xl text-gray-800 bg-white pl-2"
                        placeholder="Tell your story..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}
