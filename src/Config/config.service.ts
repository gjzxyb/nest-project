import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    const fullPath = path.resolve(__dirname, '../../', filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(fullPath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
