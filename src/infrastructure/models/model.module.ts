import { Module } from '@nestjs/common';
import { ModelProviders } from './model.providers';

@Module({
  imports: [ModelProviders],
  exports: [ModelProviders],
})
export class ModelModule {}
