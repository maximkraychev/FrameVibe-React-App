import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	imageURL: {
		type: String,
		required: [true, 'ImageURL is required!'],
		match: [/^https?:\/\//, 'Image URL must start with http or https!']
	},
	imageId: {
		type: String,
		required: [true, 'ImageId is required!']
	},
	description: {
		type: String,
		required: [true, 'Description is required!'],
		maxlength: [200, 'Description can\'t exceed 200 characters']
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required']
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

const Post = model('Post', postSchema);

export { Post };
