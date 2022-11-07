import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Posterr API')
  .setDescription('A Strider sponsored project')
  .setVersion('1.0')
  .build();