export const filterItems = (value) => {
    const items = [
      {
        title: "LRN",
        item: "lrn",
        value: value?.lrn,
      },
      {
        title: "Name",
        item: "name",
        value: value?.name,
      },
      {
        title: "Municipality",
        item: "municipality",
        value: value?.municipality,
      },
      {
        title: "Barangay",
        item: "barangay",
        value: value?.barangay,
      },
      {
        title: "Section",
        item: "section",
        value: value?.section,
      },
    ];
    return items;
  };