import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mediumLogo from '../assets/medium_logo.png';
import { userInfoPros } from '../pages/Blogs';

interface AppbarProps {
    currentPath: string;
    userInfo: userInfoPros | undefined;
}

export const Appbar = ({ currentPath, userInfo }: AppbarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const appbarRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    useEffect(() => {
        const handleMouseLeave = (event: MouseEvent) => {
            if (appbarRef.current && !appbarRef.current.contains(event.relatedTarget as Node)) {
                setDropdownOpen(false);
            }
        };
        
        const appbarElement = appbarRef.current;
        if (appbarElement) {
            appbarElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (appbarElement) {
                appbarElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={appbarRef} className='items-center'>
            <div className='flex justify-between items-center pt-3'>
                <div className='flex justify-between items-center space-x-5 pl-5'>
                    <Link to={"/blogs"}>
                        <img className='w-32 h-auto object-contain cursor-pointer' src={mediumLogo} alt="Logo" />
                    </Link>
                    <div className='flex hidden sm:flex bg-gray-50 p-2 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="opacity-50">
                            <path fill="currentColor" fillRule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clipRule="evenodd"></path>
                        </svg>
                        <input className='pl-1 bg-gray-50' type="text" placeholder='Search' />
                    </div>
                </div>
                <div className='flex items-center justify-between space-x-8 mr-5'>
                    {currentPath !== "/publish" ? 
                        <a href="/publish" className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                            <span className="relative">Publish</span>
                        </a>
                    : null}
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Notifications" className="opacity-75">
                            <path stroke="currentColor" strokeLinecap="round" d="M15 18.5a3 3 0 1 1-6 0"></path>
                            <path stroke="currentColor" strokeLinejoin="round" d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 5.35 0 0 0 5.5 10.532Z"></path>
                        </svg>
                    </div>
                    <div className="relative">
                        <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2 cursor-pointer" onClick={toggleDropdown}>
                            {userInfo !== undefined ? userInfo.name[0].toUpperCase() : null}
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <div className="py-2 px-4">
                                    {userInfo?.email}
                                </div>
                                <div className="py-2 px-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100" onClick={() => {
                                    navigate('/user/blogs')
                                }}>
                                    My blogs
                                </div>
                                <div className="py-2 px-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
        </div>
    );
};
