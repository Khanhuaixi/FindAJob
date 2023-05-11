import axios from "axios";
import { URL } from "../../constants/constants";

export async function createApplicant(
  firstName,
  lastName,
  email,
  contactNumber,
  applicationList,
  expectedSalary,
  education,
  skill,
  languages,
  age,
  address
) {
  fetch(URL + "/api/Applicants", {
    method: "POST",
    body: JSON.stringify({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      ContactNumber: contactNumber,
      ApplicationList: applicationList,
      ExpectedSalary: expectedSalary,
      Education: education,
      Skill: skill,
      Languages: languages,
      Age: age,
      Address: address,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));
}

export async function getApplicants() {
  let applicants = {};
  const res = await axios.get(URL + "/api/Employers").then((response) => {
    employers = response.data;
  });
  return employers;
}

export async function getApplicantById(id) {
  let employers = {};
  const res = await axios
    .get(URL + "/api/Applicants/" + id)
    .then((response) => {
      employers = response.data;
    })
    .catch((e) => console.log(e));
  return employers;
}

export async function updateEmployer(
  employerId,
  companyName,
  companyType,
  star,
  companyOverview
) {
  fetch(URL + "/api/Employers/" + employerId, {
    method: "PUT",
    body: JSON.stringify({
      EmployerId: employerId,
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
