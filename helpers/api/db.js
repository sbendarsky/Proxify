// Importing necessary modules
import getConfig from 'next/config';
import mongoose from 'mongoose';

// Getting server runtime configuration
const { serverRuntimeConfig } = getConfig();

// Defining the Schema object from mongoose
const Schema = mongoose.Schema;

// Connecting to the MongoDB database using the connection string from the environment variables or the server runtime configuration
mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);

// Setting mongoose's Promise to use Node's Promise
mongoose.Promise = global.Promise;

// Exporting the db object that contains the User model
export const db = {
    User: userModel()
};

// Function to define the User model
function userModel() {
    // Defining the schema for the User model
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // Adding createdAt and updatedAt timestamps to the schema
        timestamps: true
    });

    // Setting the toJSON method for the schema
    // This method defines how the data is transformed when it's converted to JSON
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            // Deleting the _id and hash properties from the returned object
            delete ret._id;
            delete ret.hash;
        }
    });

    // Returning the User model
    // If the User model is already defined, it returns that, otherwise it defines a new model
    return mongoose.models.User || mongoose.model('User', schema);
}