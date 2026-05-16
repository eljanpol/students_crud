import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"


export const HomePage = () => {
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

            <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-[360px_1fr] gap-8 items-start pt-10 overflow-hidden">

                <div className="rounded-2xl bg-[#ffffff07] w-90 h-159 flex flex-col gap-4 items-start p-4 shrink-0"> 
                    <h2 className="border-b border-zinc-700 pb-5 pt-10 text-[#ffffff] text-center text-3xl font-bold tracking-tight mb-8 translate-x-7">
                    ㅤㅤНавигацияㅤㅤ
                    </h2>
                    <Button className="w-82 h-11 bg-[#222222] text-[#ffffff] hover:bg-[#303030]">Тест</Button>
                    <Button className="w-82 h-11 bg-[#222222] text-[#ffffff] hover:bg-[#303030]">Тест</Button>
                    <Button className="w-82 h-11 bg-[#222222] text-[#ffffff] hover:bg-[#303030]">Тест</Button>
                    <Button className="w-82 h-11 bg-[#222222] text-[#ffffff] hover:bg-[#303030]">Тест</Button>
                    <Button className="w-82 h-11 bg-[#222222] text-[#ffffff] hover:bg-[#303030]">Тест</Button>
                </div>

                <div className="border rounded-2xl border-zinc-700 flex flex-col justify-start py-12 px-6 h-159 overflow-y-auto">
                    <h1 className="border-b border-zinc-700 pb-5 text-[#ffffff] text-center text-4xl font-extrabold tracking-tight mb-8">
                        Онлайн контроль успеваемости
                    </h1>
                    <p className="text-zinc-300 text-base leading-relaxed text-justify">
                        В эпоху цифровизации образования классические бумажные дневники и разрозненные таблицы 
                        уступают место единым экосистемам. Наша платформа создана для того, чтобы стереть барьеры 
                        между преподавателями и учащимися, превратив рутинный процесс контроля успеваемости в 
                        прозрачный, быстрый и интуитивно понятный инструмент. 
                    </p>
                    <blockquote 
                    className="font-light border-l-3 border-white pl-4 my-6 italic text-zinc-300 text-base leading-relaxed self-start text-left bg-[#ffffff07] 
                    py-2 pr-2 rounded-r-lg"
                    >
                        «Мы верим, что честная и мгновенная обратная связь — это фундамент успешного обучения. Наша 
                        цель — дать учителям удобный инструмент для справедливой оценки знаний, а ученикам — персональный 
                        навигатор, который мотивирует улучшать свои результаты».
                    </blockquote>
                    <p className="text-zinc-300 text-base leading-relaxed mb-4 text-justify">
                        Для преподавателей система предлагает продвинутый функционал электронного журнала. Вы можете 
                        в пару кликов выставлять баллы, больше никакой бумажной рутины. Всё теперь быстро и просто, как
                        и должно быть.
                    </p>
                    <p className="text-zinc-300 text-base leading-relaxed text-justify">
                        Ученики, в свою очередь, получают личный кабинет с адаптивной визуализацией своего прогресса. 
                        Доступ к оценкам открыт круглосуточно, а интуитивный интерфейс позволяет детально отслеживать 
                        динамику оценок по каждому предмету.
                    </p>
                </div>
            </div>
        </div>
    )
}