import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "../components/ui/error-message";
import { useMutation } from "react-query";
import { fetchWithBearer, setBearer } from "../lib/api";
import { useUserStore } from "./user-stor";

type AuthForm = {
    login: string,
    password: string,
}

interface TokenResponse {
    access_token: string;
}

const useRegisterPageVM  = () => {
    const userStore = useUserStore()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>()
    const getUser = () => {
        fetchWithBearer(`http://127.0.0.1:8000/users/me`)
        .then((res)=>{
            return res.json()
        })
        .then((data) => {
            userStore.setUser({id:data.__data__.id, name:data.__data__.name, role:data.__data__.role})
        })
    }
    const { mutate, isLoading, error: apiError } = useMutation({
        mutationFn: ({ login, password }: AuthForm) => {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'password');
            formData.append('username', login); 
            formData.append('password', password);
            formData.append('scope', '');
            formData.append('client_id', 'string');
            formData.append('client_secret', 'string');

            return fetch(`http://127.0.0.1:8000/token`, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                },
                body: formData.toString() 
            })
            .then(res => {
                if (!res.ok) throw new Error("Неверный логин или пароль")
                return res.json()
            })
            .then((data: TokenResponse) => {
                setBearer(data.access_token)
                return getUser()
            });
        },
    
        onSuccess: () => {
            navigate("/main/home");
        }
    })

    const onSubmit = handleSubmit((data) => mutate(data))

    return {
        fields: {
            login: register('login', {
                required: { value: true, message: "Это поле обязательно!" }
            }),
            password: register('password', {
                required: { value: true, message: "Это поле обязательно!" }
            }),
        },
        onSubmit,
        errors,
        isLoading,
        apiError
    }
}

export const LoginPage = () => {
    const { fields, errors, onSubmit, isLoading } = useRegisterPageVM()
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen w-full bg-[#0B0B0B] flex items-center justify-center pb-50">
            <form className="rounded-2xl p-5 bg-[#ffffff07] w-90 flex flex-col gap-4" onSubmit={onSubmit}>    
                <h1 className="text-[#ffffff] text-center text-xl font-medium">Авторизация</h1>
                <h1 className="text-[#676767] text-center">Введите свой логин и пароль:</h1>

                <Input
                    className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" 
                    type="text" 
                    {...fields.login}
                    placeholder="Логин"
                    disabled={isLoading}
                 /> 
                <ErrorMessage error={errors.login}/>  

                <Input
                    className="w-full h-13 placeholder:text-[16px] bg-[#1F1F1F] border-0 text-white px-4 rounded-xl" 
                    type="password" 
                    {...fields.password} 
                    placeholder="Пароль"
                    disabled={isLoading}
                />
                <ErrorMessage error={errors.password}/>

                <div className="flex gap-3 mt-2">
                    <Button
                        type="submit" 
                        className="flex-2 h-12 text-[15px] bg-[#ffffff] text-[#0B0B0B] hover:bg-[#bdbdbd] rounded-xl transition-colors" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Вход..." : "Войти"}
                    </Button>
                    
                    <Button
                        type="button" 
                        className="flex-1 h-12 text-[15px] bg-[#1F1F1F] text-white hover:bg-[#282828] rounded-xl transition-colors" 
                        onClick={() => navigate("/main/register")}
                    >
                        Регистрация
                    </Button>
                </div>
            </form>
        </div>
    )
}
