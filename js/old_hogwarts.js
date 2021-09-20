"use strict";

// https://petlatkea.dk/2021/hogwarts/families.json

// https://petlat kea.dk/2021/hogwarts/students.json

let typedText = document.querySelector(".typewritten");
let typed;

let nthletter = 0;
let typingSpeed = 300;

const charOneSound = document.getElementById("typekey1");
const charTwoSound = document.getElementById("typekey2");
const spaceSound = document.getElementById("typespace");
const lastKeySound = document.getElementById("typelast");
const returnSound = document.getElementById("typereturn");

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let filter;
let filteredStudents = [];
let sortedStudents = [];
let prefects = [];

const filterButtons = document.querySelectorAll(`[data-action="filter"]`);
const sortButtons = document.querySelectorAll(`[data-action="sort"]`);
const studentTemplates = document.querySelectorAll(`[data-field=firstname]`);
const popupBox = document.querySelector("#studentpop");
const popupClosebutton = document.querySelector(".closebuttonpop");
const schoolName = document.querySelector("#schoolname");
const typewritten = document.querySelector(".hacked");

schoolName.addEventListener("click", hackTheSystem);
popupClosebutton.addEventListener("click", closePopUp);

function start() {
    console.log("ready");

    // Add event-listeners to filter and sort buttons
    filterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", clickFilterButton);
    });

    sortButtons.forEach((sortButton) => {
        sortButton.addEventListener("click", clickSortButton);
    });

    // studentTemplates.forEach((studentTemplate) => {
    //     studentTemplate.addEventListener("click", displayPopUp);
    //     console.log("Student clicked for popup");
    // });

    loadJSON();
}

