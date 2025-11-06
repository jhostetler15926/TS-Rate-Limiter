import { RedisAdapter } from '../../adapters/RedisAdapter';
import { printBanner } from '../utils/banner';

export async function showStats(redisUrl: string, key: string): Promise<void> {
  printBanner();
  const adapter = new RedisAdapter(redisUrl);
  const usage = await adapter.getUsage(key);

  console.log(`🔍 Key: ${key}`);
  console.log(`📊 Count: ${usage.count}`);
  console.log(`⏱ Timestamp: ${new Date(usage.timestamp).toLocaleString()}`);
}
