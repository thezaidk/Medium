import { Link, useLocation, useNavigate } from "react-router-dom"

interface BlogCardPros {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard= ({
    id,
    authorName,
    title,
    content,
    publishedDate
} : BlogCardPros) => {

    const navigate= useNavigate();
    const location= useLocation();
    const currentPath= location.pathname;

    return (
        <div>
            
            <div>
                <div className="flex justify-start items-center">
                    <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2">{authorName[0].toUpperCase()}</div>
                    <div className="pr-2">{authorName} •</div>
                    <div className="text-gray-500 dark:text-gray-300">{publishedDate}</div>
                </div>
                <Link to={`/blog/${id}`}>
                <div>
                    <div className="text-xl font-bold mt-3">{title}</div>
                    <div className="mt-1">{content.length > 150 ?content.slice(0, 150)+"..." : content}</div>
                </div>
                </Link>
                <div className="flex justify-between pt-5">
                    <div>
                        <div className="text-gray-600 dark:text-gray-300">{Math.ceil(content.length / 100)} min read</div>
                    </div>
                    {currentPath === "/blogs" ?
                    <div className="flex space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                    : <button 
                        type="button" 
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                            navigate(`/update/${id}`)
                        }}
                        >Update</button>
                    }
                </div>
            </div>
            <div className="border-t border-gray-300 my-8"></div>
        </div>
    )
}