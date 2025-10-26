import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["Farmer", "landloard", "labourer", "stackholder"], default: "Farmer" },
  location: { type: String, default: "" },
  phone: { type: String, default: "" },
  bio: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  coverImage: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function checkUsers() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/agrisphere');
    console.log('Connected to database');

    const count = await User.countDocuments();
    console.log('Total users in database:', count);

    if (count > 0) {
      const users = await User.find().limit(5).select('firstName lastName email role');
      console.log('Sample users:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.email} (${user.role})`);
      });
    } else {
      console.log('No users found in database');
    }

    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkUsers();