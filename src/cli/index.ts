import { showStats } from './commands/stats';
import { resetLimit } from './commands/reset';

const args = process.argv.slice(2);
const command = args[0];
const key = args[1];
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

if (!command || !key) {
  console.log('Usage: stats <key> | reset <key>');
  process.exit(1);
}

if (command === 'stats') {
  showStats(redisUrl, key);
} else if (command === 'reset') {
  resetLimit(redisUrl, key);
} else {
  console.log(`Unknown command: ${command}`);
}
