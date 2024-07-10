# React + TypeScript + Vite Boilerplate

This React + TypeScript + Vite boilerplate is designed to kickstart your projects with a modern front-end architecture. It includes essential features like a language provider for internationalization, authentication provider for managing user sessions, and Axios interceptors for handling API requests seamlessly.

## Features

- **Language Provider**: Integrated provider for managing application languages and translations.
- **Authentication Provider**: Pre-configured provider for handling user authentication and sessions.
- **Axios Interceptors**: Built-in interceptors for managing HTTP requests and responses efficiently.
- **RoutesProvider**: Uses the latest updates and features of react-router-dom for managing routes efficiently.

## Getting Started

Follow these steps to get started with the project:

- Clone the repository.
- Install dependencies with `npm install`.
- Start the development server with `npm run dev`.

## Current LogIn Credentials

- **username:** emilys
- **password:** emilyspass

## Authentication Setup

- Configure serverURL in `/src/helpers/server.ts`
- Update API endpoints and token handling as per your backend setup.

## Route Configuration

- Create Component folder and index.tsx file in `/src/containers + new_screen/index.tsx`.
- Import Your Component in `/src/routes/config.tsx` using lazy.
- Add it inside children array for protected routes.

## License

**MIT License Copyright (c) 2024 Anri Voci**

## Authors

- **Anri Voci** - [GitHub Profile](https://github.com/anrivoci)
