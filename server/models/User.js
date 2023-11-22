import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required!'],
        unique: [true, 'Username is already taken'],
        minlength: [3, 'Username must be at least three characters long'],
        maxlength: [20, 'Username can\'t exceed twenty characters']
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
        unique: [true, 'Email is already taken'],
        validate: {
            validator: (x) => /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(x),
            message: '{VALUE} is not a valid email address.'
        }
	},
	password: {
		type: String,
		required: [true, 'Password is required!']
	},
    avatar: {
        type: String
    },
    description: {
        type: String,
        maxlength: [300, 'Description can\'t exceed 300 characters']
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

export { User };