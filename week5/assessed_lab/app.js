const express = require("express");
const ejs = require("ejs");

const app = express();
const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}\nWebsite: http://localhost:${PORT_NUMBER}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/css"));

// Configure Express for EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

function generateRandomID(){
	return Math.floor(Math.random() * 100000);
} //TODO: this can generate an, ie, 3 digit number. Must be 5

rentals = [
	{ id: 46385, bookTitle: "Rangers Apprentice", renterName: "Ben", rentalDays: 5 },
	{ id: 46585, bookTitle: "Rangers BOOK", renterName: "Ben", rentalDays: 6 },
	{ id: 38474, bookTitle: "The Hobbit", renterName: "Alice", rentalDays: 3 },
]

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/ben/rentals/create", function (req, res) {
	res.render("add_rental", rentals);
});

app.post("/ben/rentals/create", function (req, res) {
	const {bookTitle, renterName, rentalDays} = req.body;
	rental = {
		id: generateRandomID(),
		bookTitle: bookTitle, 
		renterName: renterName,
		rentalDays: rentalDays,
	}
	rentals.push(rental);
	res.redirect("/ben/rentals");
});

app.get("/ben/rentals/return", function (req, res) {
	res.render("return_book", rentals);
});

app.post("/ben/rentals/return", function (req, res) {
	const id = parseInt(req.body.id);
	index = rentals.findIndex((rental) => rental.id === id); // be careful of types
	cost = 0;
	if (index !== -1){
		cost = rentals[index].rentalDays * 2.5;
		rentals.splice(index, 1) // remove rental
	}
	res.render("return_book_confirmation", {cost}); //why is this one wrapped in an object?
});

app.get("/ben/rentals/customer/:name", function (req, res) {
	//filter rentals based on this customer. 
	const name = req.params.name;
	filtered_rentals = rentals.filter((rental) => rental.renterName.toLowerCase() === name.toLowerCase());
	total_rental_days = 0;
	filtered_rentals.forEach((rental) => total_rental_days += Number(rental.rentalDays));
	// calculate total rental days
	//pass both of these into the render function
	res.render("customer", {filtered_rentals, total_rental_days});
});

app.get("/ben/rentals", function (req, res) {
	res.render("rentals", rentals);
});


// Works for all HTTP methods and avoids issues with the new route parser
app.use((req, res) => {
    res.status(404).render("404");
});