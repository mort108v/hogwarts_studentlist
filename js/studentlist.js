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

let allStudentVariables = {
    allStudents: [],
    // filter:,
    filteredStudents: [],
    sortedStudents: [],
    prefects: [],
    inquisitorialSquad: []
}

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
    allStudentVariables.filteredStudents = allStudentVariables.allStudents
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
// function makeStudents(jsonObject)
// 	firstName | middleName | lastName | nickname | gender | house | isPureblood | isHalfblood | isPlainMuggle | isPrefect | isInquis
function makeStudents(jsonObject) {
    console.log("Student in the making")

    const student = Object.create(Student)
        // Student Full Name 
    const studentFullName = jsonObject.fullname.substring(0).toLowerCase().trim()
    const studentFullNameSplit = studentFullName.split(" ")

    // Student First Name
    const studentFirstname = studentFullNameSplit[0]
    student.firstname = studentFirstname.charAt(0).toUpperCase() + studentFirstname.substring(1)

    // Student Middle Name
    if (studentFullNameSplit.length > 2) {
        const studentMiddlename = studentFullNameSplit[1]
        student.middlename = studentMiddlename.charAt(0).toUpperCase() + studentMiddlename.substring(1)
    }

    if (studentFullNameSplit.length > 2) {
        // Student Last Name
        const studentLastname = studentFullNameSplit[2]
        student.lastname = studentLastname.charAt(0).toUpperCase() + studentLastname.substring(1)
    } else if (studentFullNameSplit.length == 2) {
        const studentLastnameTwo = studentFullNameSplit[1]
        student.lastname = studentLastnameTwo.charAt(0).toUpperCase() + studentLastnameTwo.substring(1)
    }

    // Student Nickname
    if (studentFullName.includes(`"`)) {
        student.middlename = ""
        const studentNickname = studentFullNameSplit[1]
        student.nickname = `"` + studentNickname.charAt(1).toUpperCase() + studentNickname.substring(2)
    }

    // Student Gender
    const studentGender = jsonObject.gender.substring().toLowerCase().trim()
    student.gender = studentGender.charAt(0).toUpperCase() + studentGender.substring(1)

    // Student House
    const studentHouse = jsonObject.house.substring().toLowerCase().trim()
    student.house = studentHouse.charAt(0).toUpperCase() + studentHouse.substring(1)

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

    console.log("Dataset", sortButton.target.dataset);

    const sortedStudents = sortStudents(sort, sortDirection);
    sortButton.target.dataset.sortDirection = sortDirection === "asc" ? "desc" : "asc";
    console.log("My Sorted Students ", sortedStudents);

    displayList(sortedStudents);
}

function sortStudents(sort, sortDirection, ) {
    console.log("Sorting the student list", sort, allStudentVariables.filteredStudents);

    switch (sort) {
        case "firstname":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.firstname > b.firstname ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.firstname > b.firstname ? -1 : 1;
                }
            });
            break;
        case "middlename":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.middlename > b.middlename ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.middlename > b.middlename ? -1 : 1;
                }
            });
            break;
        case "lastname":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.lastname > b.lastname ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.lastname > b.lastname ? -1 : 1;
                }
            });
            break;
        case "nickname":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.nickname > b.nickname ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.nickname > b.nickname ? -1 : 1;
                }
            });
            break;
        case "housesort":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.house > b.house ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.house > b.house ? -1 : 1;
                }
            });
            break;
        case "inquis":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.inquis > b.inquis ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.inquis > b.inquis ? -1 : 1;
                }
            });
            break;
        case "prefect":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.prefect > b.prefect ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.prefect > b.prefect ? -1 : 1;
                }
            });
            break;
        case "gender":
            allStudentVariables.sortedStudents = allStudentVariables.filteredStudents.sort((a, b) => {
                if (sortDirection === "asc") {
                    // Ascending
                    return a.prefect > b.prefect ? 1 : -1;
                } else {
                    // Implicit descending
                    return a.prefect > b.prefect ? -1 : 1;
                }
            });
            break;

        default:
            console.error("Unsupported Sorter", sort);
    }
    return allStudentVariables.sortedStudents;
}

// Filter students
// function filterStudents()
// 	house | responsibilities | expelled | nonExpelled

function clickFilterButton(filterButton) {
    console.log("filterClicked");

    let filter
    filter = filterButton.target.dataset.filter;

    const filteredStudents = filterStudents(filter);
    console.log(filteredStudents);
    displayList(filteredStudents);
}

function filterStudents(filter) {
    console.log("Filtering My Students");


    let filtered = allStudentVariables.filteredStudents
    let allStudents = allStudentVariables.allStudents

    filtered = [];

    if (filter === 'prefect') {
        filtered = allStudents.filter(isPrefect)
    } else if (filter === "inquis") {
        filtered = allStudents.filter(isInquis)
    } else if (filter === "slytherin") {
        filtered = allStudents.filter(isSlytherin)
    } else if (filter === "ravenclaw") {
        filtered = allStudents.filter(isRavenclaw)
    } else if (filter === "hufflepuff") {
        filtered = allStudents.filter(isHufflepuff)
    } else if (filter === "gryffindor") {
        filtered = allStudents.filter(isGryffindor)
    } else {
        filtered = allStudents.filter(isAll)
    }

    return filtered
}

// Students afilliation functions
// function checkStudentAfilliation(student) {
//     if (student.house === "Slytherin") return true
//     if (student.house === "Hufflepuff") return true
//     if (student.house === "Gryffindor") return true
//     if (student.house === "Ravenclaw") return true
//     if (student.prefect) return true
//     if (student.inquis) return true
//     else if (student) return true
// }

function isSlytherin(student) {
    if (student.house === "Slytherin") return true
}

function isHufflepuff(student) {
    if (student.house === "Hufflepuff") return true
}

function isGryffindor(student) {
    if (student.house === "Gryffindor") return true
}

function isRavenclaw(student) {
    if (student.house === "Ravenclaw") return true
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