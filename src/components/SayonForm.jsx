import React, { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { ConvertDate } from "../utils/ConvertDate";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDoc,
  getDocs,
  limit,
} from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import Swal from "sweetalert2";

const SayonForm = (props) => {
  const [value, setValue] = useState({
    school: {
      id: "",
      name: "",
      region: "",
      division: "",
      sy: "",
      gradelvl: "",
      district: "",
      section: "",
    },
    lrn: "",
    name: "",
    sex: "",
    birth: "",
    age: "",
    mt: "",
    ip: "",
    religion: "",
    address: {
      street: "",
      barangay: "",
      municipality: "",
      province: "",
    },
    parents: {
      father: "",
      mother: "",
    },
    guardian: {
      name: "",
      relationship: "",
      contact: "",
    },
    modality: "",
    remarks: "",
  });

  const [error, setError] = useState({});

  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const profileDocRef = collection(firestore, "profiles");

  const sciFields = [
    {
      name: "school.id",
      value: value.school.id,
      label: "School ID",
      type: "number",
    },
    {
      name: "school.region",
      value: value.school.region,
      label: "Region",
      type: "text",
    },
    {
      name: "school.name",
      value: value.school.name,
      label: "School Name",
      type: "text",
      span: "col-span-2",
    },
  ];
  const sciiFields = [
    {
      name: "school.division",
      value: value.school.division,
      label: "Division",
      type: "text",
      span: "col-span-2",
    },
    {
      name: "school.sy",
      value: value.school.sy,
      label: "S.Y",
      type: "text",
    },
    {
      name: "school.gradelvl",
      value: value.school.gradelvl,
      label: "Grade Level",
      type: "text",
    },
  ];
  const sciiiFields = [
    {
      name: "school.district",
      value: value.school.district,
      label: "District",
      type: "text",
    },
    {
      name: "school.section",
      value: value.school.section,
      label: "Section",
      type: "text",
    },
  ];

  const schoolFields = [
    {
      formField: sciFields,
      span: "grid-cols-2",
    },
    {
      formField: sciiFields,
      span: "grid-cols-2",
    },
    {
      formField: sciiiFields,
      span: "",
    },
  ];

  const genderFields = [
    {
      name: "male",
      label: "Male",
      value: "male",
      checked: value.sex === "M",
    },
    {
      name: "female",
      label: "Female",
      value: "female",
      checked: value.sex === "F",
    },
  ];

  const profileFields = [
    {
      name: "lrn",
      value: value.lrn,
      label: "LRN",
      type: "number",
      span: "col-span-3",
      required: true,
    },
    {
      name: "name",
      value: value.name,
      label: "Name",
      type: "text",
      placeholder: "Last Name, First Name, Middle Name",
      span: "col-span-2",
      required: true,
    },
    {
      name: "sex",
      value: value.sex,
      label: "Sex",
      type: "checkbox",
    },
    {
      name: "birth",
      value: value.birth,
      label: "Birth Date",
      type: "date",
      span: "col-span-1",
      required: true,
    },
    {
      name: "age",
      value: value.age,
      label: "Age",
      placeholder: value.birth != "" ? ConvertDate.toAge(value.birth) : "",
      type: "number",
      required: true,
    },
    {
      name: "mt",
      value: value.mt,
      label: "Mother Tounge",
      placeholder: "Grade 1 to 3 only",
      type: "text",
    },
    {
      name: "ip",
      value: value.ip,
      label: "IP",
      placeholder: "Ethnic Group",
      type: "text",
    },
    {
      name: "religion",
      value: value.religion,
      label: "Religion",
      type: "text",
    },
  ];

  const parentsField = [
    {
      name: "parents.mother",
      value: value.parents.mother,
      label: "Mother's Maiden Name",
      type: "text",
      placeholder: "Last Name, First Name, Middle Name",
    },
    {
      name: "parents.father",
      value: value.parents.father,
      label: "Father's Name",
      type: "text",
      placeholder: "Last Name, First Name, Middle Name",
    },
  ];

  const guardianField = [
    {
      name: "guardian.name",
      value: value.guardian.name,
      label: "Name",
      type: "text",
      span: "col-span-3",
    },
    {
      name: "guardian.relationship",
      value: value.guardian.relationship,
      label: "Relationship",
      type: "text",
    },
    {
      name: "guardian.contact",
      value: value.guardian.contact,
      label: "Contact No.",
      placeholder: "Contact Number of Parent or Guardian",
      type: "number",
      span: "col-span-2",
    },
  ];

  const learningField = [
    {
      name: "modality",
      value: value.modality,
      label: "Learning Modality",
      type: "text",
    },
    {
      name: "Remarks",
      value: value.remarks,
      label: "Remarks",
      type: "text",
    },
  ];

  const handleOnChange = (e) => {
    const currentFieldObject = e.target.name.split(".")[0];
    const currentField = e.target.name.split(".")[1];
    const valueObjects = ["school", "address", "parents", "guardian"];

    if (valueObjects.includes(currentFieldObject)) {
      setValue({
        ...value,
        [currentFieldObject]: {
          ...value[currentFieldObject],
          [currentField]: e.target.value,
        },
      });
      setError({
        ...error,
        [currentFieldObject]: {
          ...value[currentFieldObject],
          [currentField]: "",
        },
      });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
      setError({
        ...error,
        [e.target.name]: "",
      });
    }
  };

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setValue({
      ...value,
      address: {
        ...value.address,
        province: e.target.selectedOptions[0].text,
      },
    });
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setValue({
      ...value,
      address: {
        ...value.address,
        municipality: e.target.selectedOptions[0].text,
      },
    });
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setValue({
      ...value,
      address: {
        ...value.address,
        barangay: e.target.selectedOptions[0].text,
      },
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Submitting Form",
        text: "Uploading Student Profile. Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const getRecordQuery = query(
        profileDocRef,
        where("lrn", "==", value.lrn),
      );

      const querySnapshot = await getDocs(getRecordQuery);

      const studentProfile = []

      querySnapshot.forEach( (doc) => {
        studentProfile.push(doc.data());
      });

      if (studentProfile.length === 0) {
        await setDoc(doc(profileDocRef), {
          ...value,
          createdAt: serverTimestamp(),
        });
      } else {
        throw new Error(
          `Student profile with LRN:${value.lrn} already exists in the database. Please check the data you are trying to submit.`,
        );
      }

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Profile Recorded!",
        text: "Student profile successfully recorded!",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
      // setValue({
      //   school: {
      //     id: "",
      //     name: "",
      //     region: "",
      //     division: "",
      //     sy: "",
      //     gradelvl: "",
      //     district: "",
      //     section: "",
      //   },
      //   lrn: "",
      //   name: "",
      //   sex: "",
      //   birth: "",
      //   age: "",
      //   mt: "",
      //   ip: "",
      //   religion: "",
      //   address: {
      //     street: "",
      //     barangay: "",
      //     municipality: "",
      //     province: "",
      //   },
      //   parents: {
      //     father: "",
      //     mother: "",
      //   },
      //   guardian: {
      //     name: "",
      //     relationship: "",
      //     contact: "",
      //   },
      //   modality: "",
      //   remarks: "",
      // });
      // setRegion();
      // setProvince();
      // setCity();
      // setBarangay();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong.",
        text: error.message,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
    }
  };

  useEffect(() => {
    region();
  }, []);

  return (
    <form className="p-4" onSubmit={handleSubmitForm}>
      {/* Header */}
      <div className="mb-8 p-8">
        <h1 className="text-center text-xl font-black text-blue-500">
          School Form 1 (SF 1) School Registrar
        </h1>
        <h2 className="text-center text-[10px]">
          (This replaces Form 1 Master List & STS Form 2-Family Background and
          Profile)
        </h2>
      </div>
      {/* Fields */}

      <div className="mb-4 flex gap-8  max-lg:flex-col">
        {schoolFields.map((field, index) => (
          <div key={index} className={`grid flex-1 ${field.span} gap-2`}>
            {field.formField.map((formField, formFieldIndex) => (
              <div
                key={formFieldIndex}
                className={`flex flex-col text-sm ${formField.span}`}
              >
                <label
                  htmlFor={formField.name}
                  className="text-[11px] font-bold"
                >
                  {formField.label}
                </label>
                <input
                  id={formField.name}
                  name={formField.name}
                  value={formField.value}
                  type={formField.type}
                  placeholder={formField.placeholder}
                  onChange={handleOnChange}
                  required
                  className="rounded-sm border border-gray-300 px-2 py-1"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <h1 className="mb-4 text-xl font-bold text-gray-400">Profile</h1>

      <div className="mb-4 gap-8">
        <div className="grid grid-cols-3 gap-2">
          {profileFields.map((formField, formFieldIndex) => (
            <div
              key={formFieldIndex}
              className={`flex flex-col text-sm ${formField.span} max-md:col-span-3 max-sm:col-span-3`}
            >
              {["sex"].includes(formField.name) ? (
                <>
                  <span className="text-[11px] font-bold">
                    {formField.label}
                  </span>

                  <div className="flex h-full items-center gap-8">
                    {genderFields.map((field, genderIndex) => (
                      <div
                        key={genderIndex}
                        className="flex items-center gap-2"
                      >
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.value}
                          checked={field.checked}
                          type={formField.type}
                          onChange={(e) => {
                            setValue({
                              ...value,
                              [formField.name]: e.target.checked
                                ? e.target.name.charAt(0).toUpperCase()
                                : "",
                            });
                          }}
                        />
                        <label
                          htmlFor={field.name}
                          className="text-[11px] font-bold"
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label
                    htmlFor={formField.name}
                    className="text-[11px] font-bold"
                  >
                    {formField.label}
                  </label>
                  <input
                    id={formField.name}
                    name={formField.name}
                    value={formField.value}
                    type={formField.type}
                    placeholder={formField.placeholder}
                    onChange={handleOnChange}
                    required={formField.required}
                    className="rounded-sm border border-gray-300 px-2 py-1"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <h1 className="mb-4 text-xl font-bold text-gray-400">Address</h1>

      <div className="mb-2">
        <label htmlFor="street" className="text-[11px] font-bold">
          Street
        </label>
        <input
          id="street"
          name="address.street"
          value={value.address.street}
          type="text"
          placeholder="House No. / Street / Sitio / Purok"
          onChange={handleOnChange}
          required
          className="w-full rounded-sm border border-gray-300 px-2 py-1 text-sm"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 grid-rows-2 gap-2 [&>select]:max-md:col-span-3">
        <select
          onChange={province}
          onSelect={region}
          className="col-span-3 rounded-sm border border-gray-300 px-2 py-1 text-sm"
          required="required"
        >
          <option value="">Select Region</option>
          {regionData &&
            regionData.length > 0 &&
            regionData.map((item) => (
              <option key={item.region_code} value={item.region_code}>
                {item.region_name}
              </option>
            ))}
        </select>
        <select
          onChange={city}
          className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
          required="required"
        >
          <option value="">Select Province</option>
          {provinceData &&
            provinceData.length > 0 &&
            provinceData.map((item) => (
              <option key={item.province_code} value={item.province_code}>
                {item.province_name}
              </option>
            ))}
        </select>
        <select
          onChange={barangay}
          className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
          required="required"
        >
          <option value="">Select Municipality</option>
          {cityData &&
            cityData.length > 0 &&
            cityData.map((item) => (
              <option key={item.city_code} value={item.city_code}>
                {item.city_name}
              </option>
            ))}
        </select>
        <select
          onChange={brgy}
          className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
          required="required"
        >
          <option value="">Select Barangay</option>
          {barangayData &&
            barangayData.length > 0 &&
            barangayData.map((item) => (
              <option key={item.brgy_code} value={item.brgy_code}>
                {item.brgy_name}
              </option>
            ))}
        </select>
      </div>

      <h1 className="mb-4 text-xl font-bold text-gray-400">Parents</h1>

      <div className="mb-4 flex flex-col gap-2">
        {parentsField.map((formField, formFieldIndex) => (
          <div key={formFieldIndex} className="flex flex-col text-sm">
            <label htmlFor={formField.name} className="text-[11px] font-bold">
              {formField.label}
            </label>
            <input
              id={formField.name}
              name={formField.name}
              value={formField.value}
              type={formField.type}
              placeholder={formField.placeholder}
              onChange={handleOnChange}
              className="rounded-sm border border-gray-300 px-2 py-1"
              required
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-400">Guardian</h1>
        <span className="text-xs">(If Not Parent)</span>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {guardianField.map((formField, formFieldIndex) => (
          <div
            key={formFieldIndex}
            className={`flex flex-col text-sm ${formField.span} max-md:col-span-3`}
          >
            <label htmlFor={formField.name} className="text-[11px] font-bold">
              {formField.label}
            </label>
            <input
              id={formField.name}
              name={formField.name}
              value={formField.value}
              type={formField.type}
              placeholder={formField.placeholder}
              onChange={handleOnChange}
              className="rounded-sm border border-gray-300 px-2 py-1"
            />
          </div>
        ))}
      </div>

      <h1 className="mb-4 text-xl font-bold text-gray-400">Remarks</h1>

      <div className="mb-4 flex gap-2 max-md:flex-col">
        {learningField.map((formField, formFieldIndex) => (
          <div key={formFieldIndex} className="flex flex-1 flex-col text-sm">
            <label htmlFor={formField.name} className="text-[11px] font-bold">
              {formField.label}
            </label>
            <input
              id={formField.name}
              name={formField.name}
              value={formField.value}
              type={formField.type}
              placeholder={formField.placeholder}
              onChange={handleOnChange}
              className="rounded-sm border border-gray-300 px-2 py-1"
            />
          </div>
        ))}
      </div>
      <button
        className="w-full rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SayonForm;
