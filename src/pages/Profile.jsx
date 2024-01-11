import React, { useRef, useState } from "react";
import {
  MdArrowBackIos,
  MdDownload,
  MdLocalPrintshop,
  MdPrint,
} from "react-icons/md";
import SayonForm from "../components/SayonForm";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const printableRef = useRef(null);
  const printButtonRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state;

  return (
    <div>
      {!isEditing && (
        <div className="flex items-center justify-between max-w-7xl m-auto p-4">
          <button
            className="flex items-center rounded-md p-2  hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            <MdArrowBackIos />
            <p className="text-sm">List</p>
          </button>
          <ReactToPrint
            pageStyle="@page { magin: 1.5 }"
            trigger={() => {
              return (
                <button
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-2 py-1 text-white hover:bg-blue-700"
                  type="button"
                  ref={printButtonRef}
                >
                  <MdPrint size={18} />
                  <p className="text-xs font-bold">Print / Download Record</p>
                </button>
              );
            }}
            content={() => printableRef.current}
          />
        </div>
      )}

      <SayonForm
        profileData={profile}
        isUpdating={(value) => {
          setIsEditing(value);
        }}
      />
      <div className="hidden">
        <SayonForm profileData={profile} ref={printableRef} onPrintPage />
      </div>
    </div>
  );
};

export default Profile;
