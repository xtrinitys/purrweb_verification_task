import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { join } from "path";
import { ListsModule } from "./lists/lists.module";
import { CardsModule } from "./cards/cards.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { CommentsModule } from "./comments/comments.module";

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
    CommentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ]
})
export class AppModule {}
// TODO: BEFORE DEPLOY TASKS:
//  - Full swagger integration
//  - Make diagram at dbdiagram.io
//  - Test all endpoints with broken data
//  - Deal with passport etc
//  - Mb add full CRUD for user