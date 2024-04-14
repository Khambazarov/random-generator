import { useState } from "react";
import "./App.css";

function App() {
  const [participants, setParticipants] = useState("");

  const randomize = () => {
    const participants = {
      1: "Ali",
      2: "Alper",
      3: "Liang",
      4: "Matthias",
      5: "Momad",
      6: "Murat",
      7: "Nasrin",
      8: "Olha",
      9: "Olivia",
      10: "Renat",
      11: "Sebastian",
      12: "Sergen",
    };

    const amountOfParticipants = Object.keys(participants).length;

    const randomParticipant = Math.ceil(Math.random() * amountOfParticipants);
    return setTimeout(() => {
      setParticipants(participants[randomParticipant]);
    }, 500);
  };
  clearTimeout();

  const reset = () => {
    setParticipants("");
  };

  return (
    <>
      <h1>Random Generator</h1>
      <div className="wrapper">
        <button onClick={randomize} className="btn">
          Choose Random Student
        </button>
        <button onClick={reset} className="btn">
          Reset
        </button>
        {!participants ? <h2>?</h2> : <h2>{participants}</h2>}
      </div>
    </>
  );
}

export default App;
