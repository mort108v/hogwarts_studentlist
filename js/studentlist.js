"use strict"

import { displayList, showDialogPrefects, inputPrefects, cannotMakeInquisDialog } from "./hogwarts.js";

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
    expelledStudents: [],
    allStudents: [],
    prefects: [],
    inquisitorialSquad: [],
    halfbloods: [],
    purebloods: []
}

export const mortenStudent = {
    firstname: "Morten",
    middlename: "Bo",
    lastname: "Sixhoej",
    nickname: "Six",
    gender: "Boy",
    house: "Ungdomshuset",
    bloodstatus: "Vampire",
    isPrefect: true,
    isInquis: false,
    isExpelled: false,
    image: "/studentphotos/sixhoej_m.png"
}

let currentFilter = "*"
let currentSort = "firstname"
let currentSortDirection = "asc"

export const searchBar = document.querySelector('#searchbar')

// async function loadJSON()
export async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    const jsonData = await response.json()
    const response2 = await fetch("https://petlatkea.dk/2021/hogwarts/families.json")
    const jsonBlood = await response2.json()

    studentBloodstatus(jsonBlood)
    prepareObjects(jsonData)
}

// function prepareObjects(jsonData)
function prepareObjects(jsonData) {
    console.log("JSON Loaded")

    allStudentVariables.allStudents = jsonData.map(makeStudents)

    buildList()
}

export function searchForStudent() {
    console.log("search init")

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase()

        const filteredSearch = allStudentVariables.allStudents.filter((student) => {
                return (
                    student.firstname.toLowerCase().includes(searchString) ||
                    student.lastname.toLowerCase().includes(searchString)
                )
            })
            // FIX CURRENT FILTER ISSUE HERE!
        displayList(filteredSearch)
    })
}

function studentBloodstatus(jsonBlood) {
    allStudentVariables.halfbloods = jsonBlood.half
    allStudentVariables.purebloods = jsonBlood.pure
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
}

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

    // Student Bloodstatus
    let halfs = allStudentVariables.halfbloods
    if (halfs.includes(student.lastname)) {
        student.bloodstatus = "Half"
    } else {
        student.bloodstatus = "Pure"
    }

    return student
}

// Sort students
// 	firstName | lastName | house | prefects | inquisitorialSquad

export function selectSort(sort, direction) {
    currentSort = sort
    currentSortDirection = direction

    buildList()
}

function sortStudents(listOfStudents) {

    const sort = currentSort
    const sortDirection = currentSortDirection

    listOfStudents.sort((a, b) => {
        if (sortDirection === "asc") {
            // Ascending
            return a[sort] > b[sort] ? 1 : -1
        } else {
            // Implicit descending
            return a[sort] > b[sort] ? -1 : 1
        }
    });
    return listOfStudents;
}

// Filter students
// 	house | responsibilities | expelled | nonExpelled

export function selectFilter(filter) {
    currentFilter = filter
    buildList()
}

export function selectToggle(toggleButton, student) {
    if (toggleButton === "prefect") {
        console.log("prefect clicked for", student)
        togglePrefect(student)
    }
    if (toggleButton === "inquis") {
        console.log("inquis clicked for", student)
        toggleInquis(student)
    }

    buildList()
}

function togglePrefect(student) {
    console.log(allStudentVariables.prefects)

    let prefectCount = allStudentVariables.prefects.length

    if (student.isPrefect) {
        removeStudentAsPrefect(student)
    } else if (prefectCount < 2) {
        makeStudentPrefect(student)
    } else if (prefectCount >= 2) {
        console.log("There are already 2 prefects")

        showDialogPrefects()
        inputPrefects()
    }
    console.log(allStudentVariables.prefects)

}

function toggleInquis(student) {
    if (student.isInquis) {
        removeStudentAsInquis(student)
    } else {
        makeStudentInquis(student)
    }
}

export function buildList() {

    const filteredStudents = filterStudents(currentFilter)
    const sortedStudents = sortStudents(filteredStudents)

    displayList(sortedStudents)
}

function filterStudents(filter) {
    let allStudents = allStudentVariables.allStudents

    let filtered = []
    if (filter === "prefect") {
        filtered = allStudents.filter(isPrefect)
    } else if (filter === "inquis") {
        filtered = allStudents.filter(isInquis)
    } else if (filter === "pureblood") {
        filtered = allStudents.filter(isPure)
    } else if (filter === "muggle") {
        filtered = allStudents.filter(isMuggle)
    } else if (filter === "expelled") {
        filtered = allStudentVariables.expelledStudents
    } else {
        filtered = allStudents.filter(student => filter === "*" || filter === student.house.toLowerCase())
    }

    return filtered
}


function isPrefect(student) {
    if (student.isPrefect) return true
}

function isInquis(student) {
    if (student.isInquis) return true
}

function isPure(student) {
    if (student.bloodstatus === "Pure") return true
}

function isMuggle(student) {
    if (student.bloodstatus === "Half") return true
}

// function isExpelled(student) {
//     if (student.isExpelled) return true
// }

export function expellStudent(student) {

    student.isExpelled = true
    let allStudents = allStudentVariables.allStudents

    let studentToExpell = allStudents.indexOf(student)

    allStudents.splice(studentToExpell, 1)
    allStudentVariables.expelledStudents.push(student)

}

export function removeStudentAsPrefect(student) {

    student.isPrefect = false
    let allPrefects = allStudentVariables.prefects

    let studentInPrefectlist = allPrefects.indexOf(student)

    allPrefects.splice(studentInPrefectlist, 1)

}

export function removeStudentAsInquis(student) {

    student.isInquis = false
    let allInquis = allStudentVariables.inquisitorialSquad

    let studentInInquislist = allInquis.indexOf(student)

    allInquis.splice(studentInInquislist, 1)
}

export function makeStudentPrefect(student) {

    let prefectCount = allStudentVariables.prefects.length

    if (prefectCount >= 2) {
        console.log("There are already 2 prefects")

        showDialogPrefects()
        inputPrefects()

    } else {
        student.isPrefect = true
        let allPrefects = allStudentVariables.prefects
        allPrefects.push(student)
    }
}

export function makeStudentInquis(student) {

    if (student.house === "Slytherin" || student.bloodstatus === "Pure") {
        student.isInquis = true
        let allInquis = allStudentVariables.inquisitorialSquad
        allInquis.push(student)
    } else {
        cannotMakeInquisDialog(student)
    }
}

// About info
// function studentNumberInfo()
// 	numberOfStudentsInHouse | totalNumberOfStudents | numberOfStudentsExpelled | numberOfStudentsDisplayed