const fs = require("fs")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.get("/notes", (Request, Response) => {
    Response.sendFile(path.join(__dirname, "public/notes.html"))
})
app.get("/api/notes", (Request, Response) => {
    Response.sendFile(path.join(__dirname, "db/db.json"))

})
function saveDataBase(db) {
    fs.writeFileSync("db/db.json", JSON.stringify(db))

}
function loadDataBase() {
    const db = JSON.parse(fs.readFileSync("db/db.json"))
    return (db)
}
app.post("/api/notes", (Request, Response) => {
    const db = loadDataBase()
    const note = { ...Request.body, id: db.length }
    db.push(note)
    saveDataBase(db)
    Response.json(note)


})
app.delete("/api/notes/:id", (Request, Response) => {
    const db = loadDataBase().filter((note) => {
        return (note.id != Request.params.id)
    })
    saveDataBase(db)
    Response.status(200).end()

})













app.get("/*", (Request, Response) => {
    Response.sendFile(path.join(__dirname, "public/index.html"))
})









app.listen(3000, () => console.log("server started http://localhost:3000"))

