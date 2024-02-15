import { useReducer } from "react";
import { useState, useEffect } from "react";
import { ItoDo } from "./interfaces";
import "../styles/toDo.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { CgAddR } from "react-icons/cg";

const _addToDo: ItoDo = {
  toDoText: "",
  setDate: "",
};

const ToDo = () => {
  const [addToDo, setAddToDo] = useState(_addToDo);
  const [toTosList, setToDoList] = useState<ItoDo[]>([]);

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
    localStorage.setItem("toDo-list-app", JSON.stringify(toTosList));
  }, [toTosList]);

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
          [...toTosList, addToDo].sort((a: ItoDo, b: ItoDo) =>
            a.setDate.localeCompare(b.setDate)
          )
        );

        //einzeln leeren
        //setAddToDo({ toDoText: "" });
        setAddToDo({ ..._addToDo });
      }
    }
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

  return (
    <div className="toDo">
      <div className="row">
        <input
          onKeyDown={(e) => handleSaveToDO(e)}
          type="text"
          value={addToDo.toDoText}
          onChange={(e) => handleAddToDo(e, "toDoText")}
          className="focus:border-blue-500 border-2"
        />
        <div className="flex justify-between items-center ml-2 ">
          <div className="flex justify-center items-center">
            <input
              type="date"
              className="bg-gray"
              onChange={(e) => handleAddToDo(e, "setDate")}
              value={addToDo.setDate}
            />

            <button
              onClick={handleSaveToDO}
              className="bg-blue-500 hover:bg-blue-700 text-white  p-2  border border-blue-700 rounded  ">
              <CgAddR className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <pre>
          {toTosList.map((toDoList: ItoDo, index) => {
            return (
              <div key={index} className="mb-2 rounded-xl mx-3 toDos">
                <div
                  className="flex
                 justify-between items-center p-2 mr-2">
                  <div>
                    <p className="text-sm italic text-white">
                      {formatDate(toDoList.setDate)}
                    </p>
                    <p className="text-xl font-bold">{toDoList.toDoText}</p>
                  </div>
                  <div className="flex text-2xl items-center gap-2">
                    <IoIosCheckmark className="text-5xl text-orange-300" />
                    <FaEdit className=" text-blue-700" />
                    <MdDelete className=" text-red-800" />
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
