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

      {/* Arrange each image and button pair */}
      <Stack direction="horizontal" gap={3}>
        {/* Button 1 with image above */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/createsuppliers")}
            >
              Create Supplier
            </Button>
          </div>
        </div>

        {/* Button 2 with image above */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/allsuppliers")}
            >
              All Suppliers
            </Button>
          </div>
        </div>

        {/* Button 3 with image above */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/createorders")}
            >
              Create Orders
            </Button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/allorders")}
            >
              All Orders
            </Button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/ContactTransport")}
            >
              Inventory Manager Inbox
            </Button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
            alt="Image 1"
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/ContactPayment")}
            >
              Payment Manager Inbox
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default Home;
