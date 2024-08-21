import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const AppbarOptions = ({ userInfo }: any) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    if(userInfo === undefined) {
        return (
            <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2 cursor-pointer" />
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2 cursor-pointer">
                    {userInfo.name[0].toUpperCase()}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem disabled onClick={() => {}}>
                    {userInfo?.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/publish')}>
                    Publish
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/user/blogs')}>
                    My blogs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}