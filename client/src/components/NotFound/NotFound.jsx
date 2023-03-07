import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const time = 10000;
  const [remTime, setRemTime] = useState(10);

  setTimeout(() => {
    setRemTime(remTime - 1);
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, time);
  });
  return (
    <>
      <div>
        This page doesnt exist this will be redirected to homepage in {remTime}{" "}
        seconds.
      </div>
    </>
  );
}

export default NotFound;
