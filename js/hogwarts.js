"use strict"

// Import students
import * as list from './studentlist.js'
// import popUp
import * as popup from './popup.js'

let allConstants = {
    filterButtons: document.querySelectorAll(`[data-action="filter"]`),
    popButtons: document.querySelectorAll(`[data-action="pop"]`),
    makeButtons: document.querySelectorAll(`[data-action="make"]`),
    sortButtons: document.querySelectorAll(`[data-action="sort"]`),
    dialogBox: document.querySelector(`#onlytwoprefects`)
}

addEventListener("DOMContentLoaded", init())

function init() {

    list.loadJSON()
    listenForBTNclick()

}

function listenForBTNclick() {
    console.log("button listen")

    // Add event-listeners to filter, pop and sort buttons
    allConstants.sortButtons.forEach((sortButton) => {
        sortButton.addEventListener("click", clickSortButton)
    });

    allConstants.filterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", clickFilterButton)
    });

    allConstants.popButtons.forEach((popButton) => {
        popButton.addEventListener("click", clickPopButton)
    });

    allConstants.makeButtons.forEach((makeButton) => {
        makeButton.addEventListener("click", clickMakeButton)
    });

}

function clickSortButton(sortButton) {
    console.log("Sorting Clicked")

    const sort = sortButton.target.dataset.sort
    const sortDirection = sortButton.target.dataset.sortDirection

    sortButton.target.dataset.sortDirection = sortDirection === "asc" ? "desc" : "asc"

    list.selectSort(sort, sortDirection)
}

function clickFilterButton(filterButton) {
    console.log("filter Clicked")

    const filter = filterButton.target.dataset.filter
    list.selectFilter(filter)
}

function clickPopButton(popButton) {
    console.log("pop out of array clicked")

    popup.popStudentFromArray(popButton.target.dataset.popaction)
}

function clickMakeButton(makeButton) {
    console.log("Make student button clicked")

    popup.makeStudentSomething(makeButton.target.dataset.makeaction)
}

function clickToggleButton(toggleButton, student) {
    console.log("toggle Clicked")

    const toggleThis = toggleButton.target.dataset.field
    list.selectToggle(toggleThis, student)
}


//Display List of students
export function displayList(students) {
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

    clone.querySelector("[data-field=prefect]").dataset.prefect = student.isPrefect
    clone.querySelector("[data-field=inquis]").dataset.inquis = student.isInquis
        // Is or isn't Prefect or Inquis
    clone.querySelector("[data-field=prefect]").addEventListener("click", (toggleButton) => clickToggleButton(toggleButton, student))
    clone.querySelector("[data-field=inquis]").addEventListener("click", (toggleButton) => clickToggleButton(toggleButton, student))

    // add the popup click here!
    clone.querySelector("[data-field=firstname]").addEventListener("click", () => popup.preparePopup(student))

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone)
}

export function inputPrefects() {

    const prefects = list.allStudentVariables.prefects
    document.querySelector("[data-field=studentprefect1]").textContent = prefects[0].firstname + " " + prefects[0].lastname
    document.querySelector("[data-field=studentprefect2]").textContent = prefects[1].firstname + " " + prefects[1].lastname

    dialogBoxActions()

}

function dialogBoxActions() {

    const removePrefect1 = document.querySelector("[data-action=removepre1]")

    const removePrefect2 = document.querySelector("[data-action=removepre2]")

    let prefect1 = list.allStudentVariables.prefects[0]
    let prefect2 = list.allStudentVariables.prefects[1]

    removePrefect1.addEventListener("click", () => {

        list.removeStudentAsPrefect(prefect1)
        hideDialogPrefects()
        list.buildList()
    })

    removePrefect2.addEventListener("click", () => {

        list.removeStudentAsPrefect(prefect2)
        hideDialogPrefects()
        list.buildList()
    })
}

export function showDialogPrefects() {
    allConstants.dialogBox.classList.add("show")
}

export function hideDialogPrefects() {
    allConstants.dialogBox.classList.remove("show")

}