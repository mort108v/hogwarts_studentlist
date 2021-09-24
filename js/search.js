"use strict"

import { buildList } from "./studentlist"

const searchBar = document.getElementById('searchBar')

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

    const filteredSearch = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchString)
        )
    })
    buildList(filteredSearch)
})