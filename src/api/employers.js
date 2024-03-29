import axios from "axios";
import { URL } from "../../constants/constants";

export async function createEmployer(
  email,
  companyName,
  companyType,
  star,
  companyOverview
) {
  fetch(URL + "/api/Employers", {
    method: "POST",
    body: JSON.stringify({
      Email: email,
      CompanyName: companyName,
      CompanyType: companyType,
      Star: star,
      CompanyOverview: companyOverview,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));
}

export async function getEmployers() {
  let employers = {};
  const res = await axios
    .get(URL + "/api/Employers")
    .then((response) => {
      employers = response.data;
    })
    .catch((e) => console.log(e));
  return employers;
}

export async function getEmployerById(id) {
  let employer = {};
  const res = await axios
    .get(URL + "/api/Employers/" + id)
    .then((response) => {
      employer = response.data;
    })
    .catch((e) => console.log(e));
  return employer;
}

export async function updateEmployer(
  employerId,
  email,
  companyName,
  companyType,
  star,
  companyOverview
) {
  fetch(URL + "/api/Employers/" + employerId, {
    method: "PUT",
    body: JSON.stringify({
      EmployerId: employerId,
      Email: email,
      CompanyName: companyName,
      CompanyType: companyType,
      Star: star,
      CompanyOverview: companyOverview,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));
}

export async function deleteEmployer(id) {
  fetch(URL + "/api/Employers/" + id, {
    method: "DELETE",
  }).catch((e) => console.log(e));
}
