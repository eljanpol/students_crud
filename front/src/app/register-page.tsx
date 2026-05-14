import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const RegisterPage = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen w-full bg-[#0B0B0B] flex items-center justify-center pb-50">
            <div className="w-80 flex flex-col gap-4">    
                <h1 className="text-[#ffffff] text-center text-xl font-medium">Регистрация</h1>
                <h1 className="text-[#676767] text-center">Введите код роли и придумайте себе логин и пароль:</h1>
                <Input className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" type="text" placeholder="Код роли"/>
                <Input className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" type="text" placeholder="Логин"/>   
                <Input className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" type="text" placeholder="Пароль"/>
                <div className="flex gap-3 mt-2">
                    <Button className="flex-2 h-12 text-[15px] bg-[#ffffff] text-[#0B0B0B] hover:bg-[#bdbdbd] rounded-xl transition-colors" 
                    onClick={() => navigate("/main/register")}>Зарегистрироваться</Button>
                    <Button className="flex-1 h-12 text-[15px] bg-[#1F1F1F] text-white hover:bg-[#282828] rounded-xl transition-colors" 
                    onClick={() => navigate("/main/login")}>Вход</Button>
                </div>
            </div>
        </div>
    )
}