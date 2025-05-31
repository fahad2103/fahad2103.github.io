// Initialize all maps when the page loads
 document.addEventListener('DOMContentLoaded', function() {
    // Project 1 Map
    initMap('map1', 25.8943, 68.5247, 7, [
        { id: 'layer1-1', name: 'Layer 1', path: '/tiles/sindhflood/cropbeforeflood/{z}/{x}/{y}.png', active: true },
        { id: 'layer1-2', name: 'Layer 2', path: '/tiles/sindhflood/cropafterflood/{z}/{x}/{y}.png', active: false },
        { id: 'layer1-3', name: 'Layer 3', path: '/tiles/sindhflood/floodextent/{z}/{x}/{y}.png', active: false },
        { id: 'layer1-4', name: 'Layer 4', path: '/tiles/sindhflood/swater/{z}/{x}/{y}.png', active: false }
    ]);
    
    // Project 2 Map
    initMap('map2', 31.5204,  74.3587, 10, [
        { id: 'layer2-1', name: 'Vegetation Index', path: '/tiles/lahoresmog/ub2020/{z}/{x}/{y}.png', active: true },
        { id: 'layer2-2', name: 'Soil Moisture', path: '/tiles/lahoresmog/ub2024/{z}/{x}/{y}.png', active: false },
        { id: 'layer2-3', name: 'Crop Health', path: '/tiles/lahoresmog/smog2020/{z}/{x}/{y}.png', active: false },
        { id: 'layer2-4', name: 'Land Use', path: '/tiles/lahoresmog/smog2024/{z}/{x}/{y}.png', active: false }
    ]);
    
    // Project 3 Map
    initMap('map3', 28.4907, 65.0958, 7, [
        { id: 'layer3-1', name: 'Elevation', path: '/tiles/balochistandrought/pci/{z}/{x}/{y}.png', active: true },
        { id: 'layer3-2', name: 'Slope', path: '/tiles/balochistandrought/spei/{z}/{x}/{y}.png', active: false },
        { id: 'layer3-3', name: 'Flood Risk', path: '/tiles/balochistandrought/vhi/{z}/{x}/{y}.png', active: false },
        { id: 'layer3-4', name: 'Drainage', path: '/tiles/balochistandrought/wue/{z}/{x}/{y}.png', active: false }
    ]);
    
    // Project 4 Map
    initMap('map4', 33.76, 116.67, 7, [
        { id: 'layer4-1', name: 'Forest Cover', path: '/tiles/huaihe/marchndvi/{z}/{x}/{y}.png', active: true },
        { id: 'layer4-2', name: 'Deforestation', path: '/tiles/huaihe/augustndvi/{z}/{x}/{y}.png', active: false },
        { id: 'layer4-3', name: 'Species Habitat', path: '/tiles/huaihe/decndvi/{z}/{x}/{y}.png', active: false },
        { id: 'layer4-4', name: 'Protected Areas', path: '/tiles/huaihe/sm/{z}/{x}/{y}.png', active: false }
    ]);
    
    // Project 5 Map
    initMap('map5', 31.1704, 72.7097, 7, [
        { id: 'layer5-1', name: 'Air Quality', path: '/tiles/punjabdrought/cdi/{z}/{x}/{y}.png', active: true },
        { id: 'layer5-2', name: 'Pollution Sources', path: '/tiles/punjabdrought/smci/{z}/{x}/{y}.png', active: false },
        { id: 'layer5-3', name: 'Wind Patterns', path: '/tiles/punjabdrought/spei/{z}/{x}/{y}.png', active: false },
        { id: 'layer5-4', name: 'Health Impact', path: '/tiles/punjabdrought/tvdi/{z}/{x}/{y}.png', active: false }
    ]);
    
    // Add click event listeners to all layer buttons
    document.querySelectorAll('.layer-btn').forEach(button => {
        button.addEventListener('click', function() {
            const layerId = this.getAttribute('data-layer');
            const mapId = this.closest('.map-container').querySelector('.map').id;
            const map = window[mapId + '_map'];
            const layer = window[layerId + '_layer'];
            
            if (map.hasLayer(layer)) {
                map.removeLayer(layer);
                this.classList.remove('active');
            } else {
                map.addLayer(layer);
                this.classList.add('active');
            }
        });
    });
    
    // Handle window resize to update maps
    window.addEventListener('resize', function() {
        // Invalidate size and then update all maps
        setTimeout(function() {
            Object.keys(window).forEach(key => {
                if (key.endsWith('_map') && window[key] && typeof window[key].invalidateSize === 'function') {
                    window[key].invalidateSize();
                }
            });
        }, 200);
    });
});

// Function to initialize a map with GeoTIFF layers (preserving embedded styles)
function initMap(mapId, lat, lng, zoom, layers) {
    // Initialize the map
    const map = L.map(mapId).setView([lat, lng], zoom);
    window[mapId + '_map'] = map;
    
    // Add base tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Load each XYZ tile layer
    layers.forEach(layerInfo => {
        const layer = L.tileLayer(layerInfo.path, {
            attribution: 'XYZ Tiles',
            maxZoom: 19,
            minZoom: 0
        });
        
        // Store the layer in the global scope for toggling
        window[layerInfo.id + '_layer'] = layer;
        
        // Add layer if it's marked as active
        if (layerInfo.active) {
            map.addLayer(layer);
        }
    });
}