// Tailwind config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#0F4C81',
                secondary: '#4ECDC4',
                dark: '#1A1A2E',
                light: '#F8F9FA',
                accent: '#FF6B6B'
            },
            borderRadius: {
                'none': '0px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '32px',
                'full': '9999px',
                'button': '8px'
            }
        }
    }
}

// Navigation scroll behavior
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.add('-translate-y-full');
        } else if (currentScroll > lastScroll) {
            nav.classList.add('-translate-y-full');
        } else {
            nav.classList.remove('-translate-y-full');
        }

        lastScroll = currentScroll;
    });
});

// Technology ticker
document.addEventListener('DOMContentLoaded', function () {
    const techStack = [
        { logo: 'assets/arcgis.svg' },
        { name: 'CSS3', logo: 'assets/qgis.svg' },
        { name: 'JavaScript', logo: 'assets/im.svg' },
        { name: 'React', logo: 'assets/gep.svg' },
        { name: 'Vue.js', logo: 'assets/GEE.svg' },
        { name: 'Angular', logo: 'assets/geoai.svg' },
        { name: 'Node.js', logo: 'assets/geopandas.svg' },
        { name: 'Python', logo: 'assets/gdal1.svg' },
        { name: 'Django', logo: 'assets/cesium.svg' },
        { name: 'Java', logo: 'assets/ratserio.svg' },
        { name: 'PHP', logo: 'assets/mapbox.svg' },
        { name: 'MySQL', logo: 'assets/leaflet.svg' },
        { name: 'PostgreSQL', logo: 'assets/maps.svg' },
        { name: 'MongoDB', logo: 'assets/openlayers.svg' },
        { name: 'Docker', logo: 'assets/osgeo.svg' },
        { name: 'AWS', logo: 'assets/postgis.svg' },
        { name: 'Git', logo: 'assets/python.svg' }
    ];

    const tickerTrack = document.getElementById('tickerTrack');

    for (let i = 0; i < 2; i++) {
        techStack.forEach(tech => {
            const item = document.createElement('div');
            item.className = 'ticker-item';
            item.innerHTML = `
                <img src="${tech.logo}" alt="${tech.name}" loading="lazy" />
            `;
            tickerTrack.appendChild(item);
        });
    }

    let animationId;
    let speed = 1;
    let position = 0;
    let itemWidth = 120;

    function calculateItemWidth() {
        if (tickerTrack.children.length > 0) {
            const firstItem = tickerTrack.children[0];
            itemWidth = firstItem.offsetWidth;
        }
        return itemWidth;
    }

    function animate() {
        const singleSetWidth = techStack.length * calculateItemWidth();

        if (position <= -singleSetWidth) {
            position = 0;
        }

        position -= speed;
        tickerTrack.style.transform = `translateX(${position}px)`;

        animationId = requestAnimationFrame(animate);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cancelAnimationFrame(animationId);
            calculateItemWidth();
            animate();
        }, 100);
    });

    calculateItemWidth();
    animate();
});
