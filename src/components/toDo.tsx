import { useState, useEffect } from "react";
import { ItoDo } from "./interfaces";
import "../styles/toDo.scss";
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { FaEdit, FaSave } from "react-icons/fa";
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
  const [editToDoIndex, setEditToDoIndex] = useState<number | null>(null);
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

  //task finished
  //soll vor dem handleSaveToDo sein umsicherzustellen dass eingefügte element am anfang des array ist, und duchgestrichenen task am ende des arrays ist
  const handelDidTask = (index: number) => {
    const updatedToDoList = [...toDosList];
    updatedToDoList[index].didTask = true;

    // Entferne die Aufgabe aus der Liste
    const completedTask = updatedToDoList.splice(index, 1)[0];

    // Füge die durchgestrichene Aufgabe am Ende der Liste wieder hinzu
    updatedToDoList.push(completedTask);
    setToDoList(updatedToDoList);

    console.log("yes");
  };

  const handleSaveToDo = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      if (addToDo.toDoText.trim() !== "") {
        const sortiertedList = [addToDo, ...toDosList].sort(
          (b: ItoDo, a: ItoDo) => b.setDate.localeCompare(a.setDate)
        );
        setToDoList(sortiertedList);

        //einzeln leeren
        //setAddToDo({ toDoText: "" });
        setAddToDo({ ..._addToDo });
      }
    }
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
    const confirmDelete = window.confirm(
      "Are you sure, that you want to delete all?"
    );
    if (confirmDelete) {
      localStorage.removeItem("toDo-list-app");
      window.location.reload();
    }
  };

  //editing

  const handleEditToDo = (index: number, newText: string) => {
    const updatedToDoList = [...toDosList];
    updatedToDoList[index].toDoText = newText;
    setToDoList(updatedToDoList);
  };

  const openEditTask = (index: number) => {
    setEditToDoIndex(index);
  };
  const closeEditTask = () => {
    setEditToDoIndex(null);
  };

  //änderung speichern
  const handleSaveEdit = (index: number, newText: string) => {
    handleEditToDo(index, newText);
    setEditToDoIndex(null);
  };

  return (
    <div className="toDos">
      <div className="row">
        <input
          onKeyDown={(e) => handleSaveToDo(e)}
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
            onClick={handleSaveToDo}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2  border border-purple-700 rounded">
            <CgAddR className="text-xl" />
          </button>
          <button className="text-white cursor-pointer bg-red-500 border border-red-600 hover:bg-red-700 rounded flex justify-center items-center p-1.5">
            <MdDeleteForever onClick={handleDeleteToDos} className="text-2xl" />
          </button>
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
                  <div className="w-full">
                    <p className="text-sm italic text-white">
                      {toDoList.setDate
                        ? formatDate(toDoList.setDate)
                        : "ToDay"}
                    </p>
                    {editToDoIndex === index ? (
                      <input
                        type="text"
                        value={toDoList.toDoText}
                        onChange={(e) => handleEditToDo(index, e.target.value)}
                      />
                    ) : (
                      <p
                        className={`text-xl font-bold  ${
                          toDoList.didTask
                            ? "line-through text-purple-400"
                            : "text-purple-900"
                        }`}>
                        {toDoList.toDoText}
                      </p>
                    )}
                  </div>
                  <div className="flex text-2xl items-center gap-2">
                    {editToDoIndex === index ? (
                      <>
                        <FaSave
                          className=" text-blue-900 cursor-pointer"
                          onClick={() => {
                            handleSaveEdit(index, toDoList.toDoText);
                          }}
                        />
                        <TiDelete
                          className=" text-red-800 cursor-pointer"
                          onClick={closeEditTask}
                        />
                      </>
                    ) : (
                      <>
                        <IoIosCheckmark
                          className={`text-5xl text-orange-700 cursor-pointer`}
                          onClick={() => handelDidTask(index)}
                        />
                        <FaEdit
                          className="text-blue-900 cursor-pointer"
                          onClick={() => openEditTask(index)}
                        />
                        <TiDelete
                          className=" text-red-800 cursor-pointer"
                          onClick={() => handleDeleteToDo(index)}
                        />
                      </>
                    )}
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
