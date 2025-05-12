import react from '@vitejs/plugin-react-swc';
import { defineConfig, UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseConfig: UserConfig = {
  // tsConfigPaths plugin lets vite use tsconfig.app.json baseUrl to resolve imports
  plugins: [react(), tsconfigPaths()],
  css: {
    devSourcemap: true,
  },
  esbuild: {
    legalComments: 'none',
  },
};

export default defineConfig((configEnv) => {
  switch (configEnv.command) {
    case 'build':
      return {
        ...baseConfig,
        build: {
          minify: true,
          target: 'es2022',
          sourcemap: true,
          cssMinify: true,
        },
      };
    case 'serve':
      return {
        ...baseConfig,
        server: {
          host: '127.0.0.1',
        },
      };
  }
});

