"use strict"

const popupBox = document.querySelector("#studentpop")
const popupClosebutton = document.querySelector(".closebuttonpop")

popupClosebutton.addEventListener("click", closePopUp)

function closePopUp() {
    document.querySelector("#studentpop").classList.remove("show")
}

export function preparePopup(student) {
    document.querySelector("#poppoppop tbody").innerHTML = ""
    popupBox.classList.add("show")
    displayPopUp(student)
}

function displayPopUp(student) {

    // create clone
    const popClone = document.querySelector("template#studentmodal").content.cloneNode(true)
    popClone.querySelector(".student-photo").src = student.image
    popClone.querySelector("[data-field=firstname]").textContent = student.firstname
    popClone.querySelector("[data-field=house]").textContent = student.house
    popClone.querySelector("[data-field=gender]").textContent = student.gender
    popClone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect
    popClone.querySelector("[data-field=inquis]").dataset.inquis = student.inquis

    // append clone to list
    document.querySelector("#poppoppop tbody").appendChild(popClone)
}