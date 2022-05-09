import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

export default {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      resolvers: [
        VantResolver()
      ]
    }),
    styleImport({
      resolves: [VantResolve()]
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteSvgIcons({
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
}
