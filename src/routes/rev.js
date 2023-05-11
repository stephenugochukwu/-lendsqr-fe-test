import React, { useState, useEffect } from "react";
function RevDet() {
  const [rev, setRev] = useState([]);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [error, setError] = useState(null);
  let url = "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setRev(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Revenue</h1>
      <table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Joined</th>
            <th>Profile</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rev.map((rev) => (
            <tr key={rev.id}>
              <td>{rev.orgName}</td>
              <td>{rev.userName}</td>
              <td>{rev.email}</td>
              <td>{rev.phoneNumber}</td>
              <td>{rev.createdAt}</td>
              <td>
                <img src={rev.profile.avatar} alt="status" />
              </td>
              <td>
                {Date.parse(rev.createdAt) > Date.parse(rev.lastActiveDate)
                  ? "Active"
                  : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevDet;
