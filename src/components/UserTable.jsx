import React, { useState, useEffect, useMemo } from "react";
// import UserData from "../data.json";
import Pagination from "./Pagination";
import icon from "../assets/earth.svg";
import FIlter from "./FIlter";
import Detailsmodal from "../components/Detailsmodal";

let PageSize = 9;

const UserTable = ({ details }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displaydetails, setdisplaydetails] = useState(false);
  const [displayfilter, setdisplayfilter] = useState(false);
  const [data, setData] = useState([]);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const status = ["inactive", "active", "pending", "blacklisted"];
  const URL =
    "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  };
  const active = (id) => {
    if (displaydetails === id) {
      return setdisplaydetails(null);
    }
    setdisplaydetails(id);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="px-2 table-responsive w-100">
      {displayfilter && <FIlter />}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              ORGANIZATION
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th>
              USERNAME
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th>
              EMAIL
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th>
              PHONE NUMBER
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th>
              DATE JOINED
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th>
              STATUS
              <img
                onClick={() => setdisplayfilter(!displayfilter)}
                className="px-2"
                src={icon}
                alt="icon"
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="position-relative">
          {currentTableData.map((userdata) => {
            return (
              <tr>
                <td>{userdata.orgName}</td>
                <td>{userdata.userName}</td>
                <td>{userdata.email}</td>
                <td>{userdata.phoneNumber}</td>
                <td>
                  {weekday[new Date(userdata.createdAt).getUTCDay()] +
                    "," +
                    " " +
                    userdata.createdAt.slice(11, 19)}
                </td>
                <td>{userdata.status}</td>
                {displaydetails === userdata.id && (
                  <Detailsmodal details={details} />
                )}
                 <button
                className={
                  userdata.accountBalance === Number("510.9")
                    ? "statusBtn inactive"
                    : userdata.accountBalance <= 501.4
                    ? "statusBtn pending"
                    : userdata.accountBalance >= 800
                    ? "statusBtn active"
                    : "statusBtn blacklisted"
                }
              >
                {userdata.accountBalance === Number("510.9")
                  ? status[0]
                  : userdata.accountBalance <= 501.4
                  ? status[2]
                  : userdata.accountBalance >= 800
                  ? status[1]
                  : status[3]}
              </button>
                <td key={userdata.id} onClick={() => active(userdata.id)}>
                  <i class="bi bi-three-dots-vertical"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="ml-auto"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserTable;
