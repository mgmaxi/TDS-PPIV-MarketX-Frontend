const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',

				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',

				primary: 'hsl(var(--primary))',
				'primary-foreground': 'hsl(var(--primary-foreground))',

				secondary: 'hsl(var(--secondary))',
				'secondary-foreground': 'hsl(var(--secondary-foreground))',

				muted: 'hsl(var(--muted))',
				'muted-foreground': 'hsl(var(--muted-foreground))',

				accent: 'hsl(var(--accent))',
				'accent-foreground': 'hsl(var(--accent-foreground))',

				destructive: 'hsl(var(--destructive))',
				'destructive-foreground': 'hsl(var(--destructive-foreground))',

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
			},
			borderRadius: {
				xl: '0.75rem',
			},
			boxShadow: {
				glow: '0 0 20px rgba(59, 130, 246, 0.25)', // sombra azul suave
			},
			transitionTimingFunction: {
				smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [],
};

export default config;
