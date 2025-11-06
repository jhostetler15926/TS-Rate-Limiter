import { RedisAdapter } from '../../adapters/RedisAdapter';
import { printBanner } from '../utils/banner';

export async function resetLimit(redisUrl: string, key: string): Promise<void> {
  printBanner();
  const adapter = new RedisAdapter(redisUrl);
  await adapter.resetUsage(key);
  console.log(`✅ Limit reset for key: ${key}`);
}
