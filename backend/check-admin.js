import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to database');
    
    const admin = await User.findOne({ email: 'youssefezzat764@gmail.com' });
    
    if (admin) {
      console.log('\n✅ Admin user found:');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Password hash exists:', !!admin.password);
      console.log('Hash length:', admin.password?.length);
      console.log('Email verified:', admin.isEmailVerified);
      
      const testPassword = '123456789';
      const isMatch = await bcrypt.compare(testPassword, admin.password);
      console.log('\n🔐 Password test (123456789):', isMatch ? '✅ MATCH' : '❌ NO MATCH');
      
      if (!isMatch) {
        console.log('\n⚠️  Password does not match! Let me show first 20 chars of hash:');
        console.log('Hash preview:', admin.password.substring(0, 20) + '...');
      }
    } else {
      console.log('❌ Admin user NOT FOUND in database');
    }
    
    await mongoose.disconnect();
    console.log('\nDisconnected from database');
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
