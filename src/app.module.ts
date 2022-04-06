import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { join } from "path";
import { ListsModule } from "./lists/lists.module";
import { CardsModule } from "./cards/cards.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DB'),
        entities: [join(__dirname, config.get('TYPEORM_ENTITIES'))],
        synchronize: config.get<boolean>('TYPEORM_SYNCHRONIZE'),
      }),
    }),
    UsersModule,
    AuthModule,
    ListsModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}

// TODO: Make sure, that the validation pipe is working on all user data