function closePopUp() {

    document.querySelector("#studentpop").classList.remove("show");

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

function sortStudents(sort, sortDirection) {
    console.log("Sorting the student list", sort, filteredStudents);

    switch (sort) {
        case "firstname":
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
            sortedStudents = filteredStudents.sort((a, b) => {
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
    return sortedStudents;
}

function clickFilterButton(filterButton) {
    console.log("filterClicked");

    filter = filterButton.target.dataset.filter;

    const filteredStudents = filterStudents();
    console.log(filteredStudents);
    displayList(filteredStudents);
}

function filterStudents() {
    console.log("Filtering My Students");

    filteredStudents = [];

    if (filter === "prefect") {
        filteredStudents = allStudents.filter(isPrefect);
    } else if (filter === "inquis") {
        filteredStudents = allStudents.filter(isInquis);
    } else if (filter === "pure") {
        filteredStudents = allStudents.filter(isPure);
    } else if (filter === "muggle") {
        filteredStudents = allStudents.filter(isMuggle);
    } else if (filter === "slytherin") {
        filteredStudents = allStudents.filter(isSlytherin);
    } else if (filter === "ravenclaw") {
        filteredStudents = allStudents.filter(isRavenclaw);
    } else if (filter === "hufflepuff") {
        filteredStudents = allStudents.filter(isHufflepuff);
    } else if (filter === "gryffindor") {
        filteredStudents = allStudents.filter(isGryffindor);
    } else {
        filteredStudents = allStudents.filter(isAll);
    }
    console.log(filteredStudents, "filter")
    return filteredStudents;
}

async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json");
    const jsonData = await response.json();
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    allStudents = jsonData.map(makeStudents);
    filteredStudents = allStudents;
    displayList(allStudents);
}

function makeStudents(jsonObject) {
    console.log("Student in the making");

    // TODO: Create new object with cleaned data - and store that in the allStudents array
    const Student = {
        firstname: " ",
        middlename: " ",
        lastname: " ",
        nickname: " ",
        gender: " ",
        house: " ",
        pure: "",
        muggle: "",
        prefect: "",
        inquis: "",
    }

    const student = Object.create(Student);
    // Student Full Name 
    const studentFullName = jsonObject.fullname.substring(0).toLowerCase().trim();
    const studentFullNameSplit = studentFullName.split(" ");

    // Student First Name
    const studentFirstname = studentFullNameSplit[0];
    student.firstname = studentFirstname.charAt(0).toUpperCase() + studentFirstname.substring(1);

    // Student Middle Name
    if (studentFullNameSplit.length > 2) {
        const studentMiddlename = studentFullNameSplit[1];
        student.middlename = studentMiddlename.charAt(0).toUpperCase() + studentMiddlename.substring(1);
    }

    if (studentFullNameSplit.length > 2) {
        // Student Last Name
        const studentLastname = studentFullNameSplit[2];
        student.lastname = studentLastname.charAt(0).toUpperCase() + studentLastname.substring(1);
    } else if (studentFullNameSplit.length == 2) {
        const studentLastnameTwo = studentFullNameSplit[1];
        student.lastname = studentLastnameTwo.charAt(0).toUpperCase() + studentLastnameTwo.substring(1);
    }

    // Student Nickname
    if (studentFullName.includes(`"`)) {
        student.middlename = "";
        const studentNickname = studentFullNameSplit[1];
        student.nickname = `"` + studentNickname.charAt(1).toUpperCase() + studentNickname.substring(2);
    }

    // Student Gender
    const studentGender = jsonObject.gender.substring().toLowerCase().trim();
    student.gender = studentGender.charAt(0).toUpperCase() + studentGender.substring(1);

    // Student House
    const studentHouse = jsonObject.house.substring().toLowerCase().trim();
    student.house = studentHouse.charAt(0).toUpperCase() + studentHouse.substring(1);

    // Student Image
    const studentImageURL = "studentphotos/";
    student.image = studentImageURL + student.lastname.toLowerCase() + "_" + student.firstname.charAt(0).toLowerCase() + ".png";

    student.inquis = false;
    student.prefect = false;
    student.muggle = false;
    student.pure = false;

    return student;
}


function displayList(students) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    students.forEach(displayStudent);

}

function preparePopup(student) {
    document.querySelector("#poppoppop tbody").innerHTML = "";
    document.querySelector("#studentpop").classList.add("show");
    displayPopUp(student);

}

function displayPopUp(student) {
    console.log("Displaying popup", student);


    // create clone
    const popClone = document.querySelector("template#studentmodal").content.cloneNode(true);
    popClone.querySelector("[data-field=image]").src = student.image;
    popClone.querySelector("[data-field=firstname]").textContent = student.firstname;
    popClone.querySelector("[data-field=house]").textContent = student.house;
    popClone.querySelector("[data-field=gender]").textContent = student.gender;
    popClone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
    popClone.querySelector("[data-field=inquis]").dataset.inquis = student.inquis;

    popupBox.addEventListener
}

function displayStudent(student) {

    // create clone
    const clone = document.querySelector("template#student").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=firstname]").textContent = student.firstname;
    clone.querySelector("[data-field=middlename]").textContent = student.middlename;
    clone.querySelector("[data-field=lastname]").textContent = student.lastname;
    clone.querySelector("[data-field=nickname]").textContent = student.nickname;
    clone.querySelector("[data-field=gender]").textContent = student.gender;
    clone.querySelector("[data-field=pure]").textContent = student.pure;
    clone.querySelector("[data-field=muggle]").textContent = student.muggle;
    clone.querySelector("[data-field=house]").textContent = student.house;
    clone.querySelector(".student-photo").src = student.image;
    clone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
    clone.querySelector("[data-field=inquis]").dataset.inquis = student.inquis;
    clone.querySelector("[data-field=pure]").dataset.pure = student.pure;
    clone.querySelector("[data-field=muggle]").dataset.muggle = student.muggle;

    clone.querySelector("[data-field=prefect]").addEventListener("click", clickSPrefect);
    clone.querySelector("[data-field=inquis]").addEventListener("click", clickInquis);
    clone.querySelector(`[data-field=firstname]`).addEventListener("click", () => preparePopup(student));


    function clickSPrefect(student) {
        console.log("clickSPrefect Clicked");


        if (countPrefects(student) >= 2) {
            console.log("There are already 2 prefects");

            const closeButtonPrefect = document.querySelector(".closebutton-pre");
            closeButtonPrefect.addEventListener("click", hideDialogPrefects);

            showDialogPrefects();
            inputPrefects();

            const removePrefect1 = document.querySelector("[data-action=removepre1]");
            const removePrefect2 = document.querySelector("[data-action=removepre2]");
            removePrefect1.addEventListener("click", popPrefect1);
            removePrefect2.addEventListener("click", popPrefect2);
        } else togglePrefect(student);
    }

    function popPrefect1() {
        console.log("popPrefect1");

        prefects.push(student);
        togglePrefect(student);
        prefects.shift();

        hideDialogPrefects();
        displayList(filteredStudents);

    }

    function popPrefect2(student) {
        console.log("popPrefect2");
        const popStudent2 = prefects[1];
        togglePrefect(popStudent2);
        togglePrefect(student);
        // prefects.push(student);
        hideDialogPrefects();
        // displayList(filteredStudents);




        // If same gender
        // }
        // else if (checkForSamePrefectGender(student) === true) {
        //     // open dialog
        //     document.querySelector(".closebutton-gen").addEventListener("click", hideDialogGender);


        //     showDialogGender();



    }


    // function checkForSamePrefectGender() {
    //     console.log("Checking gender", student);

    //     const thisStudentGender = `"` + student.gender + `"`;
    //     console.log("Student gender is ", thisStudentGender);

    //     PrefectGender1 = prefects.gender[0].indexOf;
    //     PrefectGender2 = prefects.gender[1];
    //     console.log(PrefectGender1, PrefectGender2);

    //     if (thisStudentGender === prefects[0].gender) {
    //         console.log("Student gender from array matches ", thisStudentGender);
    //         return true;
    //     } else return false;
    // }

    function inputPrefects() {
        document.querySelector("[data-field=studentprefect1]").textContent = prefects[0].firstname + " " + prefects[0].lastname;
        document.querySelector("[data-field=studentprefect2]").textContent = prefects[1].firstname + " " + prefects[1].lastname;
    }

    // function showDialogGender() {
    //     const showDialogGender = document.querySelector("#onlyonekind");
    //     showDialogGender.classList.add("show");
    // }

    // function hideDialogGender() {
    //     const hideDialogGender = document.querySelector("#onlyonekind");
    //     hideDialogGender.classList.remove("show");
    // }

    function showDialogPrefects() {
        const showDialogPrefect = document.querySelector("#onlytwoprefects");
        showDialogPrefect.classList.add("show");
    }

    function hideDialogPrefects() {
        const hideDialogPrefect = document.querySelector("#onlytwoprefects");
        hideDialogPrefect.classList.remove("show");
    }

    function countPrefects() {
        console.log("Counting number of prefects");
        prefects = allStudents.filter(student => student.prefect === true);

        const numberOfPrefects = prefects.length;
        console.log("getNumberOfPrefects", numberOfPrefects);
        return numberOfPrefects;
    }

    function clickInquis() {
        console.log("clickInquis Clicked");

        // If not pure function

        // Else
        toggleInquis(student);
    }

    function togglePrefect() {
        console.log("togglePrefect", student);
        if (student.prefect === true) {
            student.prefect = false;
            // prefects.shift(student);
        } else {
            student.prefect = true;
            // prefects.shift(student);
        }

        displayList(filteredStudents);
    }

    function toggleInquis(student) {
        console.log("toggleInquis");
        if (student.inquis === true) {
            student.inquis = false;
        } else {
            student.inquis = true;
        }
        displayList(filteredStudents);
    }

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}

function isSlytherin(student) {
    console.log("isSlytherin");
    if (student.house === "Slytherin") {
        return true;
    } else {
        return false;
    }
}

function isHufflepuff(student) {
    console.log("isHufflepuff");
    if (student.house === "Hufflepuff") {
        return true;
    } else {
        return false;
    }
}

function isGryffindor(student) {
    console.log("isGryffindor");
    if (student.house === "Gryffindor") {
        return true;
    } else {
        return false;
    }
}

function isRavenclaw(student) {
    console.log("isRavenclaw");
    if (student.house === "Ravenclaw") {
        return true;
    } else {
        return false;
    }
}

function isPrefect(student) {
    console.log("isPrefect");
    console.log(student);
    if (student.prefect) {
        return true;
    } else {
        return false;
    }
}

function isInquis(student) {
    console.log("isInquis");
    if (student.inquis) {
        return true;
    } else {
        return false;
    }
}

function isPure(student) {
    console.log("isPure");
    if (student.pure) {
        return true;
    } else {
        return false;
    }
}

function isMuggle(student) {
    console.log("isMuggle");
    if (student.muggle) {
        return true;
    } else {
        return false;
    }
}

function isAll(student) {
    console.log("isAll");
    if (student) {
        return true;
    } else {
        return false;
    }
}

// RANDOM BACKGROUND COLORS
function random_bg_color() {
    console.log(bgColor);

    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 64);
    var bgColor = `rgba(${r},${g},${b}, 0.65)`;

    //
    const listPointer = document.querySelectorAll('#list tbody tr:nth-child(odd) td');
    listPointer.forEach((row) => {
        row.style.background = bgColor;

        setTimeout(random_bg_color, 300);
    });
    //
}

