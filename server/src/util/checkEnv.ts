export default () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable missing. Shutting down.')
      process.exit()
    }
    if (!process.env.DATABASE_NAME) {
      console.error(
        'DATABASE_NAME environment variable missing. Shutting down.'
      )
      process.exit()
    }
    if (!process.env.CORS_ORIGIN) {
      console.error('CORS_ORIGIN environment variable missing. Shutting down.')
      process.exit()
    }
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error(
      'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
    )
    process.exit()
  }

  if (!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)) {
    console.warn(
      `
    Image uploading disabled. To enable, set the following environment variables: 
    AWS_ACCESS_KEY_ID=<AWS access key ID>
    AWS_SECRET_ACCESS_KEY=<AWS secret access key>
    `
    )
  }
}