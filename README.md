## Credit Calculator Service 📟

📌 Simple credit installments value calculator as an API service. Project contains Express.js app as a backend (server).
Database used in this project is MySQL.

![GitHub top language](https://img.shields.io/github/languages/top/jakubcieslik99/credit-calculator-service)
![GitHub repo size](https://img.shields.io/github/repo-size/jakubcieslik99/credit-calculator-service)

## Features

- Calculating value of installment based on the given rate
- Calculating value of installment based on the current interest rate of the National Bank of Poland
- Getting saved calculation
- Getting saved interest rate data

## Endpoints Documentation

📚 Documentation of all available endpoints can be found here:
[API Documentation](https://documenter.getpostman.com/view/20607862/2s9YRB1X86)

## Run Locally

- Clone repository

```bash
  git clone https://github.com/jakubcieslik99/credit-calculator-service.git
```

ℹ️ Instructions for running service locally:

- Navigate to the service directory and install dependencies

```bash
  cd credit-calculator-service
  npm install
```

- Run service in development mode with docker-compose and Docker Desktop

```bash
  npm run docker:dev
```

## Deployment

ℹ️ Instructions for building and running service in production

- Transpile to production build

```bash
  npm run build
```

- Run service in production mode

```bash
  npm install --omit=dev
  npm run start
```

## Feedback

If you have any feedback, please reach out to me at ✉️ contact@jakubcieslik.com

## Authors

- [@jakubcieslik99](https://www.github.com/jakubcieslik99)
