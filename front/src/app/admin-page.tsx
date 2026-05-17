import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue } from "../components/ui/select"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"

export const AdminPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0B0B0B]">

            <div className="overflow-hidden rounded-2xl bg-[#111111] relative h-20 w-full flex justify-end gap-4 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-[#222222] hover:bg-[#303030] hover:text-white -translate-x-5 h-11 text-white">
                        <Button>тут будет имя пользователя</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="hover-bg-[#111111] text-white cursor-pointer bg-[#171717]">
                        <DropdownMenuItem onClick={() => navigate("/main/login")} className="bg-[#171717]">⇐ Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden relative min-h-10 w-30 flex items-top justify-start -translate-y-15 translate-x-5">
                <Button onClick={() => navigate("/main/home")} className="h-11 bg-[#222222] hover:bg-[#303030]">Назад</Button>
            </div>

            <div className="overflow-hidden relative min-h-screen w-full flex items-top justify-center">
                <div className="relative rounded-2xl bg-[#111111] h-190 w-120 flex flex-col gap-4 items-center justify-start ">
                    <h1 className="text-white pt-5 text-xl font-bold translate-y-5">Выберите, кого хотите назначить:</h1>

                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] hover:bg-[#303030] border-0
                        text-white px-4 rounded-xm translate-y-5" type="number" placeholder="ID пользователя"
                    />

                    <h1 className="text-white pt-5 text-xl font-bold translate-y-5">Выберите кем хотите назначить:</h1>

                    <Select>
                        <SelectTrigger className="text-white border-0 w-80 bg-[#222222] hover:bg-[#303030] translate-y-5">
                            <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-[#222222] hover:bg-[#303030]">
                            <SelectGroup className="bg-[#222222] hover:bg-[#303030]">
                                <SelectLabel>Пользователи</SelectLabel>
                                <SelectItem value="test-6">Администратор</SelectItem>
                                <SelectItem value="test-7">Студент</SelectItem>
                                <SelectItem value="test-8">Преподаватель</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="translate-y-10">
                        <Button className="h-10 w-85 bg-[#222222] hover:bg-[#303030]">Назначить</Button>
                    </div>

                    <Separator className="max-w-110 bg-zinc-700 translate-y-15"/>

                    <div className="translate-y-20">
                        <Button className="h-10 w-80 bg-[#222222] hover:bg-[#303030]">Посмотреть всех пользователей</Button>
                    </div>
                </div>
            </div>
        </div>
    )}