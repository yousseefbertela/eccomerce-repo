import dotenv from 'dotenv';
import { sendVerificationEmail, sendPasswordResetEmail, generateVerificationCode } from './src/utils/emailService.js';

dotenv.config();

const testEmail = 'ahmedfathy12309@gmail.com';
const testName = 'Test User';

async function sendTestEmails() {
  console.log('🧪 Starting email tests...\n');

  // Test 1: Verification Email
  console.log('📧 Test 1: Sending verification email...');
  const verificationCode = generateVerificationCode();
  console.log(`Generated verification code: ${verificationCode}`);
  
  const verificationResult = await sendVerificationEmail(testEmail, verificationCode, testName);
  console.log('Verification email result:', verificationResult);
  console.log('');

  // Test 2: Password Reset Email
  console.log('📧 Test 2: Sending password reset email...');
  const resetCode = generateVerificationCode();
  console.log(`Generated reset code: ${resetCode}`);
  
  const resetResult = await sendPasswordResetEmail(testEmail, resetCode, testName);
  console.log('Reset email result:', resetResult);
  console.log('');

  console.log('✅ Email tests completed!');
  process.exit(0);
}

sendTestEmails().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
