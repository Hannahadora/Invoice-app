import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup, Signin, Home, Users, InvoiceDetails } from "./pages/index";
import { Suspense, useEffect } from "react";
import AuthLayout from "./layouts/auth";
import MainLayout from "./layouts/main";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    theme === "light"
      ? document.body.classList.remove("body_dark-theme")
      : document.body.classList.remove("body_light-theme");
    document.body.classList.add(`body_${theme}-theme`);
  }, [theme]);

  return (
    <Suspense fallback={"Loading..."}>
      <Router>
        {/* <AuthLayout>
          <Routes>
            <Route path='/auth/signin' element={<Signin />} />
            <Route path='/auth/signup' element={<Signup />} />
          </Routes>
        </AuthLayout> */}
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
          </Routes>
        </MainLayout>
      </Router>
    </Suspense>
  );
}

export default App;
