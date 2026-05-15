import { BrowserRouter, Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom"
import { LoginPage } from "./login-page";
import { RegisterPage } from "./register-page";
import { HomePage } from "./home-page";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Основной роутинг */}
                <Route path="main" element={<MainLayout/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/main/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

const MainLayout = () => {
    return (
        <>  
            <div className="bg-[#0B0B0B]">
                <Outlet/>
            </div>
        </>
    )
}
