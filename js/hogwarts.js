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
    dialogBox: document.querySelector(`#onlytwoprefects`),
    dialogBoxInq: document.querySelector(`#cannotbeinquis`),
    dialogBoxExp: document.querySelector(`#cannotbeexpelled`),
    hackFigure: document.querySelector("#hack")
}

const charOneSound = document.getElementById("typekey1")
const charTwoSound = document.getElementById("typekey2")
const spaceSound = document.getElementById("typespace")
const lastKeySound = document.getElementById("typelast")
const returnSound = document.getElementById("typereturn")

let typed
let nthletter = 0
let typingSpeed = 150
let textToType = document.querySelector(".typewritten")
let textToReplace = document.querySelector(".backtoschool")

export let isHacked = false

addEventListener("DOMContentLoaded", init())

function init() {

    list.loadJSON()
    listenForBTNclick()
    prepareAboutInfo()

    list.searchBar.addEventListener("click", list.searchForStudent)
    allConstants.hackFigure.addEventListener("dblclick", isCTRLkeyPressed)
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

export function cannotMakeInquisDialog(student) {
    allConstants.dialogBoxInq.classList.add("show")
    const closeButtonInquis = document.querySelector(".closebutton-inq")
    closeButtonInquis.addEventListener("click", hideDialogInquis)

    document.querySelector("[data-field=thisstudent]").textContent = student.firstname + " " + student.lastname

}

function hideDialogInquis() {
    allConstants.dialogBoxInq.classList.remove("show")
}

function dialogBoxActions() {

    const closeButtonPrefect = document.querySelector(".closebutton-pre")
    closeButtonPrefect.addEventListener("click", hideDialogPrefects)

    const removePrefect1 = document.querySelector("[data-action=removepre1]")
    const removePrefect2 = document.querySelector("[data-action=removepre2]")

    let prefect1 = list.allStudentVariables.prefects[0]
    let prefect2 = list.allStudentVariables.prefects[1]

    removePrefect1.addEventListener("click", removeStudent1)

    function removeStudent1() {
        list.removeStudentAsPrefect(prefect1)
        hideDialogPrefects()
        list.buildList()
    }
    removePrefect2.addEventListener("click", removeStudent2)

    function removeStudent2() {
        list.removeStudentAsPrefect(prefect2)
        hideDialogPrefects()
        list.buildList()
    }

    function hideDialogPrefects() {
        allConstants.dialogBox.classList.remove("show")
        removePrefect1.removeEventListener("click", removeStudent1)
        removePrefect2.removeEventListener("click", removeStudent2)
    }
}

export function showDialogPrefects() {
    allConstants.dialogBox.classList.add("show")
}

function isCTRLkeyPressed() {

    // Listen for CTRL key event
    window.addEventListener('keydown', (e) => {
        if (17 == e.keyCode) {

            // Keep track of "If system is already hacked"
            if (isHacked) {
                alert("You can't hack the system again!")
            } else {
                hackTheSystem()
            }
        }
    })
}

export function hackTheSystem() {
    console.log("System has been hacked")

    // Keep track of "If system is already hacked"
    isHacked = true

    let hackAllStudents = list.allStudentVariables.allStudents

    // Inject self into studentlist
    hackAllStudents.push(list.mortenStudent)

    // Make halfbloods: Pure and Purebloods: random
    hackAllStudents.forEach(student => {
        student.bloodstatus === "Pure" ? "Half" : "Pure"
        student.isHackedAlredy = true
    })

    hackAllStudents.forEach(student => {
        if (hackAllStudents.isHackedAlredy) { return } else if (Math.random() * 2 > 1) {
            student.bloodstatus = "Pure"
            student.isHackedAlredy = true
        }

    })

    // Let user know system is hacked with typewriter header and random colorchanges
    randomBackgroundColorOdd()
        // Fetch txt from HTML
    typed = textToType.innerHTML;
    // Clear title text
    textToReplace.innerHTML = "";
    // Start Loop function
    typewriterLoop(typed);

    // Eject student from Inquisitoral Squad after some time and make it loud!

    list.buildList()
}

// function repeat(func, times) {
//     func()
//     times && --times && repeat(func, times)
// }

// cannot be expelled
export function youCantExpellMe(student) {
    console.log(student.firstname, "Can't be expelled")

    allConstants.dialogBoxExp.classList.add("show")
    const closeButtonExpelled = document.querySelector(".closebutton-exp")
    closeButtonExpelled.addEventListener("click", hideDialogExpelled)

    document.querySelector("[data-field=student-to-expell]").textContent = student.firstname + " " + student.lastname
}

function hideDialogExpelled() {
    allConstants.dialogBoxExp.classList.remove("show")
}

function typewriterLoop() {

    // title.classList.add("hide")
    // hackDiv.classList.add("show")

    console.log(typed)
    console.log("This letter is number (" + nthletter + ")")

    if (nthletter < typed.length) {
        console.log("The length of string is = " + typed.length)

        // - Set textContent to substring of 0 to N
        textToReplace.textContent += typed.charAt(nthletter)
            // Imcrement N (++) 
        nthletter++;
        console.log(nthletter)

        playSound(nthletter)

        // Wait before calling loop again
        setTimeout(typewriterLoop, typingSpeed)
    }
}

function playSound() {
    console.log("PlaySound")

    let spaceBar = typed.indexOf(' ')
    let lastLetter = typed.length
    console.log(lastLetter)

    if (nthletter === lastLetter) {
        lastKeySound.play()
        setTimeout(typingSpeed)
        returnSound.play()

    } else if (nthletter == spaceBar) {
        spaceSound.play()

    } else {
        let play = Math.random()
        if (play < .5) {
            charOneSound.play()
        } else {
            charTwoSound.play()
        }
    }
}

// RANDOM BACKGROUND COLORS
export function randomBackgroundColorOdd() {

    let r = Math.floor(Math.random() * 128)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 222)
    let bgColorOdd = `rgba(${r},${g},${b}, 1)`

    //
    const listPointerOdd = document.querySelectorAll('#list tbody tr:nth-child(odd) td')
    listPointerOdd.forEach((row) => {
        row.style.background = bgColorOdd

        setTimeout(randomBackgroundColorEven, 500)
    });
}

