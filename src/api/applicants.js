import axios from "axios";
import { URL } from "../../constants/constants";

export async function createApplicant(
  firstName,
  lastName,
  email,
  contactNumber,
  applicationList,
  expectedSalary,
  experience,
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
      Experience: experience,
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
  const res = await axios
    .get(URL + "/api/Applicants")
    .then((response) => {
      applicants = response.data;
    })
    .catch((e) => console.log(e));
  return applicants;
}

export async function getApplicantById(id) {
  let applicant = {};
  const res = await axios
    .get(URL + "/api/Applicants/" + id)
    .then((response) => {
      applicant = response.data;
    })
    .catch((e) => console.log(e));
  return applicant;
}

export async function updateApplicant(
  applicantId,
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
  fetch(URL + "/api/Applicants/" + applicantId, {
    method: "PUT",
    body: JSON.stringify({
      ApplicantId: applicantId,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      ContactNumber: contactNumber,
      ApplicationList: applicationList,
      ExpectedSalary: expectedSalary,
      Experience: experience,
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

export async function deleteApplicant(id) {
  fetch(URL + "/api/Applicants/" + id, {
    method: "DELETE",
  }).catch((e) => console.log(e));
}
