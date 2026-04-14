function WaveDivider({ variant = 'light-to-dark', className = '' }) {
    const variants = {
        'light-to-dark': {
            fill: '#111827'
        },
        'dark-to-light': {
            fill: '#ffffff'
        }
    }

    const colors = variants[variant] || variants['light-to-dark']

    return (
        <div className={`relative w-full ${className}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
            <svg
                className="w-full"
                style={{ display: 'block', height: '60px' }}
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z"
                    fill={colors.fill}
                />
            </svg>
        </div>
    )
}

export default WaveDivider
