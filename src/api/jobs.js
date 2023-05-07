import axios from "axios";
import { URL } from "../../constants";

export async function createJob(
  jobId,
  jobName,
  employerId,
  jobDescription,
  careerLevel,
  yearOfExperience,
  qualification,
  jobType,
  jobSpecialization,
  salaryRange,
  applicantList
) {
  fetch(URL + "/api/Jobs", {
    method: "POST",
    body: JSON.stringify({
      JobId: jobId,
      JobName: jobName,
      EmployerId: employerId,
      JobDescription: jobDescription,
      CareerLevel: careerLevel,
      YearOfExperience: yearOfExperience,
      Qualification: qualification,
      JobType: jobType,
      JobSpecialization: jobSpecialization,
      SalaryRange: salaryRange,
      ApplicantList: applicantList,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => console.log(e));
}

export async function getJobs() {
  let jobs = {};
  const res = await axios.get(URL + "/api/Jobs").then((response) => {
    jobs = response.data;
  });
  return jobs;
}

export async function getJobById(id) {
  let jobs = {};
  const res = await axios.get(URL + "/api/Jobs/" + id).then((response) => {
    jobs = response.data;
  });
  return jobs;
}

export async function updateJob(
  jobId,
  jobName,
  employerId,
  jobDescription,
  careerLevel,
  yearOfExperience,
  qualification,
  jobType,
  jobSpecialization,
  salaryRange,
  applicantList
) {
  fetch(URL + "/api/Jobs/" + id, {
    method: "PUT",
    body: JSON.stringify({
      JobId: jobId,
      JobName: jobName,
      EmployerId: employerId,
      JobDescription: jobDescription,
      CareerLevel: careerLevel,
      YearOfExperience: yearOfExperience,
      Qualification: qualification,
      JobType: jobType,
      JobSpecialization: jobSpecialization,
      SalaryRange: salaryRange,
      ApplicantList: applicantList,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => console.log(e));
}

export async function deleteJob(id) {
  fetch(URL + "/api/Jobs/" + id, {
    method: "DELETE",
  }).then((res) => console.log(res));
}
