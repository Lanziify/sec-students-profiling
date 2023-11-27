import React from "react";
import DataTable from "react-data-table-component";
import Preloader from "./Preloader";

const DataList = (props) => {
  const columns = [
    {
      name: "LRN",
      selector: (data, index) => data.lrn,
      sortable: true,
      grow: 2,
    },
    {
      name: "Name",
      selector: (data) => data.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Address",
      selector: (data) =>
        `${data.address.barangay}, ${data.address.municipality}, ${data.address.province}`,
      sortable: true,
      grow: 3,
      hide: "lg",
    },
    {
      name: "Age",
      selector: (data) => data.age,
      sortable: true,
      right: true,
      hide: "md",
    },
    {
      name: "Sex",
      selector: (data) => data.sex,
      sortable: true,
      right: true,
      hide: "md",
    },
    {
      name: "Section",
      selector: (data) => data.school.section,
      sortable: true,
      right: true,
      hide: "sm",
    },
  ];
  const tableStyle = {
    title: {
      style: {
        fontWeight: "bold",
      }
    },
    headRow: {
      style: {
        // backgroundColor: "#3b82f6",
        fontWeight: "bold",
        // color: "#FFFF",
      },
    },
    noData: {
      style: {
      },
    },
    rows: {
      style: {
        // backgroundColor: "#ecf0f3",
      },
    },
    columns: {
      style: {},
    },
    pagination: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  if (props.loading) return <Preloader />;
  return (
    <DataTable
      title="Students Profile"
      columns={columns}
      data={props.data}
      selectableRows
      striped={true}
      pointerOnHover
      highlightOnHover
      customStyles={tableStyle}
      pagination
      responsive={true}
      onRowClicked={props.onRowClicked}
    />
  );
};

export default DataList;
