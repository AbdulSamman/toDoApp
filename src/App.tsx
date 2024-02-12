import "./App.scss";
import { useState } from "react";

function App() {
  const [userName, setuserName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleUserName = () => {
    setShowInput(true);
  };

  return (
    <div className="App">
      {!showInput && (
        <div className="userName">
          <label>Enter your name</label>
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <button onClick={handleUserName}>enter</button>
          </div>
        </div>
      )}

      {showInput && userName !== "" && userName.length > 0 && (
        <h1>{userName}’s ToDo List</h1>
      )}
    </div>
  );
}

export default App;
