import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions } from "@nestjs/jwt"

export const getJWTConfig = (): JwtModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
    })
  }
}
