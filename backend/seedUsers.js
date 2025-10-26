import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/users.model.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
    const DB_NAME = 'agrisphere';

    console.log('Connecting to:', `${uri}/${DB_NAME}`);
    const conn = await mongoose.connect(`${uri}/${DB_NAME}`);
    console.log(`\n MONGODB CONNECTED !! DB HOST : ${conn.connection.host}`);
    console.log('Database name:', conn.connection.name);
  } catch (error) {
    console.log("MONGODB_CONNECTION ERROR: ", error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to database');

    // Clear existing users (optional - remove this line if you want to keep existing users)
    await User.deleteMany({});
    console.log('Cleared existing users');

    const users = [];
    const roles = ['Farmer', 'landloard', 'labourer', 'stackholder'];
    const locations = [
      'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu',
      'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan',
      'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra', 'Indore, Madhya Pradesh',
      'Thane, Maharashtra', 'Bhopal, Madhya Pradesh', 'Visakhapatnam, Andhra Pradesh',
      'Patna, Bihar', 'Vadodara, Gujarat', 'Ghaziabad, Uttar Pradesh', 'Ludhiana, Punjab',
      'Agra, Uttar Pradesh', 'Nashik, Maharashtra', 'Faridabad, Haryana', 'Meerut, Uttar Pradesh',
      'Rajkot, Gujarat', 'Kalyan-Dombivli, Maharashtra', 'Vasai-Virar, Maharashtra', 'Varanasi, Uttar Pradesh'
    ];

    const firstNames = [
      'Rajesh', 'Priya', 'Amit', 'Sunita', 'Vijay', 'Meera', 'Suresh', 'Kavita', 'Ramesh', 'Anita',
      'Mohan', 'Rekha', 'Dinesh', 'Poonam', 'Ganesh', 'Lata', 'Harish', 'Sarika', 'Mahesh', 'Geeta',
      'Ravi', 'Kiran', 'Sanjay', 'Neha', 'Arun', 'Shobha', 'Prakash', 'Manju', 'Vinod', 'Kusum',
      'Balaji', 'Radha', 'Chandru', 'Lakshmi', 'Krishna', 'Padma', 'Srinivas', 'Kamala', 'Rangan', 'Valli',
      'Murugan', 'Parvati', 'Shankar', 'Ganga', 'Brahma', 'Saraswati', 'Vishnu', 'Lakshmi', 'Shiva', 'Parvati',
      'Ram', 'Sita', 'Hanuman', 'Laxman', 'Bharat', 'Shatrughna', 'Dasharatha', 'Kausalya', 'Sumitra', 'Kaikeyi',
      'Krishna', 'Arjuna', 'Bhima', 'Yudhishthira', 'Nakula', 'Sahadeva', 'Draupadi', 'Kunti', 'Gandhari', 'Dhritarashtra',
      'Karna', 'Duryodhana', 'Bhishma', 'Drona', 'Kripa', 'Ashwatthama', 'Vidura', 'Sanjoy', 'Yuyutsu', 'Ulooka'
    ];

    const lastNames = [
      'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Verma', 'Yadav', 'Jain', 'Agarwal', 'Mishra',
      'Chauhan', 'Rathore', 'Solanki', 'Rajput', 'Thakur', 'Rana', 'Rawat', 'Negi', 'Bisht', 'Joshi',
      'Pant', 'Tripathi', 'Dubey', 'Pandey', 'Tiwari', 'Mishra', 'Srivastava', 'Agrawal', 'Bansal', 'Goel',
      'Mehrotra', 'Awasthi', 'Chaturvedi', 'Dwivedi', 'Trivedi', 'Shukla', 'Prasad', 'Saxena', 'Garg', 'Arora',
      'Malhotra', 'Khanna', 'Kapoor', 'Seth', 'Jindal', 'Mittal', 'Goyal', 'Jain', 'Bhandari', 'Thapa',
      'Tamang', 'Limbu', 'Rai', 'Sherpa', 'Gurung', 'Magar', 'Thakuri', 'Basnet', 'Poudel', 'Adhikari',
      'Karki', 'Shrestha', 'Bajracharya', 'Tuladhar', 'Duwal', 'Maharjan', 'Joshi', 'Bhatta', 'Acharya', 'Pandit',
      'Upadhyay', 'Tiwari', 'Dixit', 'Tripathi', 'Chaturvedi', 'Dwivedi', 'Shukla', 'Prasad', 'Saxena', 'Garg',
      'Arora', 'Malhotra', 'Khanna', 'Kapoor', 'Seth', 'Jindal', 'Mittal', 'Goyal', 'Jain', 'Bhandari'
    ];

    const bios = [
      'Passionate farmer with 15+ years of experience in sustainable agriculture.',
      'Dedicated to modern farming techniques and community development.',
      'Specializing in organic farming and crop rotation methods.',
      'Experienced in irrigation systems and water management.',
      'Focused on high-yield crop production and farm optimization.',
      'Committed to sustainable farming practices and environmental conservation.',
      'Expert in pest management and integrated farming solutions.',
      'Building a better future for farming communities across India.',
      'Innovating traditional farming methods with modern technology.',
      'Creating sustainable agricultural solutions for the next generation.',
      'Bridging the gap between traditional wisdom and modern science.',
      'Empowering farmers with knowledge and cutting-edge tools.',
      'Cultivating success through innovation and dedication.',
      'Growing communities through sustainable agriculture.',
      'Harvesting dreams and feeding nations through smart farming.',
      'Transforming agriculture one farm at a time.',
      'Championing sustainable farming for a greener tomorrow.',
      'Building resilient farming systems for climate change adaptation.',
      'Fostering agricultural innovation and rural development.',
      'Creating pathways to prosperous and sustainable farming.'
    ];

    // Generate 100 users
    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const bio = bios[Math.floor(Math.random() * bios.length)];

      // Generate unique email
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`;

      // Generate phone number (Indian format)
      const phone = `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);

      const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        location,
        phone,
        bio,
        profilePic: '',
        coverImage: ''
      };

      users.push(user);
    }

    // Insert users in batches to avoid memory issues
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await User.insertMany(batch);
      console.log(`Inserted users ${i + 1} to ${Math.min(i + batchSize, users.length)}`);
    }

    console.log(`\n✅ Successfully seeded ${users.length} users!`);

    // Display role distribution
    const roleCounts = {};
    users.forEach(user => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });

    console.log('\n📊 Role Distribution:');
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`${role}: ${count} users`);
    });

    console.log('\n🔐 Default login credentials:');
    console.log('Email: any_user_email@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

// Run the seeder
seedUsers();