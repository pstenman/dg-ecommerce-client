import { Outlet } from "react-router"
import "../styles/layout/mainLayoutStyles.css"
import { Navbar } from "../components/layout/NavBar"
import { SearchBar } from "../components/search/searchBar"

export const Layout = () => {

    return <>
        <header><SearchBar /><Navbar /></header>
        <main><Outlet /></main>
        <footer></footer>
    </>
}