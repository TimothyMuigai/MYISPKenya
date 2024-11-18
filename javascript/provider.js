const form = document.getElementById('companyDetailsForm');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const areaNames = Array.from(document.getElementsByName('area')).map(input => input.value);
    const cityNames = Array.from(document.getElementsByName('city')).map(input => input.value);
    const companyName = document.querySelector('input[name="companyName"]').value;
    const companyLocation = document.querySelector('input[name="companyLocation"]').value;

    const providerData = {
        name: companyName,
        "Provider Location": companyLocation,
        locations: []
    };

    for (const location of areaNames.map((area, index) => ({
        area,
        city: cityNames[index]
    }))) {
        const fullAddress = `${location.city}, ${location.area}`;
        providerData.locations.push({
            city: fullAddress
        });
    }

    try {
        const response = await fetch('http://localhost:3000/providers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(providerData),
        });

        if (response.ok) {
            alert('Provider information successfully added!');
        } else {
            console.error('Failed to save provider information:', response.statusText);
        }
    } catch (error) {
        console.error('Failed to save provider information:', error);
    }
});


const inputBox = document.querySelector('.input-box');

function addCityInput() {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
        <label>County/Area: 
            <input type="text" name="area" placeholder="Enter county/city name" required>
        </label>
        <label>City: 
            <input type="text" name="city" placeholder="Enter area name" required>
        </label>
        <button type="button" onclick="deleteLocation(this)">Delete</button>`;
    
    inputBox.appendChild(inputGroup);
}

function deleteLocation(button) {
    const parentDiv = button.parentElement;
    inputBox.removeChild(parentDiv);
}
