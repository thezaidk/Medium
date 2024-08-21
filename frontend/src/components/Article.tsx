import { Blog } from "../hooks"
import { formatDate } from "../pages/Blogs";


export const Article= ({ blog } : { blog : Blog}) => {
    return ( 
    <div className="flex justify-center">
        <div className="grid grid-cols-12 mx-5 sm:mx-0 sm:my-10 h-screen">
            <div className="col-span-12 lg:col-span-8 pr-5 h-full overflow-y-auto">
                <div className="text-4xl font-bold">
                    { blog.title}
                </div>
                <div className="text-gray-500 dark:text-gray-300 pt-3">
                    Posted on { formatDate(blog.publishedDate) }
                </div>
                <div className="text-lg pt-8">
                    { blog.content}
                </div>
            </div>
            <div className="hidden lg:block col-span-4 pl-5 sticky top-0 self-start">
                <div className="font-semibold">Author</div> 
                <div className="flex mt-5">
                    <div>
                    <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2">{blog.author.name[0].toUpperCase()}</div>
                    </div>
                    <div className="lg:pl-5">
                        <div className="pb-1 text-xl font-bold">{ blog.author.name || "Anonymous"}</div>
                        <div className="text-gray-600 dark:text-gray-300">
                            { blog.author.bio }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}