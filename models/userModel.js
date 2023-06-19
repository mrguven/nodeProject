const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter a username!"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email!"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password!"],
		minlength: [1, "Password length must be at least 6 character!"],
	},
});

// Hash password before save the user to DB
userSchema.pre("save", async function (next) {
	this.password = bcrypt.hashSync(this.password, 12);
	next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email: email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("User could not be found");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
