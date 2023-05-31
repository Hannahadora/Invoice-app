import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup, Signin, Home, Users, InvoiceDetails } from "./pages/index";
import { Suspense, useLayoutEffect, useEffect } from "react";
import AuthLayout from "./layouts/auth";
import MainLayout from "./layouts/main";
import { useSelector } from "react-redux";
import AppLoading from "./components/shared/AppLoading";

function App() {
  const userAccount = useSelector((state) => state.auth.account);
  const theme = useSelector((state) => state.theme.theme);

  useLayoutEffect(() => {
    theme === "dark"
      ? document.body.classList.remove("body_light-theme") &&
        document.body.classList.add("body_dark-theme")
      : document.body.classList.remove("body_dark-theme") &&
        document.body.classList.add("body_light-theme");
    document.body.classList.add(`body_${theme}-theme`);
  }, [theme]);

  return (
    <Suspense fallback={<AppLoading />}>
      <Router>
        <Routes>
            <Route path="/auth/signin" element={<AuthLayout><Signin /></AuthLayout>} />
            <Route path="/auth/register" element={<AuthLayout><Signup /></AuthLayout>} />

            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
            <Route path="/invoice/:id" element={<MainLayout><InvoiceDetails /></MainLayout>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
