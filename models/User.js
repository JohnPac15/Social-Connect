const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.ObjectId,
                ref: "thoughts",

            }
        ],
        friends: [
            {
                type: Schema.ObjectId,
                ref: this.username
            },
        ]
        
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


UserSchema.virtual('frindCount').get(function(){
    return this.friends.length;
})

const user = model('User', UserSchema)

module.exports = user;