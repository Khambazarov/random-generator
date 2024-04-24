import { useState } from "react";
import "./App.css";
import Ali from "./assets/robohash/Ali.png";
import Alper from "./assets/robohash/Alper.png";
import Liang from "./assets/robohash/Liang.png";
import Matthias from "./assets/robohash/Matthias.png";
import Mohammad from "./assets/robohash/Mohammad.png";
import Murat from "./assets/robohash/Murat.png";
import Nasrin from "./assets/robohash/Nasrin.png";
import Olha from "./assets/robohash/Olha.png";
import Olivia from "./assets/robohash/Olivia.png";
import Renat from "./assets/robohash/Renat.png";
import Sebastian from "./assets/robohash/Sebastian.png";
import Sergen from "./assets/robohash/Sergen.png";

const robohash = {
  Ali,
  Alper,
  Liang,
  Matthias,
  Mohammad,
  Murat,
  Nasrin,
  Olha,
  Olivia,
  Renat,
  Sebastian,
  Sergen,
};

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const studentsArray = [
    "Ali",
    "Alper",
    "Liang",
    "Matthias",
    "Mohammad",
    "Murat",
    "Nasrin",
    "Olha",
    "Olivia",
    "Renat",
    "Sebastian",
    "Sergen",
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedStudents((prev) =>
      checked ? [...prev, name] : prev.filter((student) => student !== name)
    );
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelectedStudents(checked ? studentsArray : []);
  };

  const randomizeArray = (array) => {
    const randomizedArray = [...array];
    for (let i = randomizedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedArray[i], randomizedArray[j]] = [
        randomizedArray[j],
        randomizedArray[i],
      ];
    }
    return randomizedArray;
  };

  const randomize = () => {
    setLoading(true);
    setTimeout(() => {
      const randomizedStudents = randomizeArray(selectedStudents);
      setStudents(randomizedStudents);
      setLoading(false);
    }, 3000);
  };

  const reset = () => {
    setStudents([]);
    setSelectedStudents([]);
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <h1 className="loading">Wer darf antreten?</h1>
        </div>
      ) : students.length === 0 ? (
        <div className="wrapper">
          <button onClick={randomize} className="btn">
            Randomize Students
          </button>
          <h1 className="heading">Select Students </h1>
          <label>
            <input
              type="checkbox"
              name="selectAll"
              onChange={handleSelectAll}
            />
            Select All
          </label>
          {studentsArray.map((student) => (
            <label key={student}>
              <input
                type="checkbox"
                name={student}
                checked={selectedStudents.includes(student)}
                onChange={handleCheckboxChange}
              />
              {student}
            </label>
          ))}
        </div>
      ) : (
        <div className="wrapper">
          <button onClick={reset} className="btn">
            Reset Students
          </button>
          <ul>
            {students.map((student, index) => (
              <>
                <li key={index}>
                  <img
                    className="robohash"
                    src={robohash[student]}
                    alt="robohash"
                  />
                  {student}
                  <img
                    className="robohash"
                    src={robohash[student]}
                    alt="robohash"
                  />
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
