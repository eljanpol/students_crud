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
            <Button onClick={() => navigate("login")}/>
            <Button onClick={() => navigate("register")}/>
            <Button onClick={() => navigate("home")}/>
            <Outlet/>
        </>
    )
}