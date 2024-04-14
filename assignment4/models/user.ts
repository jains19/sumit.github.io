import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for User document
interface UserDocument extends Document {
    DisplayName: string;
    EmailAddress: string;
    Username: string;
    Password: string;
}

// Define the schema for User
const userSchema = new Schema<UserDocument>({
    DisplayName: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email addresses
    },
    Username: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of usernames
    },
    Password: {
        type: String,
        required: true
    }
});

// Export the User model
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;