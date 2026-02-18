// Utility script to drop the firstName unique index that's causing E11000 errors
const mongoose = require('mongoose');
require('dotenv').config();

async function dropIndex() {
  try {
    await mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/KGL', {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');

    // Drop the problematic lastName index if it exists
    try {
      await mongoose.connection.collection('signups').dropIndex('lastName_1');
      console.log('✓ Dropped lastName_1 index');
    } catch (err) {
      if (err.code === 27) {
        console.log('Index lastName_1 does not exist (this is fine)');
      } else {
        console.error('Error dropping index:', err.message);
      }
    }

    // Also drop firstName index if it exists
    try {
      await mongoose.connection.collection('signups').dropIndex('firstName_1');
      console.log('✓ Dropped firstName_1 index');
    } catch (err) {
      if (err.code === 27) {
        console.log('Index firstName_1 does not exist (this is fine)');
      } else {
        console.error('Error dropping index:', err.message);
      }
    }

    console.log('✓ Index cleanup complete');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

dropIndex();
