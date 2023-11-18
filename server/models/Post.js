import { Schema, model, Types } from 'mongoose';

const postSchema = new Schema({
	imageURL: {
		type: String,
		required: [true, 'ImageURL is required!'],
		match: [/^https?:\/\//, 'Image URL must start with http or https!']
	},
	description: {
		type: String,
		required: [true, 'Description is required!'],
		maxlength: [200, 'Description can\'t exceed 200 characters']
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required']
	},
	likes: [{
		type: Types.ObjectId,
		ref: 'User'
	}]
});

const Post = model('Post', postSchema);

export { Post };
