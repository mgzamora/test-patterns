export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3001,
    DATABASE: {
        TYPE: process.env.DATABASE_TYPE,
        NAME: process.env.DATABASE_NAME,
        HOST: process.env.DATABASE_HOST,
        PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        USERNAME: process.env.DATABASE_USERNAME,
        PASSWORD: process.env.DATABASE_PASSWORD,
    }
  });