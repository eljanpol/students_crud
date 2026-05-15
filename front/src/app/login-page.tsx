import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {useForm} from 'react-hook-form'
import { ErrorMessage } from "../components/ui/error-message";

type AuthForm = {
    login: string,
    password: string,
    repeatPassword: string
}

const useRegisterPageVM  = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<AuthForm>()
    
    const onSubmit = handleSubmit((data) => console.log(data))

    return {
        fields: {
            login: register('login', {
                required: {
                    value: true, 
                    message: "Это поле обязательно!"
                }
            }),
            password: register('password', {
                required: {
                    value: true, 
                    message: "Это поле обязательно!"
                }
            }),
        },
        onSubmit,
        errors
    }
}

export const LoginPage = () => {
    const {fields, errors, onSubmit} = useRegisterPageVM()
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen w-full bg-[#0B0B0B] flex items-center justify-center pb-50">
            <form className="w-80 flex flex-col gap-4" onSubmit={onSubmit}>    
                <h1 className="text-[#ffffff] text-center text-xl font-medium">Авторизация</h1>
                <h1 className="text-[#676767] text-center">Введите свой логин и пароль:</h1>

                <Input
                className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" type="text" 
                {...fields.login}
                placeholder="Логин"
                 /> 
                <ErrorMessage error={errors.login}/>  

                <Input
                className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" type="text" 
                {...fields.password} 
                placeholder="Пароль"
                />
                <ErrorMessage error={errors.password}/>

                <div className="flex gap-3 mt-2">
                    <Button
                    type="submit" className="flex-2 h-12 text-[15px] bg-[#ffffff] text-[#0B0B0B] hover:bg-[#bdbdbd] rounded-xl transition-colors" 
                    onClick={() => navigate("/main/login")}
                    >
                        Войти
                    </Button>
                    <Button
                    type="button" className="flex-1 h-12 text-[15px] bg-[#1F1F1F] text-white hover:bg-[#282828] rounded-xl transition-colors" 
                    onClick={() => navigate("/main/register")}
                    >
                        Регистрация
                    </Button>
                </div>
            </form>
        </div>
    )
}
