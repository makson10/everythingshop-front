/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            width: {
                'input': '300px'
            },
            gridTemplateRows: {
                '[auto,auto,1fr]': 'auto auto 1fr',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}