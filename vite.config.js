import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    'process.env': {}
  },
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능
    port: 3000,
    /*proxy: {
      '/api': { // 프록시가 적용될 경로
        target: 'https://kampus.kro.kr',
        changeOrigin: true, // 대상 서버의 origin을 사용
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거
        secure: false,                  // 필요 시 HTTPS 인증서 무시
      },
    },*/
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
