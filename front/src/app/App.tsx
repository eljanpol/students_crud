import { BrowserRouter, Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom"
import { LoginPage } from "./login-page";
import { RegisterPage } from "./register-page";
import { HomePage } from "./home-page";
import { AdminPage } from "./admin-page";
import { SetGradePage } from "./set-grade-page";
import { GetGradesPage } from "./get-grades-page";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient()

export const App = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="main" element={<MainLayout/>}>
                        <Route path="GetGrades" element={<GetGradesPage/>}/>
                        <Route path="GradeSet" element={<SetGradePage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="admin" element={<AdminPage/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/main/login" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
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