function randomBackgroundColorEven() {

    let r = Math.floor(Math.random() * 201)
    let g = Math.floor(Math.random() * 188)
    let b = Math.floor(Math.random() * 133)
    let bgColorEven = `rgba(${r},${g},${b}, 1)`

    //
    const listPointerOdd = document.querySelectorAll('#list tbody tr:nth-child(even) td')
    listPointerOdd.forEach((row) => {
        row.style.background = bgColorEven

        // setTimeout(randomBackgroundColorOdd, 5000, 3)
    });
}

export function prepareAboutInfo() {
    document.querySelector("#aboutinfolist tbody").innerHTML = ""

    let numberdata = {
        hufflepuffnumber: " ",
        slytherinnumber: " ",
        gryffindornumber: " ",
        ravenclawnumber: " ",
        allstudentsnumber: " ",
        prefectsnumber: " ",
        inquisnumber: " ",
        expellednumber: " ",
        empty: " *----------------* "
    }

    // let studentsHouse = list.allStudentVariables.allStudents
    let studentsPrefects = list.allStudentVariables.prefects
    let studentsInquis = list.allStudentVariables.inquisitorialSquad
    let studentsAll = list.allStudentVariables.allStudents
    let studentsExpelled = list.allStudentVariables.expelledStudents

    numberdata.hufflepuffnumber = list.allStudentVariables.allStudents.filter(s => s.house === "HufflePuff").length
    numberdata.slytherinnumber = list.allStudentVariables.allStudents.filter(s => s.house === "Slytherin").length
    numberdata.gryffindornumber = list.allStudentVariables.allStudents.filter(s => s.house === "Gryffindor").length
    numberdata.ravenclawnumber = list.allStudentVariables.allStudents.filter(s => s.house === "Ravenclaw").length

    // let hufflepuffs = studentsHouse.filter("Hufflepuf")
    // let slytherins = studentsHouse.filter("Hufflepuf")
    // let griffindors = studentsHouse.filter("Hufflepuf")
    // let ravenclaws = studentsHouse.filter("Hufflepuf")

    // numberdata.hufflepuffnumber = hufflepuffs.length
    // numberdata.slytherinnumber = slytherins.length
    // numberdata.griffindornumber = griffindors.length
    // numberdata.ravenclawnumber = ravenclaws.length

    numberdata.allstudentsnumber = studentsAll.length
    numberdata.prefectsnumber = studentsPrefects.length
    numberdata.inquisnumber = studentsInquis.length
    numberdata.expellednumber = studentsExpelled.length

    displayAboutInfo(numberdata)
}

function displayAboutInfo(numberdata) {
    // create clone
    const numberClone = document.querySelector("template#aboutinfo").content.cloneNode(true)

    numberClone.querySelector("[data-field=hufflepuffnumber]").textContent = "Hufflepuff: " + numberdata.hufflepuffnumber
    numberClone.querySelector("[data-field=slytherinnumber]").textContent = "Slytherin: " + numberdata.slytherinnumber
    numberClone.querySelector("[data-field=gryffindornumber]").textContent = "Gryffindor: " + numberdata.gryffindornumber
    numberClone.querySelector("[data-field=ravenclawnumber]").textContent = "Ravenclaw: " + numberdata.ravenclawnumber
    numberClone.querySelector("[data-field=allstudentsnumber]").textContent = "All Students: " + numberdata.allstudentsnumber
    numberClone.querySelector("[data-field=prefectsnumber]").textContent = "Prefects: " + numberdata.prefectsnumber
    numberClone.querySelector("[data-field=inquisnumber]").textContent = "Inquisitorial: " + numberdata.inquisnumber
    numberClone.querySelector("[data-field=expellednumber]").textContent = "Expelled: " + numberdata.expellednumber
    numberClone.querySelector("[data-field=empty]").textContent = numberdata.empty

    // append clone to list
    document.querySelector("#aboutinfolist tbody").appendChild(numberClone)
}