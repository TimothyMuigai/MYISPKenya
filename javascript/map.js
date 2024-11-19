const userIcon = L.icon({
    iconUrl: 'images/person_pin.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

var map = L.map('map').setView([-1.2864, 36.8172], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let currentMarker = null;

fetch('http://localhost:3000/providers')
    .then(response => response.json())
    .then(providers => {
        if (Array.isArray(providers)) {
            displayProviderLocations(providers);
        } else {
            console.error('Expected an array but got:', providers);
        }
    })
    .catch(error => console.error('Error fetching provider data:', error));
    
function displayProviderLocations(providers) {
    const providerLinks = {
        Safaricom: 'https://safaricom.co.ke',
        Airtel: 'https://airtel.africa',
        Faiba: 'https://faiba.co.ke',
    };

    providers.forEach(provider => {
        const mainOffice = provider["Provider Location"];
        if (mainOffice) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${mainOffice}, Kenya`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    const mainOfficeMarker = L.marker([lat, lon]).addTo(map);
                    const link = providerLinks[provider.name] || '#';
                    const popupContent = `<strong>${provider.name} (Main Office)</strong><br>Location: <em>${mainOffice}</em><br><a href="${link}" target="_blank">View plans</a>`;
                    mainOfficeMarker.bindPopup(popupContent);
                }
            })
            .catch(error => console.error(`Error fetching location for main office (${mainOffice}):`, error));
        }

        if (provider.locations && Array.isArray(provider.locations)) {
            provider.locations.forEach(location => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location.city}, Kenya`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const lat = parseFloat(data[0].lat);
                        const lon = parseFloat(data[0].lon);
                        const locationMarker = L.marker([lat, lon]).addTo(map);
                        const link = providerLinks[provider.name] || '#';
                        const popupContent = `<strong>${provider.name}</strong><br>City: <em>${location.city}</em><br><a href="${link}" target="_blank">View Plans</a>`;
                        locationMarker.bindPopup(popupContent);
                    }
                })
                .catch(error => console.error(`Error fetching location for ${location.city}:`, error));
            });
        } else {
            console.error('Invalid locations data for provider:', provider);
        }
    });
}    
    

document.getElementById('form').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const locationInput = document.getElementById('Location-input').value;

    if (!locationInput) {
        showError('Please enter a location.');
        return;
    }

    fetchLocationData(locationInput);
}

function fetchLocationData(locationInput) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}, Kenya`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                const displayName = data[0].display_name;

                if (isLocationInKenya(lat, lon)) {
                    updateMapWithLocation(lat, lon, displayName);
                    showError('');
                } else {
                    showError('Location is outside Kenya. Please enter a location in Kenya.');
                }
            } else {
                showError('Location not found in Kenya. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            showError('An error occurred while searching for the location.');
        });
}

function isLocationInKenya(lat, lon) {
    return lat >= -4.62 && lat <= 4.98 && lon >= 33.5 && lon <= 41.9;
}

function updateMapWithLocation(lat, lon, displayName) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    currentMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map);

    const popupContent = `
        <strong>Your Location:</strong><br>${displayName}
    `;

    currentMarker.bindPopup(popupContent).openPopup();
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

const backBtn = document.querySelector('.backbtn');

backBtn.addEventListener('click', () =>{
    window.history.back();
})
