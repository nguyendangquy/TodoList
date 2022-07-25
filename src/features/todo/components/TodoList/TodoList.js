import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTodoList,
  deleteTodo,
  editTodo,
  getTodoList,
  searchTodo,
  filterTodo,
  incrementBy,
  decrementBy,
  sortByTodo,
} from "../../redux/todo.slice";
import TodoItem from "../TodoItem/TodoItem";
import { LoadingOutlined } from "@ant-design/icons";
import {
  SORT_OPTIONS,
  STATUS_FILTER,
  STATUS_OPTIONS,
} from "../../constants/todo.contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {} from "../../redux/todo.slice";

const TodoList = () => {
  const dispatch = useDispatch();

  const { todoList } = useSelector((state) => state.todo);
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTask, setSearchTask] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0].value);
  const [filterStatus, setFilterStatus] = useState(STATUS_FILTER[0].value);
  const [sortTodo, setSortTodo] = useState(SORT_OPTIONS[0].value);
  const [currentID, setCurrentID] = useState();
  const inputRef = useRef();

  const [page, setPage] = useState(1);
  const canPrev = page === 1;
  const totalPage = todoList.length;
  const toalPages =
    totalPage % page > 0 ? totalPage / page + 1 : totalPage / page;
  const canNext = page >= toalPages;
  useEffect(() => {
    dispatch(getTodoList()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const handleAdd = () => {
    if (!task) {
      toast.error("Missing title todo!");
    } else {
      dispatch(createTodoList({ task: task, status: status }));
      toast.success("Task added successfully");
      setTask("");
      inputRef.current.focus();
    }
  };
  const handleAddStatus = (e) => {
    setStatus(Number(e.target.value));
    inputRef.current.focus();
  };

  const handleEdit = (id) => {
    const todoSelected = todoList.find((item) => item.id === id);
    setTask(todoSelected.task);
    setStatus(todoSelected.status);
    setIsEdit(true);
    setCurrentID(id);
    inputRef.current.focus();
  };

  const handleChange = () => {
    dispatch(editTodo({ id: currentID, todo: { task, status } })).then(() => {
      dispatch(getTodoList());
    });
    setIsEdit(false);
    toast.success("Task Edited SuccessFully");
    setTask("");
    inputRef.current.focus();
  };

  const onChangeSearchTask = (e) => {
    setSearchTask(e.target.value);
  };

  const handleSearchTask = () => {
    dispatch(searchTodo({ task: searchTask }));
  };
  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
    dispatch(filterTodo({ filterStatus: e.target.value }));
  };

  const prevPage = () => {
    setIsLoading(true);
    dispatch(decrementBy({ page: page - 1 })).finally(() => {
      setIsLoading(false);
    });
    setPage((prev) => prev - 1);
  };

  const nextPage = (e) => {
    setIsLoading(true);
    dispatch(incrementBy({ page: page + 1 })).finally(() => {
      setIsLoading(false);
    });
    setPage((prev) => prev + 1);
  };
  const handleSortTodo = (e) => {
    setSortTodo(e.target.value);
    const sort = SORT_OPTIONS.filter((item) => item.value == e.target.value)[0];
    dispatch(
      sortByTodo({
        sortBy: sort.sortBy,
        order: sort.order,
      })
    );
  };
  if (isLoading) {
    return (
      <div className="loading">
        <LoadingOutlined className="loading-icon" />;
      </div>
    );
  }
  return (
    <div className="todoList">
      <div className="header">
        <h1 className="heading">My To Do List</h1>
        <div className="todolist-task">
          <div className="add-todolist">
            <input
              type="text"
              className="input-task"
              placeholder="Title..."
              ref={inputRef}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) =>
                (e.keyCode === 13 && !isEdit && handleAdd()) ||
                (e.keyCode === 13 && isEdit && handleChange())
              }
            />
            {isEdit ? (
              <button className="editBtn" onClick={handleChange}>
                Update
              </button>
            ) : (
              <button className="addBtn" onClick={handleAdd}>
                Add
              </button>
            )}
          </div>
          <div className="search-todolist">
            <input
              className="input-search"
              placeholder="Search by Task"
              value={searchTask}
              onChange={onChangeSearchTask}
              onKeyUp={handleSearchTask}
            />
          </div>
        </div>
        <div className="status">
          <div className="choose-status">
            <h3>Choose Status</h3>
            <select
              className="select-status"
              value={status}
              onChange={handleAddStatus}
            >
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-status">
            <h3>Filter status</h3>
            <select
              className="select-filter-status"
              value={filterStatus}
              onChange={handleFilterStatus}
            >
              {STATUS_FILTER.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sort-todo">
            <h3>Sorting todo</h3>
            <select
              className="select-sort-todo"
              value={sortTodo}
              onChange={handleSortTodo}
            >
              {SORT_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <ul className="todo-content">
        {!todoList.length
          ? "There are no jobs on the to-do list"
          : todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDeleteTodo={() => dispatch(deleteTodo(todo.id))}
                onEditTodo={() => handleEdit(todo.id)}
              />
            ))}
      </ul>
      <div className="slider">
        <button onClick={prevPage} disabled={canPrev}>
          Prev
        </button>
        <button onClick={nextPage} disabled={canNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
