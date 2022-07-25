import { todoApi } from "../api/todo.api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  todoList: [],
};

export const getTodoList = createAsyncThunk("todo/getTodoList", async () => {
  const response = await todoApi.getTodoListApi();

  return response.data;
});

export const createTodoList = createAsyncThunk(
  "todo/createTodoList",
  async (todos) => {
    const response = await todoApi.createTodoListApi({ ...todos });
    return response.data;
  }
);
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await todoApi.deleteTodoApi(id);
  return id;
});
export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async ({ id, todo }) => {
    const response = await todoApi.editTodoApi(id, todo);
    return response.data;
  }
);

export const searchTodo = createAsyncThunk(
  "todo/searchTodo",
  async ({ task }) => {
    const response = await todoApi.searchTodoApi(task);
    return response.data;
  }
);

export const filterTodo = createAsyncThunk(
  "todo/filterTodo",
  async ({ filterStatus }) => {
    const response = await todoApi.filterTodoApi(filterStatus);
    return response.data;
  }
);

export const incrementBy = createAsyncThunk(
  "todo/incrementBy",
  async ({ page }) => {
    const response = await todoApi.getTodoListSlideApi(page);
    return response.data;
  }
);

export const decrementBy = createAsyncThunk(
  "todo/decrementBy",
  async ({ page }) => {
    const response = await todoApi.getTodoListSlideApi(page);
    return response.data;
  }
);

export const sortByTodo = createAsyncThunk(
  "todo/sortByCreatedAtTodo",
  async ({ sortBy, order }) => {
    const response = await todoApi.getTodoListSortingApi(sortBy, order);
    return response.data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });

    builder.addCase(getTodoList.rejected, (state) => {
      state.todoList = [];
    });
    builder.addCase(createTodoList.fulfilled, (state, action) => {
      state.todoList.push(action.payload);
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      let index = state.todoList.findIndex(({ id }) => id === action.payload);
      state.todoList.splice(index, 1);
    });
    builder.addCase(searchTodo.fulfilled, (state, action) => {
      state.todoList = [...action.payload];
    });
    builder.addCase(filterTodo.fulfilled, (state, action) => {
      state.todoList = [...action.payload];
    });
    builder.addCase(incrementBy.fulfilled, (state, action) => {
      state.todoList = [...action.payload];
    });
    builder.addCase(decrementBy.fulfilled, (state, action) => {
      state.todoList = [...action.payload];
    });
    builder.addCase(sortByTodo.fulfilled, (state, action) => {
      state.todoList = [...action.payload];
    });
  },
});

export const todoReducer = todoSlice.reducer;
