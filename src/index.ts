import { Options } from "graphql-yoga";
import { ConnectionOptions, createConnection } from "typeorm";
import app from "./app";
import defaultConnectionOptions from "./ormconfig";

const PORT: number | string = process.env.PORT || 4000;
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTIONS_ENDPOINT: string = "/subscriptions";
const PLAYGROUND_ENDPOINT: string = "/playground";

const handleAppError = (error): void => console.log(error);

const handleListening = (): void =>
  console.log(`Listening on http://localhost:${PORT}`);

const appOptions: Options = {
  port: PORT,
  subscriptions: SUBSCRIPTIONS_ENDPOINT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_ENDPOINT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "serranoarevalo",
  password: process.env.DB_PASSWORD || ""
};

const combinedOptions = Object.assign(
  {},
  connectionOptions,
  defaultConnectionOptions
);

createConnection(combinedOptions).then(() => {
  app.start(appOptions, handleListening);
});

app.express.on("error", handleAppError);
