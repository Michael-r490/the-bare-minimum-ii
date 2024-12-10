import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavBar from '../components/NavBar';

export default function Dashboard() {
    const{user} = useContext(UserContext)
    return(
        <div>
            <NavBar />
            <h1>Dashboard</h1>
            {!!user && (<h2> Hi {user.name}!</h2>) }
        </div>
    )
}
