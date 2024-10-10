/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPLICATE_API_TOKEN: string
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}