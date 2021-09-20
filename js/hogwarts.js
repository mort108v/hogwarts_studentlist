"use strict"

// Import students
import * as studentlist from './studentlist.js'

addEventListener("DOMContentLoaded", init())

function init() {

    studentlist.loadJSON()
    studentlist.listenForBTNclick()
}