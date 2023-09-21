export default {
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'technical',
  password: 'technical',
  database: 'technical',
  entities: ['./entities/*.ts'],
  migrations: ['./migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
}
