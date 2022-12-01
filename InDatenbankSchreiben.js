function AnimeHinzufuegen() {

    var Romaji = document.getElementById("Romaji").value
    var Englisch = document.getElementById("Englisch").value
    let Deutsch = document.getElementById("Deutsch").value
    let Beschreibung = document.getElementById("Beschreibung").value
    let FolgenAnzahl = document.getElementById("FolgenAnzahl").value
    let FolgenDauer = document.getElementById("FolgenDauer").value
    let Format = document.getElementById("Format").value
    let Season = document.getElementById("Season").value
    let StartDate = document.getElementById("StartDate").value
    let EndDate = document.getElementById("EndDate").value
    let Studio = document.getElementById("Studio").value
    let Source = document.getElementById("Source").value
    let Cover = document.getElementById("Cover").value
    let Diashow = document.getElementById("Diashow").value

    let checked = document.querySelectorAll("#Genre :checked")
    let selected = [...checked].map(option => option.value)

    EmptyAnime()

    document.getElementById("EndDate").value = StartDate
}


function EmptyAnime() {

    document.getElementById("Romaji").value=""
    document.getElementById("Englisch").value=""
    document.getElementById("Deutsch").value=""

    document.getElementById("Beschreibung").value=""
    document.getElementById("FolgenAnzahl").value=""
    document.getElementById("FolgenDauer").value=""

    document.getElementById("Format").value="0"
    document.getElementById("Season").value="0"
    document.getElementById("StartDate").value="0"
    document.getElementById("EndDate").value="0"

    document.getElementById("Genre").value="0"
    document.getElementById("Studio").value="0"
    document.getElementById("Source").value="0"

    document.getElementById("Cover").value=""
    document.getElementById("Diashow").value=""
}