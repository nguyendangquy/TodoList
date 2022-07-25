import api from "../../../api/axios";
import { TodoEndpoints } from "../constants/todo.enpoints";

const getTodoListApi = () => {
  return api.get(TodoEndpoints.LIST, {
    params: {
      page: 1,
      limit: 8,
    },
  });
};

const createTodoListApi = (data) => {
  return api.post(TodoEndpoints.LIST, data);
};

const deleteTodoApi = (id) => {
  return api.delete(TodoEndpoints.DETAIL.replace(":id", id));
};

const editTodoApi = (id, data) => {
  return api.put(TodoEndpoints.DETAIL.replace(":id", id), data);
};

const searchTodoApi = (task) => {
  return api.get(TodoEndpoints.LIST, {
    params: {
      search: task,
    },
  });
};

const filterTodoApi = (filterStatus) => {
  return api.get(TodoEndpoints.LIST, {
    params: {
      status: filterStatus,
      limit: 8,
    },
  });
};

const getTodoListSlideApi = (page) => {
  return api.get(TodoEndpoints.LIST, {
    params: {
      page,
      limit: 8,
    },
  });
};
const getTodoListSortingApi = (sortBy, order) => {
  return api.get(TodoEndpoints.LIST, {
    params: {
      sortBy,
      order,
    },
  });
};

export const todoApi = {
  getTodoListApi,
  createTodoListApi,
  deleteTodoApi,
  editTodoApi,
  searchTodoApi,
  filterTodoApi,
  getTodoListSlideApi,
  getTodoListSortingApi,
};
