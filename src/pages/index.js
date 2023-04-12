import { lazy } from "react";

export const Signup = lazy(() => import('./auth/signup'))
export const Signin = lazy(() => import('./auth/signin'))
export const Home = lazy(() => import('./home'))
export const Users = lazy(() => import('./users'))
export const InvoiceDetails = lazy(() => import('./invoice-detail'))