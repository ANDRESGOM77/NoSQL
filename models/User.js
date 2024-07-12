const { Schema, model, Types } = require('mongoose'); 
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
      // using regular expression to validate email format
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { 
          validator: function(v) {
              return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
          }
      }
    },

    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
  ],
  },
  {
    toJSON: {
      virtuals: true, // enables virtual properties to be displayed when a user document is transformed into JSON format
    },
    id: false, // disables the default '_id' field in the User model to be returned when calling toJSON() method
}
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});
const user = model('user',userSchema)
module.exports = user