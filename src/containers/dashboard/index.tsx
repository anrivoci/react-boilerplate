import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleLogOut } = useAuth();

  const handleNavigate = () => {
    handleLogOut();
    navigate("/login");
  };

  return <div onClick={handleNavigate}>Dashboard</div>;
};

export default Dashboard;
