import { useReducer } from "react";
import { useState } from "react";
import { ItoDo } from "./interfaces";

const _addToDo: ItoDo = {
  toDoText: "",
};

const ToDo = () => {
  const [addToDo, setAddToDo] = useState(_addToDo);
  const [toTosList, setToDoList] = useState<ItoDo[]>([]);

  const handleAddToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    addToDo.toDoText = value;
    setAddToDo({ ...addToDo });
  };

  const handleSaveToDO = () => {
    if (addToDo.toDoText.trim() !== "") {
      setToDoList([...toTosList, addToDo]);
      setAddToDo({ toDoText: "" });
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={addToDo.toDoText}
          onChange={(e) => handleAddToDo(e)}
        />
        <button onClick={handleSaveToDO}>Add ToDo</button>
      </div>

      <div>
        <pre>
          {toTosList.map((toDoList: ItoDo, index) => {
            return (
              <div key={index}>
                <p>{toDoList.toDoText}</p>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default ToDo;
