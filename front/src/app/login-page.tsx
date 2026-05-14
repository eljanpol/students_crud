import { Input } from "../components/ui/input";

export const LoginPage = () => {
    return(
        <div>
            <h1 className = "text-[#ffffff]">Страница авторизации</h1>
            <Input className="absolute bottom-140 left-1/2 -translate-x-1/2 w-80 h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0" type="text" placeholder="Логин"/>
            <Input className="absolute bottom-125 left-1/2 -translate-x-1/2 w-80 h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0" type="text" placeholder="Пароль"/>
        </div>
    )
}