function hackTheSystem() {
    console.log("You've been Hacked");

    // implement colorchange// input self in list// force non removal// disable inquis// change school name to typewriter new name// Make secret button// do timer on stuff
    schoolName.classList.add("none");
    typewritten.classList.remove("none");
    hackstart;
    random_bg_color()
}

function hackstart() {
    console.log("init");

    // Festch txt from HTML
    typed = typedText.innerHTML;
    // Clear fetched text
    typedText.innerHTML = "";
    //Start Loop function
    typewriterLoop(typed);
}

function typewriterLoop() {
    console.log(typed);
    console.log("This letter is number (" + nthletter + ")");

    if (nthletter < typed.length) {
        console.log("The length of string is = " + typed.length);

        // - Set textContent to substring of 0 to N
        typedText.textContent += typed.charAt(nthletter);
        // Imcrement N (++) 
        nthletter++;
        console.log(nthletter);

        playSound(nthletter);

        // Wait before calling loop again
        setTimeout(typewriterLoop, typingSpeed);
    }
}


function playSound() {
    console.log("PlaySound");

    let spaceBar = typed.indexOf(' ');
    let lastLetter = typed.length;
    console.log(lastLetter);

    if (nthletter === lastLetter) {
        lastKeySound.play();
        setTimeout(typingSpeed);
        returnSound.play();

    } else if (nthletter == spaceBar) {
        spaceSound.play();

    } else {
        let play = Math.random();
        if (play < .5) {
            charOneSound.play();
        } else {
            charTwoSound.play();
        }
    }
}