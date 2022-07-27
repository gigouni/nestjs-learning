import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/report.entity';
import { User } from './users/user.entity';
// Due to misoconfiguration between cookie-session and TypeScript
const cookieSession = require('cookie-session'); // eslint-disable-line

@Module({
  imports: [
    // the `forRoot(...)` allows to set properties of the module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    // Need to use `.forRootAsync(...)`syntax to use the ConfigService and get the environment variables
    // Recommended way from NestJS documentation
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [Report, User],
          synchronize: true, // for development environment only! Auto-edit the database structure!
        };
      },
    }),

    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // For every single request coming to the application, appply the validation pipe
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // Apply a global middleware
    // Need to be done in the `app.module.ts` to allow Jest to use the cookie sessions and prevent falsy "500 Internal Server Error"
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
