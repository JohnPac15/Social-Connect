const {Schema, model} = require('mongoose');

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
    // Create a virtual called friendCount 
    // that retrieves the length of the user's friends array field on query
    
    // return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
    return 'user scheme of virtual'

})

const User = model('User', UserSchema);

module.exports = User;