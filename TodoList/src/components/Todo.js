import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FcDeleteDatabase } from "react-icons/fc";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";

const getlocalitems = () => {

  let result = localStorage.getItem("todolist");

  if (result) {
    return JSON.parse(localStorage.getItem("todolist"));
  } else {
    return [];
  }
};
function Todo() {
  const [itemslist, setitemslist] = useState(getlocalitems());
  const [list, setlist] = useState("");
  const [index, setindex] = useState(-1);
  const [getmode, setmode] = useState(false);

  const view = () => {
    setmode(true);
  };
  const additems = () => {
    if (list === undefined || list === "" || list === null) {
      Swal.fire({
        title: "Oops...",
        text: "Please Enter A Text",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
       const data = {
        text: list,
        completed: false,
      
      };
      setitemslist((items) => {
        return [...items, data];
      });
      localStorage.setItem("todolist", JSON.stringify(itemslist));
      setlist("");
    }
  };
  const changeitemsname = (index) => {
    if (list === undefined || list === "" || list === null) {
      Swal.fire({
        title: "Oops...",
        text: "Please Enter A Text",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      var items = itemslist[index];
      items.text = list;
      itemslist[index] = items;
      setitemslist(itemslist);

      localStorage.setItem("todolist", JSON.stringify(itemslist));
      setlist("");
      setmode(false);
    }
  };
  const toggleCheck = (index) => {
    const newList = [...itemslist];
    newList[index].completed = !newList[index].completed;
    setitemslist(newList);
  };
  const deleteitems = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setitemslist((items) => {
          return items.filter((arr, indexx) => {
            return indexx !== index;
          });
        });
        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
  };

useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(itemslist));
  }, [itemslist]);

  return (
    <>
      <h1 style={{ color: "yellowgreen" }}>TODO LIST</h1>
      <div id="todo-list-app">
        <div className="todo-list">
          <form>
            <input
              type="text"
              placeholder="Enter a new todo "
              value={list}
              onChange={(e) => setlist(e.target.value)}
            ></input>

            {getmode ? (
              <FiEdit2
                color="blue"
                size={40}
                style={{ marginLeft: "349px", marginTop: "-91" }}
                onClick={() => changeitemsname(index)}
              />
            ) : (
              <IoIosAddCircleOutline
                color="green"
                size={50}
                style={{ marginLeft: "349px", marginTop: "-91" }}
                onClick={() => additems()}
              />
            )}
            <FcDeleteDatabase
              title="All Items Delete"
              size={30}
              style={{ marginLeft: "360px", marginTop: "-50" }}
              onClick={() => setitemslist([])}
            />

          
          </form>
          <ul>
            {itemslist.map((value, index) => {
              return (
                <li key={index}>
                 
                  <input
                    type="checkbox"
                    checked={value.completed}
                    onChange={() => toggleCheck(index)}
                  />

                  <span
                    className="mx-1"
                    style={{
                       color: value.completed ? 'red' : "black",
                      textDecoration: value.completed ? "line-through"  : "none",
                    }}
                  >
                    {value.text}
                  </span>
                  <AiFillEdit
                    color="blue"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      view();
                      setlist(value?.text);
                      setindex(index);
                    }}
                  />
                  <AiFillDelete
                    color="red"
                    style={{ marginLeft: "10px" }}
                    disabled={true}
                    onClick={() => deleteitems(index)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
