import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();
  const [remTime, setRemTime] = useState(30);
  const time = 30000;
  function handleHomepageClick() {
    navigate("/");
  }

  setTimeout(() => {
    setRemTime(remTime - 1);
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, time);
  });

  return (
    <Container className="error-page">
      <div className="main-error">
        <span className="error-text">ERR </span>{" "}
        <span className="error-status-code">401 !!</span>
        <span className="error-text"> &#8209; You are in Approval List .</span>
      </div>
      <div className="error-message">
        <div>
          Your credentials are being waiting for getting approval from the
          Admin. It might take 2-3 working days to get approval from the Admin.
        </div>
        <div>
          You will be redirected to Homepage in {remTime} seconds. If not
          redirected please click here &nbsp;
          <Link
            component="button"
            underline="none"
            sx={{ fontSize: "1em" }}
            onClick={handleHomepageClick}
          >
            click here.
          </Link>
        </div>
      </div>
    </Container>
  );
}
