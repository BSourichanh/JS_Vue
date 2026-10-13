import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Dossiers contenant les images et icônes du projet
const targetDirs = [
  path.join(rootDir, 'src/assets'),
  path.join(rootDir, 'ressources/icon'),
  path.join(rootDir, 'public')
]

const validExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.ico', '.webp']

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath))
    } else if (validExtensions.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} o`
  return `${(bytes / 1024).toFixed(2)} Ko`
}

console.log('🚀 Démarrage de la compression des images et assets graphiques...\n')

const filesToCompress = targetDirs.flatMap(collectFiles)

if (filesToCompress.length === 0) {
  console.log('⚠️ Aucun fichier graphique trouvé à compresser.')
  process.exit(0)
}

let totalOriginal = 0
let totalCompressed = 0

for (const filePath of filesToCompress) {
  const relPath = path.relative(rootDir, filePath)
  const originalBuffer = fs.readFileSync(filePath)
  const originalSize = originalBuffer.length

  // Compression Gzip niveau 9 (compression maximale sans perte)
  const compressedBuffer = zlib.gzipSync(originalBuffer, { level: 9 })
  const compressedSize = compressedBuffer.length

  const outPath = `${filePath}.gz`
  fs.writeFileSync(outPath, compressedBuffer)

  totalOriginal += originalSize
  totalCompressed += compressedSize

  const ratio = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
  console.log(`  ✔ [COMPRESSÉ] ${relPath}`)
  console.log(`    ${formatBytes(originalSize)} ➔ ${formatBytes(compressedSize)} (-${ratio}%)\n`)
}

const totalSaved = totalOriginal - totalCompressed
const totalRatio = (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)

console.log('--------------------------------------------------')
console.log(`✨ Bilan de compression :`)
console.log(`   - Fichiers traités   : ${filesToCompress.length}`)
console.log(`   - Poids initial      : ${formatBytes(totalOriginal)}`)
console.log(`   - Poids compressé    : ${formatBytes(totalCompressed)}`)
console.log(`   - Espace économisé   : ${formatBytes(totalSaved)} (-${totalRatio}%)`)
console.log('--------------------------------------------------')
