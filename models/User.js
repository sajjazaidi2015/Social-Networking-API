const {Schema, model} = require('mongoose');
 

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        // thoughts: [ 
        //     {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Thought'
        //     }
        // ],
        // friends: [
        //     {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        //     }
        // ]
    }
)

const User = model('User', userSchema);

const handleError = (err) => console.error(err);

User.create(
    {
      username: 'sajjad',
      email: 'sajjad@gmail.com',
      
    },
    (err) => (err ? handleError(err) : console.log('Created new document'))
  );


module.exports = User;
