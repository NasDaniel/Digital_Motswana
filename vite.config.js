import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Serve files from the root folder
  publicDir: 'public', // Optional: Specify the public folder for static assets
   
  build: {
    outDir: 'dist', // Output directory for the build
  },
  server: {
    port: 3000, // Optional: Set a custom port
  },
});
