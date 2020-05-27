const fs = require('fs')
const express = require('express')

const port = process.env.PORT || 3000

const app = express()
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    let imageUrl = loadData()
    res.render('index', {
        imageUrl
    })
})

app.post('/upload',(req,res)=>{  
    const file = JSON.parse(req.body.image)
    saveData(file)
    res.redirect(`/`)
})

function saveData(Jsonfile) {
    const fileData = Jsonfile.data
    const type = Jsonfile.type
    const file = `data:${type};base64,${fileData}`
    let fileDataFileSystem = loadData()
    const SaveData = { URL: file }
    fileDataFileSystem.push(SaveData)
    const Jsondata = JSON.stringify(fileDataFileSystem)
    fs.writeFileSync('data/uploadImage.json',Jsondata)    
}
function loadData() {
    try {
        const databuffer = fs.readFileSync('data/uploadImage.json')
        const dataJson = JSON.parse(databuffer)
        return dataJson
    } catch (e) {
        return []
    }
}
 


app.listen(port,()=>{
    console.log(`App is running on : http://localhost:${port}`)
})