import { sidebarCategory } from "./sidebar.constant";

export const CategoryOptions = sidebarCategory.map((item) => {
  return {
    label: item.label,
    value: item.label.toLowerCase(),
  };
});

export const priority = ['High', 'Medium', 'Low']

export const priorityOptions = priority.map(item => {
  return {
    label: item,
    value: item.toLowerCase(),
  };
})
