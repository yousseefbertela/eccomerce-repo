import User from '../models/User.js';

const BOSS_EMAIL = 'ahmedfathy12309@gmail.com';
const BOSS_PASSWORD = 'ahmedfathy12345678';

export async function seedBossOnStartup() {
  let boss = await User.findOne({ email: BOSS_EMAIL });
  if (!boss) {
    boss = await User.create({ 
      name: 'Main Boss', 
      email: BOSS_EMAIL, 
      password: BOSS_PASSWORD, 
      role: 'boss', 
      approved: true,
      department: 'Management',
      position: 'CEO',
      isActive: true
    });
    console.log('Boss user created on startup');
  } else {
    // Only update missing fields, don't reset password
    let updated = false;
    if (!boss.department) {
      boss.department = 'Management';
      updated = true;
    }
    if (!boss.position) {
      boss.position = 'CEO';
      updated = true;
    }
    if (boss.isActive === undefined) {
      boss.isActive = true;
      updated = true;
    }
    if (updated) {
      await boss.save();
      console.log('Boss user fields updated (password unchanged)');
    } else {
      console.log('Boss user already exists - no changes needed');
    }
  }
}

// WARNING: This function converts all hashed passwords to plain text
// Only use for development purposes!
export async function convertHashedPasswordsToPlainText() {
  try {
    const users = await User.find({});
    for (const user of users) {
      if (user.email === BOSS_EMAIL) {
        user.password = BOSS_PASSWORD;
      } else {
        // Set a default password for other users
        user.password = 'password123';
      }
      await user.save();
    }
    console.log(`Converted ${users.length} user passwords to plain text`);
  } catch (error) {
    console.error('Error converting passwords:', error);
  }
}
