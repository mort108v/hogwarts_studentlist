"use strict"

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

export let allConstants = {
    filterButtons: document.querySelectorAll(`[data-action="filter"]`),
    sortButtons: document.querySelectorAll(`[data-action="sort"]`),
    studentTemplates: document.querySelectorAll(`[data-field=firstname]`),
}



// async function loadJSON()
export async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    const jsonData = await response.json()
    prepareObjects(jsonData)
}

// function prepareObjects(jsonData)
function prepareObjects(jsonData) {
    console.log("JSON Loaded")
    allStudentVariables.allStudents = jsonData.map(makeStudents)
    displayList(allStudentVariables.allStudents)
}

//Display List of students
function displayList(students) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = ""

    // build a new list
    students.forEach(displayStudent)
}

function displayStudent(student) {

    // create clone
    const clone = document.querySelector("template#student").content.cloneNode(true)
        // set clone data
    clone.querySelector("[data-field=firstname]").textContent = student.firstname
    clone.querySelector("[data-field=middlename]").textContent = student.middlename
    clone.querySelector("[data-field=lastname]").textContent = student.lastname
    clone.querySelector("[data-field=nickname]").textContent = student.nickname
    clone.querySelector("[data-field=gender]").textContent = student.gender
    clone.querySelector("[data-field=bloodstatus]").textContent = student.bloodstatus
    clone.querySelector("[data-field=house]").textContent = student.house
    clone.querySelector(".student-photo").src = student.image
        // append clone to list
    document.querySelector("#list tbody").appendChild(clone)

}


function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
}
// function makeStudents(jsonObject)
// 	firstName | middleName | lastName | nickname | gender | house | isPureblood | isHalfblood | isPlainMuggle | isPrefect | isInquis
function makeStudents(jsonObject) {
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

// Sort students
// function sortStudents(sort, sortDirection)
// 	firstName | lastName | house | prefects | inquisitorialSquad
export function listenForBTNclick() {
    console.log("button listen");

    // Add event-listeners to filter and sort buttons
    allConstants.sortButtons.forEach((sortButton) => {
        sortButton.addEventListener("click", clickSortButton);
    });

    allConstants.filterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", clickFilterButton);
    });
}

function clickSortButton(sortButton) {
    console.log("Sorting Clicked");

    const sort = sortButton.target.dataset.sort;
    const sortDirection = sortButton.target.dataset.sortDirection;

    sortButton.target.dataset.sortDirection = sortDirection === "asc" ? "desc" : "asc";

    selectSort(sort, sortDirection);
}

function selectSort(sort, direction) {
    currentSort = sort;
    currentSortDirection = direction;

    buildList();
}

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
// function filterStudents()
// 	house | responsibilities | expelled | nonExpelled

function clickFilterButton(filterButton) {
    console.log("filterClicked");

    const filter = filterButton.target.dataset.filter;
    selectFilter(filter);
}

function selectFilter(filter) {
    currentFilter = filter;
    buildList();
}

function buildList() {

    const filteredStudents = filterStudents(currentFilter);

    const sortedStudents = sortStudents(filteredStudents);


    console.log("My Sorted Students ", sortedStudents);

    displayList(sortedStudents);
}

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