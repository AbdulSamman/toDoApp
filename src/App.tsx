import "./styles/App.scss";
import { useState, useEffect } from "react";
import ToDo from "./components/toDo";
import { DateAndTime } from "./components/dateAndTime";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

function App() {
  const [userName, setuserName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editUserName, setEditUserName] = useState(false);

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
        setEditUserName(false);
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
              className="bg-blue-500 hover:bg-blue-700 text-gray-700 font-bold border border-blue-700 rounded p-2 px-4 ml-2 text-blue-900">
              Begin
            </button>
          </>
        </div>
      )}

      {showInput && (
        <div className="toDoList">
          <>
            <div className="m-3">
              <div className="flex justify-center items-center gap-2 ">
                <h1 className="welcomeUserName text-red-500 text-4xl mb-2 text-center">
                  {editUserName ? (
                    <input
                      type="text"
                      className="text-lg"
                      value={userName}
                      onChange={(e) => setuserName(e.target.value)}
                      onKeyDown={(e) => handleUserName(e)}
                    />
                  ) : (
                    <>{userName}</>
                  )}

                  <span className="text-lg">’s ToDo List</span>
                </h1>
                <span className="text-blue-500">
                  {!editUserName ? (
                    <FaUserEdit
                      className="cursor-pointer"
                      onClick={() => setEditUserName(!editUserName)}
                    />
                  ) : (
                    <IoIosCheckmark
                      className="text-4xl cursor-pointer"
                      onClick={handleUserName}
                    />
                  )}
                </span>
              </div>
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
