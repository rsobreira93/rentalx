import { Connection, createConnection, getConnectionOptions } from "typeorm";

// createConnection();

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = "database_ignite";
//   createConnection({
//     ...options,
//   });
// });

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DB_HOST,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_tests"
          : defaultOptions.database,
    })
  );
};
