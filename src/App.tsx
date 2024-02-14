import "./styles/App.scss";
import { useState } from "react";
import ToDo from "./components/toDo";
import { DateAndTime } from "./components/date";

function App() {
  const [userName, setuserName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleUserName = (e: any) => {
    const trimuserName = userName.trim();
    if (e.key === "Enter" || e.type === "click") {
      if (trimuserName.length === 0) {
        return;
      } else {
        setShowInput(true);
      }
    }
  };

  return (
    <div className="App">
      {!showInput && (
        <div className="userNameField">
          <label className="text-green-500">Enter your name</label>
          <div className="row">
            <input
              onKeyDown={(e) => handleUserName(e)}
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <button
              onClick={handleUserName}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded ml-2">
              enter
            </button>
          </div>
        </div>
      )}
      <div className="toDoList">
        {showInput && (
          <div>
            <h1 className="welcomeUserName text-red-500">
              {userName}’s ToDo List
            </h1>
            <DateAndTime />
            <ToDo />
          </div>
        )}
        <div className="overLay"></div>
      </div>
    </div>
  );
}

export default App;
