import { useEffect, useState } from "react"
import { data, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { useUserStore } from "./user-stor"
import { fetchWithBearer } from "../lib/api"

interface Subject {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  role: Role;
}

interface GradeRecord {
  id: number;
  subject_id: Subject;
  user_id: User;
  grade: number;
  date: string;
}

export const GetGradesPage = () => {
    const navigate = useNavigate()
    const [grades, setGrades] = useState<GradeRecord[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const userStor = useUserStore()
    useEffect(() => {
        fetchWithBearer(`http://127.0.0.1:8000/users/${userStor.user?.id}/subjects`)
            .then((res) => {
                if (!res.ok) throw new Error("Не удалось загрузить данные")
                return res.json()
            })
            .then((data: GradeRecord[]) => {
                setGrades(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    return (
        <div className="min-h-screen bg-[#0B0B0B]">

            <div className="overflow-hidden rounded-2xl bg-[#111111] relative h-20 w-full flex justify-end gap-4 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-[#222222] hover:bg-[#303030] hover:text-white -translate-x-5 h-11 text-white">
                        <Button>{userStor.user?.name}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-white cursor-pointer bg-[#171717]">
                        <DropdownMenuItem onClick={() => navigate("/main/login")} className="focus:bg-[#ffffff07] focus:text-white">⇐ Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden relative min-h-10 w-30 flex items-top justify-start -translate-y-15 translate-x-5">
                <Button onClick={() => navigate("/main/home")} className="h-11 bg-[#222222] hover:bg-[#303030]">Назад</Button>
            </div>

            <div className="overflow-hidden relative min-h-120 w-full flex items-top justify-center">
                <div className="relative rounded-2xl bg-[#111111] min-h-[480px] w-[600px] flex flex-col gap-4 items-center justify-start p-6 text-white">

                    {loading && (
                        <div className="text-zinc-400 my-auto">Загрузка оценок...</div>
                    )}

                    {error && (
                        <div className="text-red-400 my-auto">Ошибка: {error}</div>
                    )}

                    {!loading && !error && (
                        <div className="w-full">
                            <h2 className="text-xl font-bold mb-4 text-left">
                                Оценки: <span className="text-zinc-400">{grades[0]?.user_id.name || "Студент"}</span>
                            </h2>

                            <Table>
                                <TableHeader className="border-b border-zinc-800">
                                    <TableRow className="hover:bg-transparent border-b border-zinc-800">
                                        <TableHead className="text-zinc-400 font-medium text-left">Предмет</TableHead>
                                        <TableHead className="text-zinc-400 font-medium text-center">Оценка</TableHead>
                                        <TableHead className="text-zinc-400 font-medium text-right">Дата</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {grades.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-zinc-500 py-10">
                                                Оценок пока нет
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        grades.map((record) => (
                                            <TableRow key={record.id} className="border-b border-zinc-800/50 hover:bg-[#ffffff03]">
                                                <TableCell className="text-left font-medium">
                                                    {record.subject_id.name}
                                                </TableCell>

                                                <TableCell className="text-center font-bold">
                                                    <span className={`px-2.5 py-0.5 rounded-md ${
                                                        record.grade >= 4 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                                                    }`}>
                                                        {record.grade}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="text-zinc-400 text-right">
                                                    {new Date().toLocaleDateString("ru-RU")}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
