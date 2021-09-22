"use strict"

import { displayList } from "./hogwarts.js";

const Student = {
    firstname: " ",
    middlename: " ",
    lastname: " ",
    nickname: " ",
    gender: " ",
    house: " ",
    bloodstatus: " ",
    isPrefect: false,
    isInquis: false,
    isExpelled: false,
}

export let allStudentVariables = {
    allStudents: [],
    prefects: [],
    inquisitorialSquad: [],
    // student: []
}


let currentFilter = "*";
let currentSort = "firstname";
let currentSortDirection = "asc";

// async function loadJSON()
export async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    const jsonData = await response.json()
    prepareObjects(jsonData)
}

// function prepareObjects(jsonData)
function prepareObjects(jsonData) {
    console.log("JSON Loaded")
    allStudentVariables.allStudents = jsonData.map(makeStudent)
    displayList(allStudentVariables.allStudents)
}


function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
}
// function makeStudents(jsonObject)
// 	firstName | middleName | lastName | nickname | gender | house | isPureblood | isHalfblood | isPlainMuggle | isPrefect | isInquis
function makeStudent(jsonObject) {
    console.log("Student in the making")

    const student = Object.create(Student)
        // Student Full Name 
    const studentFullName = jsonObject.fullname.trim()
    const studentFullNameSplit = studentFullName.split(" ")

    // Student First Name
    const studentFirstname = studentFullNameSplit[0]
    student.firstname = capitalize(studentFirstname)
        // Student Middle Name
    if (studentFullNameSplit.length > 2) {
        const studentMiddlename = studentFullNameSplit[1]
        student.middlename = capitalize(studentMiddlename)
    }

    if (studentFullNameSplit.length > 2) {
        // Student Last Name
        const studentLastname = studentFullNameSplit[2]
        student.lastname = capitalize(studentLastname)
    } else if (studentFullNameSplit.length == 2) {
        const studentLastnameTwo = studentFullNameSplit[1]
        student.lastname = capitalize(studentLastnameTwo)
    }

    // Student Nickname
    if (studentFullName.includes(`"`)) {
        student.middlename = ""
        const studentNickname = studentFullNameSplit[1]
        student.nickname = `"` + studentNickname.charAt(1).toUpperCase() + studentNickname.substring(2)
    }

    // Student Gender
    const studentGender = jsonObject.gender.trim()
    student.gender = capitalize(studentGender)

    // Student House
    const studentHouse = jsonObject.house.trim()
    student.house = capitalize(studentHouse)

    // Student Image
    const studentImageURL = "studentphotos/";
    student.image = studentImageURL + student.lastname.toLowerCase() + "_" + student.firstname.charAt(0).toLowerCase() + ".png"


    return student
}

// buildList filters and sorts the list of students according to global settings
function buildList() {
    const filteredStudents = filterStudents(currentFilter);
    const sortedStudents = sortStudents(filteredStudents);

    console.log("My Sorted Students ", sortedStudents);

    displayList(sortedStudents);
}

// Sort students
export function selectSort(sort, direction) {
    currentSort = sort;
    currentSortDirection = direction;

    buildList();
}

// function sortStudents( list of students to sort)
// 	firstName | lastName | house | prefects | inquisitorialSquad
function sortStudents(listOfStudents) {
    const sort = currentSort;
    const sortDirection = currentSortDirection;

    listOfStudents.sort((a, b) => {
        if (sortDirection === "asc") {
            // Ascending
            return a[sort] > b[sort] ? 1 : -1;
        } else {
            // Implicit descending
            return a[sort] > b[sort] ? -1 : 1;
        }
    });
    return listOfStudents;
}

// Filter students
export function selectFilter(filter) {
    currentFilter = filter;
    buildList();
}


// function filterStudents()
// 	house | responsibilities | expelled | nonExpelled
function filterStudents(filter) {
    let allStudents = allStudentVariables.allStudents

    let filtered = []
    if (filter === "prefect") {
        filtered = allStudents.filter(isPrefect)
    } else if (filter === "inquis") {
        filtered = allStudents.filter(isInquis)
    } else {
        filtered = allStudents.filter(student => filter === "*" || filter === student.house.toLowerCase())
    }

    return filtered
}


function isPrefect(student) {
    if (student.prefect) return true
}

function isInquis(student) {
    if (student.inquis) return true
}

function isAll(student) {
    if (student) return true
}
// About info
// function studentNumberInfo()
// 	numberOfStudentsInHouse | totalNumberOfStudents | numberOfStudentsExpelled | numberOfStudentsDisplayed