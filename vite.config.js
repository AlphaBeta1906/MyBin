import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        VitePWA({
            includeAssets: ["src/favicon.svg", "robots.txt"],
            manifest: {
                name: "MyBin",
                short_name: "MyBin",
                description: "a simple pastebin clone to host snippets of code online",
                start_url: "/",
                theme_color: "#ffffff",
                icons: [{
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    }
                ]
            }
        })
    ]
})