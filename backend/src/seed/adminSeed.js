import User from '../models/User.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await connectDB();

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('✅ Super admin already exists');
      process.exit(0);
    }

    // Create super admin
    const superAdmin = await User.create({
      name: process.env.ADMIN_NAME || 'Youssef',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'super_admin',
      phone: '+201234567890',
      address: 'Cairo, Egypt',
      isActive: true
    });

    console.log('✅ Super admin created successfully');
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();
