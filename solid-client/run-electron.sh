echo "Solid-vite: Compiling Solid website..."
yarn run build
echo "TypeScript: Transpiling Electron main process..."
tsc src/electron/main.ts --outDir dist/electron
echo "electron: Running Electron main process..."
electron . --no-sandbox
