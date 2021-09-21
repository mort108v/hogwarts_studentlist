"use strict"

// Import students
import * as studentlist from './studentlist.js'
// import popUp
import * as popupVariables from './popup.js'

addEventListener("DOMContentLoaded", init())

function init() {

    studentlist.loadJSON()
    studentlist.listenForBTNclick()

    popUpClicks()
}

function popUpClicks() {

    let student = studentlist.allStudentVariables.student
    let studentTemps = studentlist.allConstants.studentTemplates

    studentTemps.forEach((studentTemp) => {
        studentTemp.addEventListener("click", popupVariables.preparePopup(student))
        console.log("Student clicked for popup")
    })
}