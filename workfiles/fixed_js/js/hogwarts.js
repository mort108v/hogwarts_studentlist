"use strict"

// Import students
import * as list from './studentlist.js'
// import popUp
import * as popup from './popup.js'

const allConstants = {
    filterButtons: document.querySelectorAll(`[data-action="filter"]`),
    sortButtons: document.querySelectorAll(`[data-action="sort"]`),
    studentTemplates: document.querySelectorAll(`[data-field=firstname]`),
}

addEventListener("DOMContentLoaded", init())

function init() {
    list.loadJSON()
    listenForBTNclick()
    listenForPopUpClicks()
}

function listenForBTNclick() {
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

    list.selectSort(sort, sortDirection);
}

function clickFilterButton(filterButton) {
    console.log("filterClicked");

    const filter = filterButton.target.dataset.filter;
    list.selectFilter(filter);
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

// add the popup click here!
clone.querySelector("[data-field=firstname]").addEventListener("click", () => popup.preparePopup(student) )


        // append clone to list
    document.querySelector("#list tbody").appendChild(clone)

}

// No need for this one
function listenForPopUpClicks() {
/*
    let student = studentlist.allStudentVariables.student
    let studentTemps = studentlist.allConstants.studentTemplates

    studentTemps.forEach((studentTemp) => {
        studentTemp.addEventListener("click", popupVariables.preparePopup(student))
        console.log("Student clicked for popup")
    })
    */
    
    
    

}