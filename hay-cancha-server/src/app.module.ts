import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CanchaModule } from "./cancha/cancha.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env.development",
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: "1h",
      },
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CanchaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
