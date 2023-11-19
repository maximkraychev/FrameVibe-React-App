import joi from 'joi';

// Validate post on create
const validatePostSchema = joi.object({
	description: joi.string().trim().max(200),

	imageURL: joi.string().required().trim(),
});

// Validate user on registration
const validateRegisterSchema = joi.object({
	username: joi.string().required().trim().min(3).max(50),

	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(6).max(20),
});

// Validate user on login
const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email().lowercase(),

	password: joi.string().required().trim().min(6).max(20),
});

// Validate comment on creation
const validateCommentSchema = joi.object({
	comment: joi.string().trim().required().max(200)
});

export { validatePostSchema, validateRegisterSchema, validateLoginSchema, validateCommentSchema };
