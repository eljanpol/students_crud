import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "../components/ui/error-message";
import { useMutation } from "react-query"
import { useState } from "react"
import { fetchWithBearer } from "../lib/api"

type SetGradeForm = {
    subject: string,
    grade: string,
    studentID: string
}

const useSetGradePageVM  = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SetGradeForm>()
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

    const setGradeMutation = useMutation({
        mutationFn: ({ subject, grade, studentID }: SetGradeForm) => {
            const sId = Number(subject);
            const gValue = Number(grade);
            const uId = Number(studentID);
            const currentDate = new Date().toISOString();

            return fetchWithBearer(`http://127.0.0.1:8000/users/${uId}/grades`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    subject_id: sId,
                    grade: gValue,
                    created_at: currentDate 
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.detail || "Не удалось выставить оценку");
                }
                return res.json()
            })
        },
        onSuccess: () => {
            setMessage({ text: "Оценка успешно выставлена!", isError: false })
            reset() 
        },
        onError: (err: any) => {
            setMessage({ text: err.message || "Ошибка при отправке данных", isError: true })
        }
    })

    const onSubmit = handleSubmit((data) => setGradeMutation.mutate(data))

    return {
        fields: {
            subject: register('subject', { required: "Это поле обязательно!" }),
            grade: register('grade', { required: "Это поле обязательно!" }),
            studentID: register('studentID', { required: "Это поле обязательно!" })
        },
        onSubmit,
        errors,
        isLoading: setGradeMutation.isLoading,
        message
    }
}

export const SetGradePage = () => {
    const { fields, errors, onSubmit, isLoading, message } = useSetGradePageVM()
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-[#0B0B0B]">

            <div className="overflow-hidden rounded-2xl bg-[#111111] relative h-20 w-full flex justify-end gap-4 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-[#222222] hover:bg-[#303030] hover:text-white -translate-x-5 h-11 text-white">
                        <Button>тут будет имя пользователя</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-white cursor-pointer bg-[#171717]">
                        <DropdownMenuItem onClick={() => navigate("/main/login")} className="focus:!bg-[#ffffff07]">⇐ Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden relative min-h-10 w-30 flex items-top justify-start -translate-y-15 translate-x-5">
                <Button onClick={() => navigate("/main/home")} className="h-11 bg-[#222222] hover:bg-[#303030]">Назад</Button>
            </div>

            {message && (
                <div className={`max-w-md mx-auto text-center p-3 rounded-xl mb-4 font-medium text-sm ${
                    message.isError ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                    {message.text}
                </div>
            )}

            <form className="overflow-hidden relative min-h-120 w-full flex items-top justify-center pb-20" onSubmit={onSubmit}>
                <div className="relative rounded-2xl bg-[#111111] w-[440px] py-8 flex flex-col gap-4 items-center justify-start border border-zinc-800">
                    
                    <h1 className="text-white text-lg font-bold">Напишите ID предмета:</h1>
                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] focus:bg-[#2a2a2a] border-0 text-white px-4 rounded-xl h-11" 
                        type="number" 
                        {...fields.subject} 
                        placeholder="ID предмета"
                        disabled={isLoading}
                    />
                    <ErrorMessage error={errors.subject} />

                    <h1 className="text-white text-lg font-bold mt-2">Напишите оценку:</h1>
                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] focus:bg-[#2a2a2a] border-0 text-white px-4 rounded-xl h-11" 
                        type="number" 
                        {...fields.grade} 
                        placeholder="Оценка"
                        disabled={isLoading}
                    />
                    <ErrorMessage error={errors.grade} />

                    <h1 className="text-white text-lg font-bold mt-2">Напишите ID студента:</h1>
                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] focus:bg-[#2a2a2a] border-0 text-white px-4 rounded-xl h-11" 
                        type="number" 
                        {...fields.studentID}
                        placeholder="ID студента" 
                        disabled={isLoading}
                    />
                    <ErrorMessage error={errors.studentID} />

                    <Separator className="w-80 bg-zinc-800 my-4"/>

                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="h-11 w-80 bg-[#222222] hover:bg-[#303030] rounded-xl text-white font-medium"
                    >
                        {isLoading ? "Выставление..." : "Выставить"}
                    </Button>

                </div>
            </form>

        </div>
    )
}
