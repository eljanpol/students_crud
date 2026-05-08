import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";


export const App = () => {
    let [value, setValue] = useState<number>(1)
    return (
        <>
        <Button className="w-100 h-20 "  onClick={() => {}}>Button {value} </Button>
        <Input className=""/>
        </>
    )
}