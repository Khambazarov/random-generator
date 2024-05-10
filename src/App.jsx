import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [robohash, setRobohash] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState();
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const [newStudent, setNewStudent] = useState("");
  const [studentsArray, setStudentsArray] = useState([
    "Ali",
    "Alper",
    "Liang",
    "Mohammad",
    "Murat",
    "Nasrin",
    "Olha",
    "Olivia",
    "Renat",
    "Sebastian",
    "Sergen",
  ]);

  const addStudent = () => {
    if (newStudent) {
      setStudentsArray((prevStudents) => [...prevStudents, newStudent]);
      setNewStudent("");
    }
  };

  useEffect(() => {
    const loadRobohash = async () => {
      let robohash = {};
      for (let student of studentsArray) {
        robohash[student] = `https://robohash.org/${student}`;
      }
      setRobohash(robohash);
    };

    loadRobohash();
  }, [studentsArray]);

  const countdownFN = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          clearInterval(timer);
          return 0;
        } else {
          return currentCountdown - 1;
        }
      });
    }, 1000);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedStudents((prev) =>
      checked ? [...prev, name] : prev.filter((student) => student !== name)
    );
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
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
    countdownFN();
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

  const handleMouseEnter = (student) => {
    setHoveredStudent(student);
  };

  const handleMouseLeave = () => {
    setHoveredStudent(null);
  };

  return (
    <>
      {selectedStudents.length > 1 && loading ? (
        <div className="loader">
          <h1 className="loading">{countdown}</h1>
        </div>
      ) : students.length < 2 ? (
        <div className="wrapper">
          <button onClick={randomize} className="btn">
            Randomize Students
          </button>
          <label className="label-select-all">
            <input
              className="select-all"
              type="checkbox"
              name="selectAll"
              onChange={handleSelectAll}
            />
            <h1 className="heading">Select All Students </h1>
          </label>
          {studentsArray.map((student, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={student}
                checked={selectedStudents.includes(student)}
                onChange={handleCheckboxChange}
              />
              {student}
            </label>
          ))}
          <div className="add-student-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addStudent();
              }}
            >
              <input
                autoFocus={true}
                type="text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                placeholder="Add New Student"
              />
              <button type="submit">ADD</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <button onClick={reset} className="btn">
            Reset
          </button>
          <ul>
            {students.map((student, index) => (
              <div key={student}>
                <li style={{ overflow: "hidden" }}>
                  <img
                    className="robohash"
                    src={robohash[student]}
                    alt="robohash"
                    style={
                      hoveredStudent && students.indexOf(hoveredStudent) > index
                        ? {
                            transform: "rotate(30deg) scaleX(-1)",
                            overflow: "hidden",
                          }
                        : hoveredStudent &&
                          students.indexOf(hoveredStudent) < index
                        ? {
                            transform: "rotate(-30deg) scaleX(-1)",
                            overflow: "hidden",
                          }
                        : {}
                    }
                  />
                  <span
                    onMouseEnter={() => handleMouseEnter(student)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {student}
                  </span>
                  <img
                    className="robohash"
                    src={robohash[student]}
                    alt="robohash"
                    style={
                      hoveredStudent && students.indexOf(hoveredStudent) > index
                        ? { transform: "rotate(-30deg)", overflow: "hidden" }
                        : hoveredStudent &&
                          students.indexOf(hoveredStudent) < index
                        ? { transform: "rotate(30deg)", overflow: "hidden" }
                        : {}
                    }
                  />
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
