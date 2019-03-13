var express           = require("express"),
    app               = express();

var indexRoutes       = require("./routes/index");

    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/", indexRoutes);

// const PORT = process.env.PORT;
// const IP = process.env.IP;

const PORT =  5000;
const IP = '192.168.1.190';

app.listen(PORT, IP, function(){
    console.log("Server Started!", IP+":"+PORT);
 });