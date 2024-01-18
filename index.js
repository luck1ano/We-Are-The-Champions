const endorsementsInputEl = document.getElementById("endorsements-input");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsListEl = document.getElementById("endorsements-list")
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://wearethechampions-2ed07-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements")

function clearendorsementsInputEl() {
    endorsementsInputEl.value = ""
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}

function appendItemToEndorsementsListEl(item) {
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    endorsementsListEl.append(newEl)
}

function removeItemFromEndorsementsListEl(item) {
    let itemID = item[0]
    let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`);
    remove(exactLocationOfItemInDB)
}



publishBtnEl.addEventListener("click", function() {
    let endorsementsValue = endorsementsInputEl.value;
    push(endorsementsInDB, endorsementsValue)
    clearendorsementsInputEl()
})  

onValue(endorsementsInDB, function(snapshot) {
        let endorsementsArray = Object.entries(snapshot.val())
        clearEndorsementsListEl()
        for(let i = endorsementsArray.length-1; i >= 0; i--) {
            let endorsement = endorsementsArray[i]
            if(i > 29) {
                removeItemFromEndorsementsListEl(endorsementsArray[0])
                clearEndorsementsListEl()
            }
            appendItemToEndorsementsListEl(endorsement)
        }
})

