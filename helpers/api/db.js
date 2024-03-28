import getConfig from 'next/config';
import mongoose from 'mongoose';

// Retrieve server runtime configuration using Next.js's getConfig
const { serverRuntimeConfig } = getConfig();

// Define schema for MongoDB documents using Mongoose
const Schema = mongoose.Schema;

// Connect to MongoDB using the provided connection string or environment variable
mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);

// Use global Promise library for Mongoose promises
mongoose.Promise = global.Promise;

// Export an object containing MongoDB models
export const db = {
    User: userModel()
};

// Define mongoose models with schema definitions

/**
 * Define the Mongoose model for the 'User' collection.
 * @returns {object} - Mongoose model for the 'User' collection.
 */
function userModel() {
    // Define schema for the 'User' collection
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // Add createdAt and updatedAt timestamps
        timestamps: true
    });

    // Set options for JSON serialization
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            // Remove '_id' and 'hash' fields from JSON representation
            delete ret._id;
            delete ret.hash;
        }
    });

    // Return the Mongoose model for 'User', creating it if it doesn't exist
    return mongoose.models.User || mongoose.model('User', schema);
}
