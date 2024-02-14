import { useReducer } from "react";
import { useState } from "react";
import { ItoDo } from "./interfaces";
import "../styles/toDo.scss";

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

  const handleSaveToDO = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      if (addToDo.toDoText.trim() !== "") {
        setToDoList([...toTosList, addToDo]);
        setAddToDo({ toDoText: "" });
      }
    }
  };

  return (
    <div>
      <div className="row">
        <input
          onKeyDown={(e) => handleSaveToDO(e)}
          type="text"
          value={addToDo.toDoText}
          onChange={(e) => handleAddToDo(e)}
          className="mb-2"
        />
        <button
          onClick={handleSaveToDO}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2">
          Add ToDo
        </button>
      </div>

      <div>
        <pre>
          {toTosList.map((toDoList: ItoDo, index) => {
            return (
              <div key={index} className="toDoRow">
                <p className="text-red-100 font-bold underline">
                  {toDoList.toDoText}
                </p>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default ToDo;
