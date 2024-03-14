// const sortable = require("./sortable")

let player = document.getElementById("player-list")


new Sortable(player,{
    handle: '.handle',
    animation: 200
})