// Importing required modules
import getConfig from 'next/config';
import mongoose from 'mongoose';

// Getting server runtime configuration
const { serverRuntimeConfig } = getConfig();

// Creating mongoose schema instance
const Schema = mongoose.Schema;

// Connecting to MongoDB database using the provided connection string
mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);

// Setting mongoose promises to global promises
mongoose.Promise = global.Promise;

// Exporting database object
export const db = {
    User: userModel() // Creating User model
};

// Function to define the User model
function userModel() {
    // Defining schema for the User model
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // Adding createdAt and updatedAt timestamps
        timestamps: true
    });

    // Setting toJSON options to exclude _id and hash fields from the returned object
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    // Returning existing User model or creating a new one if not exists
    return mongoose.models.User || mongoose.model('User', schema);
}