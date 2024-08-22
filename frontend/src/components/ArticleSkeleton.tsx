
export const ArticleSkeleton= () => {
    return <div className="animate-pulse">
    <div className="flex justify-center gap-x-10 px-8">
        <div className="h-full w-[75vh] overflow-y-auto">
            <div className="h-10 bg-gray-200 rounded-full mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-full"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-full"></div>
            <div className="h-6 bg-gray-200 rounded-full mb-4 w-3/4"></div>
        </div>
        <div className="hidden lg:block w-96">
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