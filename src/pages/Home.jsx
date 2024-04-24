import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Redirect unauthenticated users to the login page
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    // Only render if the user is authenticated
    if (!user) {
        return null;
    }

    return (
        <div>
            <h2>Welcome to Employee Manager</h2>
            <p>This is the Employee Manager Home page for {user.name}</p>
            {/* Large buttons with images */}
            <Stack direction="vertical" gap={2}>
                <Button variant="primary" size="lg" onClick={() => navigate("/path1")}>
                    <img src="path_to_image_1.png" alt="Button 1" style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                    Button 1
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/path2")}>
                    <img src="path_to_image_2.png" alt="Button 2" style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                    Button 2
                </Button>
                <Button variant="success" size="lg" onClick={() => navigate("/path3")}>
                    <img src="path_to_image_3.png" alt="Button 3" style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                    Button 3
                </Button>
            </Stack>
        </div>
    );
};

export default Home;

