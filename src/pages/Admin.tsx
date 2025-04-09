import { Outlet } from "react-router"
import { AdminNav } from "../components/layout/AdminNav"
import "../styles/layout/adminLayout.css"

export const Admin = () => {

    return <>
        <section className="admin-nav"><AdminNav /></section>
        <section><Outlet /></section>
    </>
}