import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#090B10', panel:'#11141B', card:'#181B22', gold:'#C9A44C', glow:'#E2C477', muted:'#A6A6A6', cream:'#F5F3ED' }, fontFamily:{ sans:['Arial','sans-serif'], display:['Georgia','serif'] } } }, plugins: [] } satisfies Config;
