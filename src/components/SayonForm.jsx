import React, { forwardRef, useEffect, useState } from "react";
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
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SayonForm = forwardRef((props, ref) => {
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
      region: "",
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
  const navigate = useNavigate();

  const [currentProfile, setCurrentProfile] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);

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
      placeholder:
        props.profileData || props.onPrintPage ? "" : "Grade 1 to 3 only",
      type: "text",
    },
    {
      name: "ip",
      value: value.ip,
      label: "IP",
      placeholder: props.profileData || props.onPrintPage ? "" : "Ethnic Group",
      type: "text",
    },
    {
      name: "religion",
      value: value.religion,
      label: "Religion",
      type: "text",
    },
  ];

  const parentsFields = [
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

  const guardianFields = [
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
      placeholder:
        props.profileData || props.onPrintPage
          ? ""
          : "Contact Number of Parent or Guardian",
      type: "number",
      span: "col-span-2",
    },
  ];

  const learningFields = [
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
    setValue({
      ...value,
      address: {
        ...value.address,
        region: e.target.selectedOptions[0].text,
      },
    });
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

  const renderOptions = (addressData, code, name) => {
    return (
      <>
        {addressData &&
          addressData.length > 0 &&
          addressData.map((item) => (
            <option key={item[code]} value={item[code]}>
              {item[name]}
            </option>
          ))}
      </>
    );
  };

  const addressFields = [
    {
      onChange: province,
      onSelect: region,
      data: regionData,
      label: "Region",
      propValue: props?.profileData?.address.region,
      placeholder: "Select Region",
      renderOptions: renderOptions(regionData, "region_code", "region_name"),
    },
    {
      onChange: city,
      data: provinceData,
      label: "Province",
      propValue: props?.profileData?.address.province,
      placeholder: "Select Province",
      renderOptions: renderOptions(
        provinceData,
        "province_code",
        "province_name",
      ),
    },
    {
      onChange: barangay,
      data: cityData,
      label: "Municipality",
      propValue: props?.profileData?.address.municipality,
      placeholder: "Select Municipality",
      renderOptions: renderOptions(cityData, "city_code", "city_name"),
    },
    {
      onChange: brgy,
      data: barangayData,
      label: "Barangay",
      propValue: props?.profileData?.address.barangay,
      placeholder: "Select Barangay",
      renderOptions: renderOptions(barangayData, "brgy_code", "brgy_name"),
    },
  ];

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

      const studentProfile = [];

      querySnapshot.forEach((doc) => {
        studentProfile.push(doc.data());
      });

      if (studentProfile.length > 0) {
        throw new Error(
          `Student profile with LRN:${value.lrn} already exists in the database. Please check the data you are trying to submit.`,
        );
      }

      const docRef = await addDoc(profileDocRef, {});
      await setDoc(doc(profileDocRef, docRef.id), {
        ...value,
        docId: docRef.id,
        updatedAt: null,
        createdAt: serverTimestamp(),
      });

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
      setValue({
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
      setRegion();
      setProvince();
      setCity();
      setBarangay();
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

  const handleCancelUpdate = () => {
    if (currentProfile === value) {
      setIsUpdating(false);
      props.isUpdating(false);
    } else {
      Swal.fire({
        title: "Are you sure you want to cancel?",
        showCancelButton: true,
        showConfirmButton: true,
        reverseButtons: true,
        cancelButtonColor: "#3b82f6",
        confirmButtonColor: "#6b7280",
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsUpdating(false);
        }
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (isUpdating && currentProfile === value) return;

      await Swal.fire({
        title: "Are you sure you want to update this record?",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        reverseButtons: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#6b7280",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      }).then(async (result) => {
        if (result.isDenied) {
          setIsUpdating(false);
        }
      });

      Swal.fire({
        title: "Updating Record",
        text: "Updating Student Profile. Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await updateDoc(doc(profileDocRef, props.profileData.docId), {
        ...value,
        updatedAt: serverTimestamp(),
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        showConfirmButton: false,
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
      setIsUpdating(false);
      navigate(-1);
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
    if (props.profileData) {
      setValue(props.profileData);
      setCurrentProfile(props.profileData);
    }
  }, [isUpdating]);

  useEffect(() => {
    region();
  }, []);

  return (
    <form className="p-4 text-sm" onSubmit={handleSubmitForm} ref={ref}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-center text-xl font-black text-blue-500">
          School Form 1 (SF 1) School Registrar
        </h1>
        <h2 className="text-center text-[10px]">
          (This replaces Form 1 Master List & STS Form 2-Family Background and
          Profile)
        </h2>
      </div>
      {/* Fields */}

      <div
        className={`mb-4 flex gap-8  max-lg:flex-col ${
          props.onPrintPage && "max-md:flex-row "
        }`}
      >
        {schoolFields.map((field, index) => (
          <div key={index} className={`grid flex-1 ${field.span} gap-2`}>
            {field.formField.map((formField, formFieldIndex) => (
              <div
                key={formFieldIndex}
                className={`flex flex-col ${formField.span} ${
                  props.onPrintPage && "border-b"
                }`}
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
                  disabled={
                    props?.profileData ? (!isUpdating ? true : false) : false
                  }
                  className={`rounded-sm ${
                    props?.profileData
                      ? !isUpdating
                        ? ""
                        : "border"
                      : "border"
                  } border-gray-300 px-2 py-1 disabled:bg-gray-200`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <h1 className="mb-2 text-lg font-bold text-gray-400">Profile</h1>

      <div className="mb-2 gap-8">
        <div className="grid grid-cols-3 gap-2">
          {profileFields.map((formField, formFieldIndex) => (
            <div
              key={formFieldIndex}
              className={`flex flex-col ${formField.span} ${
                props.onPrintPage
                  ? "border-b"
                  : "max-md:col-span-3 max-sm:col-span-3"
              }`}
            >
              {["sex"].includes(formField.name) ? (
                <>
                  <span className="text-[11px] font-bold">
                    {formField.label}
                  </span>

                  <div className="flex h-full items-center gap-8">
                    {props.onPrintPage ? (
                      <p>{props.profileData.sex}</p>
                    ) : (
                      <>
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
                              disabled={
                                props?.profileData
                                  ? !isUpdating
                                    ? true
                                    : false
                                  : false
                              }
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
                      </>
                    )}
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
                    disabled={
                      props?.profileData ? (!isUpdating ? true : false) : false
                    }
                    className={`rounded-sm ${
                      props?.profileData
                        ? !isUpdating
                          ? ""
                          : "border"
                        : "border"
                    } border-gray-300 px-2 py-1 disabled:bg-gray-200`}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <h1 className="mb-2 text-lg font-bold text-gray-400">Address</h1>

      <div className={`mb-2 ${props.onPrintPage && "border-b"}`}>
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
          disabled={props?.profileData ? (!isUpdating ? true : false) : false}
          className={`w-full rounded-sm ${
            props?.profileData ? (!isUpdating ? "" : "border") : "border"
          } border-gray-300 px-2 py-1 disabled:bg-gray-200`}
        />
      </div>

      <div
        className={`mb-2 grid grid-cols-4  gap-2  ${
          !props.onPrintPage
            ? "[&>div]:max-md:col-span-4"
            : "[&>div]:max-md:col-span-1"
        }`}
      >
        {addressFields.map((item, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={item.label} className="text-[11px] font-bold">
              {item.label}
            </label>
            <select
              id={item.label}
              onChange={item.onChange}
              onSelect={item.onSelect}
              disabled={
                props?.profileData ? (!isUpdating ? true : false) : false
              }
              className={`rounded-sm ${
                props?.profileData
                  ? !isUpdating
                    ? "appearance-none"
                    : "border"
                  : "border"
              } border-gray-300 px-2 py-1 disabled:bg-gray-200 ${
                props.onPrintPage && "rounded-none border-b"
              }`}
              required="required"
            >
              {props.profileData ? (
                <>
                  {!isUpdating ? (
                    <option>{item.propValue}</option>
                  ) : (
                    <>
                      <option>{item.propValue}</option>
                      {item.renderOptions}
                    </>
                  )}
                </>
              ) : (
                <>
                  <option value="">{item.placeholder}</option>
                  {item.renderOptions}
                </>
              )}
            </select>
          </div>
        ))}
      </div>

      <h1 className="mb-2 text-lg font-bold text-gray-400">Parents</h1>

      <div
        className={`mb-2 flex ${props?.onPrintPage ? "" : "flex-col"} gap-2`}
      >
        {parentsFields.map((formField, formFieldIndex) => (
          <div key={formFieldIndex} className="flex flex-1 flex-col ">
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
              disabled={
                props?.profileData ? (!isUpdating ? true : false) : false
              }
              className={`rounded-sm ${
                props?.profileData ? (!isUpdating ? "" : "border") : "border"
              } border-gray-300 px-2 py-1 disabled:bg-gray-200 ${
                props.onPrintPage && "rounded-none border-b"
              }`}
              required
            />
          </div>
        ))}
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold text-gray-400">Guardian</h1>
        <span className="text-xs">(If Not Parent)</span>
      </div>

      <div
        className={`mb-2 grid ${
          props?.onPrintPage ? "grid-cols-3" : "grid-cols-2"
        } gap-2`}
      >
        {guardianFields.map((formField, formFieldIndex) => (
          <div
            key={formFieldIndex}
            className={`flex flex-col ${formField.span} ${
              props.onPrintPage && "border-b max-md:col-span-1"
            }`}
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
              disabled={
                props?.profileData ? (!isUpdating ? true : false) : false
              }
              className={`rounded-sm ${
                props?.profileData ? (!isUpdating ? "" : "border") : "border"
              } border-gray-300 px-2 py-1 disabled:bg-gray-200`}
            />
          </div>
        ))}
      </div>

      <h1 className="mb-2 text-lg font-bold text-gray-400">Remarks</h1>

      <div className={`${props.onPrintPage ? "" : "mb-2"} flex gap-2`}>
        {learningFields.map((formField, formFieldIndex) => (
          <div key={formFieldIndex} className="flex flex-1 flex-col">
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
              disabled={
                props?.profileData ? (!isUpdating ? true : false) : false
              }
              className={`rounded-sm ${
                props?.profileData ? (!isUpdating ? "" : "border") : "border"
              } border-gray-300 px-2 py-1 disabled:bg-gray-200 ${
                props.onPrintPage && "rounded-none border-b"
              }`}
            />
          </div>
        ))}
      </div>

      {!props.profileData ? (
        <button
          className="w-full rounded-md bg-blue-500 px-2 py-1 font-semibold text-white"
          type="submit"
        >
          Submit
        </button>
      ) : !props.onPrintPage ? (
        <div className="flex items-center justify-between gap-4">
          {!isUpdating ? (
            <button
              className="w-full rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white"
              type="button"
              onClick={() => {
                setIsUpdating(true);
                props.isUpdating(true);
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="w-full rounded-md bg-gray-500 px-2 py-1 text-sm font-semibold text-white"
                type="button"
                onClick={handleCancelUpdate}
              >
                Cancel
              </button>
              <button
                className="w-full rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white"
                type="button"
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
});

export default SayonForm;
