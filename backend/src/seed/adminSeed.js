import User from '../models/User.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('🔌 Connected to MongoDB');

    const adminEmail = 'youssefezzat764@gmail.com';
    const adminPassword = '123456789';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    if (admin) {
      // Update existing user to admin with new password
      admin.role = 'admin';
      admin.password = hashedPassword;
      admin.isEmailVerified = true;
      admin.isActive = true;
      await admin.save();
      console.log('✅ Updated existing user to ADMIN role with new password');
    } else {
      // Create new admin user
      admin = await User.create({
        name: 'Youssef (Admin)',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        isActive: true,
        phone: '+201234567890',
      });
      console.log('✅ Created new ADMIN user');
    }

    console.log('\n📧 Admin Credentials:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('   Role:', admin.role);
    console.log('\n✨ Admin account is ready! You can now login.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
