import { useNavigate } from "react-router"

const Redirect = ()=>{
    const navigate = useNavigate();

    navigate('login');
    return 
        <div>Redirecting</div>
}

export default Redirect