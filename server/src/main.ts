/* istanbul ignore file */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
    cors: (req, callback) => {
      callback(null, {
        origin: req.method !== 'POST',
        preflightContinue: false,
      })
    },
  })
  await app.listen(3001)
}
bootstrap()
