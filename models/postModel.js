const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title:{
			type:String,
			required:[true, "Please enter a title!"],
		},
		question: {
			type: String,
			required: [true, "Please enter a question!"],
		},
		answer: {
			type:String
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		}
	},
	{ timestamps: true }
);

const Post = mongoose.model('post',postSchema)

module.exports = Post