import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// Allows to run global hooks and perform meta operations like wiping database, etc ...
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

// After each test, we remove the test.sqlite but TypeORM still try to connect to the previous database file
// Need to reset the TypeORM connection
global.afterEach(async () => {
  // Need to try/catch the `getConnection(...) usage until it leads to missing "default" connection
  try {
    const conn = getConnection();
    conn.close();
  } catch (error) {}
});
