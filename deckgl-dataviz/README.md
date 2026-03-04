# Getting Started

This project uses **Vite**.

## Environment variables (Mapbox)

This app requires a Mapbox access token.

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set your token:

```bash
VITE_MAPBOX_ACCESS_TOKEN=xxxxx
```

> Note: `.env.local` is ignored by git.

## Available Scripts

In the project directory, you can run:

### `npm run dev` (or `npm start`)

Runs the app in development mode.\
Open the URL shown in the terminal (default: http://localhost:5173).

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Runs tests with Vitest.

### `npm run build`

Builds the app for production to the `dist` folder.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

- Vite: https://vitejs.dev/
- React: https://react.dev/
