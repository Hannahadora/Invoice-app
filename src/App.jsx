import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup, Signin, Home, Users, InvoiceDetails } from "./pages/index";
import { Suspense, useEffect } from "react";
import AuthLayout from "./layouts/auth";
import MainLayout from "./layouts/main";
import { useSelector } from "react-redux";

function App() {
  const userAccount = useSelector((state) => state.auth.account);

  return (
    <Suspense fallback={"Loading..."}>
      <Router>
        {userAccount && userAccount ? (
          <AuthLayout>
            <Routes>
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
            </Routes>
          </AuthLayout>
        ) : (
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/invoice/:id" element={<InvoiceDetails />} />
            </Routes>
          </MainLayout>
        )}
      </Router>
    </Suspense>
  );
}

export default App;
