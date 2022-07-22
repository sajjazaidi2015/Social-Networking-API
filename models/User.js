const {Schema, model} = require('mongoose');
 

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            unique: true
        },
        thoughts: [ 
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)



// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);  
// const handleError = (err) => console.error(err);



// User.find({}).exec((err, collection) => {
//     if (err) {
//       return handleError(err);
//     }
//     if (collection.length === 0) {
//       return User.insertMany(
//         [
//           { 'username': 'sajjad','email': 'sajjad@gmail.com'},
//           { 'username': 'Hamza','email': 'Hamza@gmail.com' },
//         ],
//         (insertError) =>
//           insertError ? handleError(insertError) : console.log('Inserted')
//       );
//     }
//     return console.log('Already populated');
//   });


module.exports = User;
