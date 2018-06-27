const defaultConnectionOptions = {
  database: "deskpics",
  synchronize: true,
  logging: false,
  entities: ["entities/**.*"],
  migrations: ["migrations/**/*.*"],
  subscribers: ["subscribers/**/*.*"],
  cli: {
    entitiesDir: "/entities",
    migrationsDir: "migrations",
    subscribersDir: "subscribers"
  }
};

export default defaultConnectionOptions;
