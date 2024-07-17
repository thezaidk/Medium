export const BlogSkeleton = () => {
    return (
        <div className='flex justify-center mt-0'>
            <div className='max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl'></div>
                <div className="flex justify-center w-full max-w-screen-md mt-5 mx-10">
                    <div role="status" className="w-full animate-pulse">
                        <div className="flex items-center mb-4">
                            <div className="h-8 w-8 bg-gray-200 rounded-full mb-2.5 mr-3"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-48 mb-4"></div>
                        </div>
                        <div className="h-7 bg-gray-200 rounded-full w-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                        <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};
