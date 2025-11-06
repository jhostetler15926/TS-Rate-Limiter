import fs from 'fs';
import path from 'path';
import { LimitConfig } from '../core/types';

export function loadConfig(): LimitConfig {
  const filePath = path.resolve(__dirname, 'defaultLimits.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}
