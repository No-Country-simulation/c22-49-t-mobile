import { Module } from "@nestjs/common";
import { CanchaController } from "./cancha.controller";
import { CanchaService } from "./cancha.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Cancha, CanchaSchema } from "./schemas/cancha.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cancha.name, schema: CanchaSchema }]),
  ],
  controllers: [CanchaController],
  providers: [CanchaService],
})
export class CanchaModule {}
