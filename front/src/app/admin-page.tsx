import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export const AdminPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0B0B0B]">

            <div className="overflow-hidden relative min-h-11 w-full flex items-top justify-center">
                <div className="relative h-20 w-full bg-[#0B0B0B] flex justify-start">
                    <div className="rounded-2xl bg-[#ffffff07] w-500 flex flex-row-reverse gap-4 items-center"> 
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="bg-[#222222] hover:bg-[#303030] hover:text-white -translate-x-5 h-11 text-white">
                                <Button>тут будет имя пользователя</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="hover-bg-[#ffffff07] text-white cursor-pointer bg-[#171717]">
                            <DropdownMenuItem onClick={() => navigate("/main/login")}>⇐ Выйти</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            
        </div>
    )}