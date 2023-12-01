import React, { useState } from "react";
import DataList from "../components/DataList";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";

const Records = () => {
  const [records, setRecords] = useState([]);

  const { profiles } = useSelector((state) => state.profiles);
  const navigate = useNavigate();

  const handleItemClicked = async (profile) => {
    try {
      Swal.fire({
        // showDenyButton: true,
        confirmButtonText: "Open",
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`student/${profile.lrn}`, {state: profile});
          // Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {}
  };

  const handleSearch = (e) => {
    setRecords(
      profiles.filter(
        (profile) =>
          profile.lrn.toLowerCase().includes(e.target.value.toLowerCase()) ||
          profile.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          profile.address.municipality
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          profile.address.barangay
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          profile.school.section
            .toLowerCase()
            .includes(e.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <div className="overflow-hidden rounded-md">
      <Search onChange={handleSearch} />
      <DataList
        data={records.length > 0 ? records : profiles}
        onRowClicked={handleItemClicked}
      />
    </div>
  );
};

export default Records;
