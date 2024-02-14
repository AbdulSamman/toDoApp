import "./App.scss";
import { useState } from "react";
import ToDo from "./components/toDo";
import { DateAndTime } from "./components/date";

function App() {
  const [userName, setuserName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleUserName = () => {
    const trimuserName = userName.trim();
    if (trimuserName.length === 0) {
      return;
    } else {
      setShowInput(true);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setShowInput(true);
    }
  };

  return (
    <div className="App">
      {!showInput && (
        <div className="userNameField">
          <label>Enter your name</label>
          <div className="row">
            <input
              onKeyDown={handleKeyPress}
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <button onClick={handleUserName}>enter</button>
          </div>
        </div>
      )}
      <div className="toDoList">
        {showInput && (
          <div>
            <h1 className="welcomeUserName">{userName}’s ToDo List</h1>
            <DateAndTime />
            <ToDo />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
