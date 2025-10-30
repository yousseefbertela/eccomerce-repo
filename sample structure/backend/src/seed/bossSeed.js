import { connectDB } from '../config/db.js';
import User from '../models/User.js';

async function seedBoss() {
  await connectDB();
  const email = 'ahmedfathy12309@gmail.com';
  const password = 'ahmedfathy12345678';
  let boss = await User.findOne({ email });
  if (boss) {
    console.log('Boss already exists');
  } else {
    boss = await User.create({ name: 'Main Boss', email, password, role: 'boss', approved: true });
    console.log('Boss account created');
  }
  process.exit(0);
}

seedBoss().catch(e => { console.error(e); process.exit(1); });
