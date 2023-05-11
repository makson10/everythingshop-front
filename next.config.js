/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles'), path.join(__dirname, 'src', 'pages')],
    }
}

module.exports = nextConfig;