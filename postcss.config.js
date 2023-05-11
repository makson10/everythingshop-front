module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {
            'flexbox': true
        },
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
}
