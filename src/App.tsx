import "./styles/App.scss";
import { useState, useEffect } from "react";
import ToDo from "./components/toDo";
import { DateAndTime } from "./components/dateAndTime";

function App() {
  const [userName, setuserName] = useState("");
  const [showInput, setShowInput] = useState(false);

  //localstorage
  useEffect(() => {
    const localStorageUserName = localStorage.getItem("userName-toDo");
    if (localStorageUserName !== null) {
      setuserName(localStorageUserName);
      setShowInput(true);
    }
  }, []);

  const handleUserName = (e: any) => {
    const trimuserName = userName.trim();
    if (e.key === "Enter" || e.type === "click") {
      if (trimuserName.length === 0) {
        return;
      } else {
        localStorage.setItem("userName-toDo", userName);
        setShowInput(true);
      }
    }
  };

  return (
    <div className="App">
      {!showInput && (
        <div className="row">
          <>
            <input
              placeholder="Enter your name . . ."
              onKeyDown={(e) => handleUserName(e)}
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />

            <button
              onClick={handleUserName}
              className="bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold border border-purple-700 rounded p-2 px-4 ml-2 text-purple-900">
              Begin
            </button>
          </>
        </div>
      )}

      {showInput && (
        <div className="toDoList">
          <>
            <div className="m-3">
              <h1 className="welcomeUserName text-red-500 text-4xl mb-2 text-center">
                {userName}
                <span className="text-lg">’s ToDo List</span>
              </h1>
              <DateAndTime />
            </div>
            <div>
              <ToDo />
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default App;
