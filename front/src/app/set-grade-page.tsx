import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"
import {useForm} from 'react-hook-form'
import { ErrorMessage } from "../components/ui/error-message";

type SetGradeForm = {
    subject: string,
    grade: string,
    studentID: string
}

const useSetGradePageVM  = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<SetGradeForm>()
    const onSubmit = handleSubmit((data) => console.log(data))
    onSubmit

    return {
        fields: {
            subject: register('subject'),
            grade: register('grade'),
            studentID: register('studentID')
        },
        onSubmit,
        errors
    }
}

export const SetGradePage = () => {
    const {fields, errors, onSubmit} = useSetGradePageVM()
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

            <form className="overflow-hidden relative min-h-120 w-full flex items-top justify-center" onSubmit={onSubmit}>
                <div className="relative rounded-2xl bg-[#111111] w-120 flex flex-col gap-4 items-center justify-start ">
                    <h1 className="text-white pt-5 text-xl font-bold">Напишите ID предмета:</h1>

                     <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] hover:bg-[#303030] border-0
                        text-white px-4 rounded-xm" type="text" {...fields.subject} placeholder="ID предмета"
                    />
                    <ErrorMessage error={errors.subject} />

                    <h1 className="text-white pt-5 text-xl font-bold">Напишите оценку:</h1>

                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] hover:bg-[#303030] border-0
                        text-white px-4 rounded-xm" type="number" {...fields.grade} placeholder="Оценка"
                    />
                    <ErrorMessage error={errors.grade} />

                    <h1 className="text-white pt-5 text-xl font-bold">Напишите ID студента:</h1>

                    <Input 
                        className="w-80 placeholder:text-[16px] bg-[#222222] hover:bg-[#303030] border-0
                        text-white px-4 rounded-xm" type="number" placeholder="ID студента" {...fields.studentID}
                    />
                    <ErrorMessage error={errors.studentID} />

                    <div>
                        <Button type="button" className="h-10 w-85 bg-[#222222] hover:bg-[#303030]">Посмотреть ID всех студентов</Button>
                    </div>

                    <Separator className="max-w-100 bg-zinc-700"/>

                    <div>
                        <Button type="submit" className="h-10 w-85 bg-[#222222] hover:bg-[#303030]">Выставить</Button>
                    </div>

                </div>
            </form>

        </div>
)}