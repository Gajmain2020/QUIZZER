import { Button } from "@mui/material";
import { useState } from "react";

export default function Test() {
  const opt = ["a", "b", "c", "d"];
  const [selectedOption, setSelectedOption] = useState(-1);
  function handleClick(idx) {
    setSelectedOption(idx);
  }
  return (
    <div className="test">
      <ul className="option-list">
        {opt.map((o, idx) => (
          <li
            className={`option ${selectedOption === idx ? "selected" : ""}`}
            key={o}
            onClick={() => handleClick(idx)}
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
