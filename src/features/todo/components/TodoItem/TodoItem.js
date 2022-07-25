import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TODO_STATUS } from "../../constants/todo.contants";
const TodoItem = ({ todo, onEditTodo, onDeleteTodo }) => {
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span
          className={
            todo.status === TODO_STATUS.DONE ? "todo-title-completed" : ""
          }
        >
          {todo.task}
        </span>
        <p className="todo-time">{new Date(todo.createdAt).toLocaleString()}</p>
      </div>
      <div className="icon-job">
        <div className="icon-job-button" onClick={onEditTodo}>
          <EditOutlined className="edit" />
        </div>
        <div className="icon-job-button" onClick={onDeleteTodo}>
          <DeleteOutlined className="close" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
