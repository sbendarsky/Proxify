/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        connectionString: "mongodb+srv://HixS:0526788865@proxify.dqdpegs.mongodb.net/",
        proxmoxURL: "https://172.29.81.24:8006",
        proxmox_token_id: "ortapiuser@tamnun.inc!VUPtAhFzMGDv6g7YaUYELDDk",
        proxmox_secret: "d58eecb6-1c24-44db-8920-5603713399d6",
        secret: 'JWTSECRETKEY'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig
