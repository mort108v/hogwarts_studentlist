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

loadJSON

// async function loadJSON()
async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    const jsonData = await response.json()
    prepareObjects(jsonData)
}

// function prepareObjects(jsonData)
function prepareObjects(jsonData) {
    console.log("JSON Loaded")
    allStudentVariables.allStudents = jsonData.map(makeStudents)
    allStudentVariables.filteredStudents = allStudentVariables.allStudents
        // displayList(allStudents)
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

export { allStudentVariables, Student }


// Sort students
// function sortStudents(sort, sortDirection)
// 	firstName | lastName | house | prefects | inquisitorialSquad
// Filter students
// function filterStudents()
// 	house | responsibilities | expelled | nonExpelled
// About info
// function studentNumberInfo()
// 	numberOfStudentsInHouse | totalNumberOfStudents | numberOfStudentsExpelled | numberOfStudentsDisplayed