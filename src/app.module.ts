import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Report, User],
      synchronize: true, // for development environment only! Auto-edit the database structure!
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
  configure(consumer: MiddlewareConsumer) {
    // Apply a global middleware
    // Need to be done in the `app.module.ts` to allow Jest to use the cookie sessions and prevent falsy "500 Internal Server Error"
    consumer.apply(cookieSession({ keys: ['zertyuj'] })).forRoutes('*');
  }
}
