
export const ArticleSkeleton= () => {
    return <div className="animate-pulse">
    <div className="grid grid-cols-12 mx-32 my-16 h-screen">
        <div className="col-span-12 lg:col-span-8 pr-5">
            <div className="h-10 bg-gray-200 rounded-full mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-full"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-full"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-3/4"></div>
        </div>
        <div className="hidden lg:block col-span-4 pl-3">
            <div className="font-semibold h-6 bg-gray-200 rounded-full w-1/4 mb-4"></div>
            <div className="flex mt-5">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                    <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
}