const category = ['personal', 'work', 'education']

export const CategoryOptions = category.map((item) => {
  return {
    label: item,
    value: item.toLowerCase(),
  };
});

export const priority = ['High', 'Medium', 'Low']

export const priorityOptions = priority.map(item => {
  return {
    label: item,
    value: item.toLowerCase(),
  };
})
