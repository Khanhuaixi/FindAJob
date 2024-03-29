import axios from "axios";
import { URL } from "../../constants/constants";

export async function createJob(
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
  }).catch((e) => console.log(e));
}

export async function getJobs() {
  let jobs = {};
  const res = await axios
    .get(URL + "/api/Jobs")
    .then((response) => {
      jobs = response.data;
    })
    .catch((e) => console.log(e));
  return jobs;
}

export async function getJobById(id) {
  let job = {};
  const res = await axios
    .get(URL + "/api/Jobs/" + id)
    .then((response) => {
      job = response.data;
    })
    .catch((e) => console.log(e));
  return job;
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
  fetch(URL + "/api/Jobs/" + jobId, {
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
  }).catch((e) => console.log(e));
}

export async function deleteJob(id) {
  fetch(URL + "/api/Jobs/" + id, {
    method: "DELETE",
  }).catch((e) => console.log(e));
}
