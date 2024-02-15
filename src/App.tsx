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
        <div className="userNameField">
          <div className="row">
            <div>
              <input
                placeholder="Enter your name . . ."
                onKeyDown={(e) => handleUserName(e)}
                type="text"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                className="focus:border-blue-500 border-2"
              />
            </div>

            <button
              onClick={handleUserName}
              className="bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold border border-blue-700 rounded p-2 px-4 ml-2">
              Begin
            </button>
          </div>
        </div>
      )}
      <div className="toDoList">
        {showInput && (
          <>
            <div className="m-3">
              <h1 className="welcomeUserName text-red-500 text-4xl">
                {userName}
                <span className="text-lg">’s ToDo List</span>
              </h1>
              <DateAndTime />
            </div>
            <div>
              <ToDo />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
