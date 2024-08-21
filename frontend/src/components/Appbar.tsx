import { Link } from 'react-router-dom';
import mediumLogo from '../assets/medium-logo.png';
import mediumLogoDark from '../assets/medium-logo-dark.png'
import { userInfoPros } from '../pages/Blogs';
import { ModeToggle } from './mode-toggle';
import { Bell, Search } from 'lucide-react';
import { AppbarOptions } from './AppbarOptions';

interface AppbarProps {
    currentPath: string;
    userInfo: userInfoPros | undefined;
}

export const Appbar = ({ currentPath, userInfo }: AppbarProps) => {
    return (
        <div className='items-center'>
            <div className='flex justify-between items-center pt-3'>
                <div className='flex justify-between items-center space-x-5 pl-5'>
                    <Link to={"/blogs"}>
                        <img className='dark:hidden w-32 h-auto object-contain cursor-pointer' src={mediumLogo} alt="Logo" />
                        <img className='hidden dark:block w-32 h-auto object-contain cursor-pointer' src={mediumLogoDark} alt="Logo" />
                    </Link>
                    <div className='hidden sm:flex bg-gray-50 dark:bg-secondary p-2 rounded-full'>
                        <Search className="mx-2 block dark:hidden" strokeWidth="1" color="black" />
                        <Search className="mx-2 hidden dark:block" strokeWidth="1" color="white" />
                        <input className='pl-1 bg-gray-50 dark:bg-secondary' type="text" placeholder='Search' />
                    </div>
                </div>
                <div className='flex items-center justify-between space-x-8 mr-5'>
                    {currentPath !== "/publish" ? 
                        <div className='hidden md:flex'>
                        <a href="/publish" className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                            <span className="relative">Publish</span>
                        </a>
                        </div>
                    : null}
                    <Bell className="block dark:hidden" strokeWidth="1" color="black" />
                    <Bell className="hidden dark:block" strokeWidth="1" color="white" />
                    <ModeToggle />
                    <AppbarOptions userInfo={userInfo} />
                </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
        </div>
    );
};
