import { Button } from "../components/ui/button";
export const HomePage = () => {
    return (
        <div>
            <h1 className = "text-[#ffffff]">Абоба основная</h1>
            <Button className="bg-[#505050]" onClick={() => console.log("aboba")}>Хуй</Button>
        </div>
    )
}