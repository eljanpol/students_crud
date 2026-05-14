import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom"
import { LoginPage } from "./login-page";
import { RegisterPage } from "./register-page";
import { Button } from "../components/ui/button";
import { HomePage } from "./home-page";

export const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="main" element={<MainLayout/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const MainLayout = () => {
    const navigate = useNavigate()
    return (
        <>  
            <div className="bg-[#141B21]">
                <Button className="bg-[#505050]" onClick={() => navigate("login")}>Вход</Button>
                <Button className="bg-[#505050]" onClick={() => navigate("register")}>Регистрация</Button>
                <Button className="bg-[#505050]" onClick={() => navigate("home")}>Домой, Волтер</Button>
                <Outlet/>
            </div>
            <body className="bg-[#1D262C]"/>
        </>
    )
}