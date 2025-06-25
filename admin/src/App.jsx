
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import AdminLogin from "./AdminLogin.jsx"
import AdminDashboard from "./AdminDashboard.jsx";

function App(){
return(

<Router>
    <Routes>
        <Route path="/" element={<AdminLogin/>}/>
            <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
    </Routes>
</Router>

)

}

export default App;