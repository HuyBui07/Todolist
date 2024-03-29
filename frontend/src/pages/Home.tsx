import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../actions/todoActions";

//components
import NavBar from "../components/NavBar";
import TodoTile from "../components/TodoTile";
import TodoForm from "../components/TodoForm";
import EditModal from "../components/EditModal";

//const
import API_CONST from "../constants/apiConstants";

//types
import { Todo } from "../models/Todo";

function Home() {
  const dispatch = useDispatch();

  const open = useSelector((state: any) => state.editModal.open);
  const todos: Todo[] = useSelector((state: any) => state.todo.todos);
  const user = useSelector((state: any) => state.user.user);

  const fetchTodos = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const token = storedUser.token;
    const res = await fetch(API_CONST + "/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(setTodos(data));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {open && <EditModal />}
      <NavBar />
      <h1 className="text-4xl mt-8 mb-8 ml-4">
        Hello {user ? user.email : ""}!
      </h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {todos && todos.map((todo) => <TodoTile todo={todo} />)}
        </div>
        <TodoForm className="col-span-1" />
      </div>
    </div>
  );
}

export default Home;
