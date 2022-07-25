export const TODO_STATUS = {
  TODO: 1,
  DONE: 2,
  ALL: "",
};
export const STATUS_OPTIONS = [
  { value: TODO_STATUS.TODO, label: "incomplete" },
  { value: TODO_STATUS.DONE, label: "completed" },
];

export const STATUS_FILTER = [
  { value: TODO_STATUS.ALL, label: "All" },
  { value: TODO_STATUS.TODO, label: "incomplete" },
  { value: TODO_STATUS.DONE, label: "completed" },
];

export const TODO_SORTING = {
  LATEST_CREATEDAT: 1,
  OLDEST_CREATEDAT: 2,
};

export const SORT_OPTIONS = [
  {
    value: TODO_SORTING.LATEST_CREATEDAT,
    label: "Latest CreatedAt",
    sortBy: "createdAt",
    order: "desc",
  },
  {
    value: TODO_SORTING.OLDEST_CREATEDAT,
    label: "Oldest CreatedAt",
    sortBy: "createdAt",
    order: "asc",
  },
];
