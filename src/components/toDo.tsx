import { useReducer } from "react";
import { useState, useEffect } from "react";
import { ItoDo } from "./interfaces";
import "../styles/toDo.scss";
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

import { FaEdit } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { CgAddR } from "react-icons/cg";

const _addToDo: ItoDo = {
  toDoText: "",
  setDate: "",
  didTask: false,
};

const ToDo = () => {
  const [addToDo, setAddToDo] = useState(_addToDo);
  const [toDosList, setToDoList] = useState<ItoDo[]>([]);

  //localstorage
  useEffect(() => {
    const localStorageToDo = localStorage.getItem("toDo-list-app");
    if (localStorageToDo !== null) {
      setToDoList(JSON.parse(localStorageToDo));
    } else {
      setAddToDo({ ...addToDo });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDo-list-app", JSON.stringify(toDosList));
  }, [toDosList]);

  const handleAddToDo = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setAddToDo({ ...addToDo, [fieldName]: value });
  };

  const handleSaveToDO = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      if (addToDo.toDoText.trim() !== "") {
        setToDoList(
          [...toDosList, addToDo].sort((a: ItoDo, b: ItoDo) =>
            a.setDate.localeCompare(b.setDate)
          )
        );

        //einzeln leeren
        //setAddToDo({ toDoText: "" });
        setAddToDo({ ..._addToDo });
      }
    }
    //////
    if (!addToDo.setDate) {
      const today = new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      console.log("yes");
      setAddToDo({ ...addToDo, setDate: today });
    }
  };
  //date formatierun
  const formatDate = (dateString: string) => {
    const options: any = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  // delete toDo with index
  const handleDeleteToDo = (index: number) => {
    const updatedToDoList = [...toDosList];
    updatedToDoList.splice(index, 1);
    setToDoList(updatedToDoList);
    localStorage.setItem("toDo-list-app", JSON.stringify(updatedToDoList));
  };

  //delete all
  const handleDeleteToDos = () => {
    localStorage.removeItem("toDo-list-app");
    window.location.reload();
  };
  //task finished
  const handelDidTask = (index: number) => {
    const updatedToDoList = [...toDosList];
    updatedToDoList[index].didTask = true;
    setToDoList(updatedToDoList);
    console.log("yes");
  };

  return (
    <div className="toDos">
      <div className="row">
        <input
          onKeyDown={(e) => handleSaveToDO(e)}
          type="text"
          value={addToDo.toDoText}
          onChange={(e) => handleAddToDo(e, "toDoText")}
        />

        <div className="flex justify-center items-center p-2 gap-2">
          <input
            type="date"
            className="bg-gray"
            onChange={(e) => handleAddToDo(e, "setDate")}
            value={addToDo.setDate}
          />

          <button
            onClick={handleSaveToDO}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2  border border-purple-700 rounded">
            <CgAddR className="text-xl" />
          </button>
          <div className="text-white cursor-pointer bg-red-500 border border-red-700 hover:bg-red-700 rounded flex justify-center items-center p-1">
            <MdDeleteForever onClick={handleDeleteToDos} className="text-3xl" />
          </div>
        </div>
      </div>

      <div>
        <pre>
          {toDosList.map((toDoList: ItoDo, index) => {
            return (
              <div key={index} className="mb-2 rounded-xl toDo">
                <div
                  className="flex
                 justify-between items-center p-2 mr-2">
                  <div>
                    <p className="text-sm italic text-white">
                      {formatDate(toDoList.setDate)}
                    </p>
                    <p
                      className={`text-xl font-bold text-purple-900 ${
                        toDoList.didTask ? "line-through text-purple-400" : ""
                      }`}>
                      {toDoList.toDoText}
                    </p>
                  </div>
                  <div className="flex text-2xl items-center gap-2">
                    <IoIosCheckmark
                      className={`text-5xl text-orange-700 cursor-pointer`}
                      onClick={() => handelDidTask(index)}
                    />
                    <FaEdit className=" text-blue-900 cursor-pointer" />
                    <TiDelete
                      className=" text-red-800 cursor-pointer"
                      onClick={() => handleDeleteToDo(index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default ToDo;
