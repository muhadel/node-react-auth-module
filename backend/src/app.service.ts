import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "./config/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): { status: string; env: string; uptime: string } {
    const uptime = process.uptime().toFixed(2);
    const status = "healthy";
    const env = this.configService.get(ConfigKey.App).env;

    return { status, env, uptime: `${uptime} seconds` };
  }
}
