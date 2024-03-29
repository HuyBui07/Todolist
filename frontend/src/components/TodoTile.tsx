//dispatch
import { useDispatch } from "react-redux";
import { deleteTodo } from "../actions/todoActions";

//types
import { Todo } from "../models/Todo";

//const
import API_CONST from "../constants/apiConstants";

function TodoTile({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: todo._id });
  };

  const handleDelete = async () => {
    console.log(todo._id);
    const res = await fetch(API_CONST + "/todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user") || "{}").token,
      },
    });
    const data = await res.json();
    dispatch(deleteTodo(data._id));
  };

  return (
    <div
      className={
        "flex border-2 rounded-[20px] w-[100%] h-20 mt-16 ml-4 justify-between items-center p-5 "
      }
    >
      <h2>{todo.content}</h2>
      <div className="flex items-center gap-10">
        <button className="w-20" onClick={handleEdit}>
          Edit
        </button>
        <button className="w-20 bg-red-500" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoTile;
