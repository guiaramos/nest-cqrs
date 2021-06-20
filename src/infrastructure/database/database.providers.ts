import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseProviders = MongooseModule.forRoot(process.env.DB_URL);
