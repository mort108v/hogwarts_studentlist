"use strict"

// Import students
import * as studentlist from './studentlist.js'

studentlist.loadJSON()

// Display studentlist
// function displayList(students) {
//     // clear the list
//     document.querySelector("#list tbody").innerHTML = ""

//     // build a new list
//     students.forEach(displayStudent())
// }

// function displayStudent(student) {

//     // create clone
//     const clone = document.querySelector("template#student").content.cloneNode(true)

//     // set clone data
//     clone.querySelector("[data-field=firstname]").textContent = student.firstname
//     clone.querySelector("[data-field=middlename]").textContent = student.middlename
//     clone.querySelector("[data-field=lastname]").textContent = student.lastname
//     clone.querySelector("[data-field=nickname]").textContent = student.nickname
//     clone.querySelector("[data-field=gender]").textContent = student.gender
//     clone.querySelector("[data-field=bloodstatus]").textContent = student.bloodstatus
//     clone.querySelector("[data-field=house]").textContent = student.house
//     clone.querySelector(".student-photo").src = student.image

//     // append clone to list
//     document.querySelector("#list tbody").appendChild(clone)
// }

console.table(studentlist)