import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useMutation } from "react-query"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { useUserStore } from "./user-stor"
import { fetchWithBearer } from "../lib/api"

type RoleForm = {
    userId: string;
    roleId: string;
}

type SubjectForm = {
    subjectName: string;
}

export const AdminPage = () => {
    const userStor = useUserStore()
    const navigate = useNavigate()
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

    const { register: registerRole, handleSubmit: handleRoleSubmit, control, reset: resetRole } = useForm<RoleForm>()
    const { register: registerSubject, handleSubmit: handleSubjectSubmit, reset: resetSubject } = useForm<SubjectForm>()

    const assignRoleMutation = useMutation({
        mutationFn: ({ userId, roleId }: RoleForm) => {
            const uId = Number(userId);
            const rId = Number(roleId);

            return fetchWithBearer(`http://127.0.0.1:8000/users/${uId}`, {
                method: "PATCH", 
                headers: { 
                    'accept': 'application/json',
                    'Content-Type': 'application/json' 
                },

                body: JSON.stringify({
                    role_id: rId 
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.detail || "Не удалось назначить роль");
                }
                return res.json()
            })
        },
        onSuccess: () => {
            setMessage({ text: "Роль успешно изменена!", isError: false })
            resetRole()
        },
        onError: (err: any) => {
            setMessage({ text: err.message || "Ошибка при смене роли", isError: true })
        }
    })

    const addSubjectMutation = useMutation({
        mutationFn: ({ subjectName }: SubjectForm) => {
            return fetchWithBearer(`http://127.0.0.1:8000/subjects`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },

                body: JSON.stringify({ name: subjectName }) 
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.detail || "Не удалось добавить предмет");
                }
                return res.json()
            })
        },
        onSuccess: () => {
            setMessage({ text: "Предмет успешно добавлен!", isError: false })
            resetSubject()
        },
        onError: (err: any) => {
            setMessage({ text: err.message || "Ошибка при добавлении предмета", isError: true })
        }
    })

    return (
        <div className="min-h-screen bg-[#0B0B0B]">
            <div className="overflow-hidden rounded-2xl bg-[#111111] relative h-20 w-full flex justify-end gap-4 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-[#222222] hover:bg-[#303030] hover:text-white -translate-x-5 h-11 text-white">
                        <Button>Администратор</Button>
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

            <div className="overflow-hidden relative min-h-130 w-full flex items-top justify-center pb-20">
                <div className="relative rounded-2xl bg-[#111111] py-8 w-[480px] flex flex-col items-center justify-start border border-zinc-800">

                    <form onSubmit={handleRoleSubmit((data) => assignRoleMutation.mutate(data))} className="w-full flex flex-col items-center gap-4">
                        <h1 className="text-white text-lg font-bold">Выберите, кого хотите назначить:</h1>
                        <Input 
                            {...registerRole("userId", { required: true })}
                            className="w-80 placeholder:text-[16px] bg-[#222222] focus:bg-[#2a2a2a] border-0 text-white px-4 rounded-xl h-11" 
                            type="number" 
                            placeholder="ID пользователя"
                        />

                        <h1 className="text-white text-lg font-bold mt-2">Выберите кем хотите назначить:</h1>
                        
                        <Controller
                            control={control}
                            name="roleId"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="text-white border-0 w-80 bg-[#222222] hover:bg-[#303030] h-11 rounded-xl">
                                        <SelectValue placeholder="Выберите роль" />
                                    </SelectTrigger>
                                    <SelectContent className="text-white bg-[#222222] border-zinc-800">
                                        <SelectGroup>
                                            <SelectLabel className="text-zinc-500">Доступные роли</SelectLabel>
                                            <SelectItem value="1">Администратор</SelectItem>
                                            <SelectItem value="2">Студент</SelectItem>
                                            <SelectItem value="3">Преподаватель</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <Button type="submit" disabled={assignRoleMutation.isLoading} className="h-11 w-80 bg-[#222222] hover:bg-[#303030] rounded-xl text-white mt-2">
                            {assignRoleMutation.isLoading ? "Сохранение..." : "Назначить"}
                        </Button>
                    </form>

                    <Separator className="w-80 bg-zinc-800 my-6"/>

                    <form onSubmit={handleSubjectSubmit((data) => addSubjectMutation.mutate(data))} className="w-full flex flex-col items-center gap-4">
                        <h1 className="text-white text-lg font-bold">Напишите название нового предмета:</h1>
                        <Input 
                            {...registerSubject("subjectName", { required: true })}
                            className="w-80 placeholder:text-[16px] bg-[#222222] focus:bg-[#2a2a2a] border-0 text-white px-4 rounded-xl h-11" 
                            type="text" 
                            placeholder="Название предмета"
                        />
                        <Button type="submit" disabled={addSubjectMutation.isLoading} className="h-11 w-80 bg-[#222222] hover:bg-[#303030] rounded-xl text-white mt-2">
                            {addSubjectMutation.isLoading ? "Добавление..." : "Добавить предмет"}
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}
