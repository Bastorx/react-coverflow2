var express = require("express");
var path = require("path");
var morgan = require("morgan");
var app = express();

app.use(morgan("combined"));
app.use("/assets", express.static(path.join(__dirname, "public")));

app.use("*", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 4000, function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Listening at http://localhost:${process.env.PORT || 4000}`);
});
