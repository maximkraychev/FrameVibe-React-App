import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
    postId: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: [true, 'Comment is required!'],
        maxlength: [200, 'Comment can\'t exceed 200 characters']
    }
});

const Comment = model('Comment', commentSchema);

export { Comment };