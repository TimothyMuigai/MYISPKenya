const openBtn = document.querySelector(".open-img");
const closeBtn = document.querySelector(".close-img");
const closeNav = document.querySelector(".close");
openBtn.addEventListener('click',()=>{
    closeNav.style.display = "flex"
})
closeBtn.addEventListener('click',()=>{
    closeNav.style.display = "none"
})

const displayMoreBtn =document.querySelectorAll(".showTxt");
const displayLessBtn =document.querySelectorAll(".hideTxt");
const displayMInfo = document.querySelectorAll(".extra");

displayMoreBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        displayMInfo[index].style.display = "block";
        displayLessBtn[index].style.display = "inline";
        btn.style.display = "none";
    });
});
displayLessBtn.forEach((btn,index) =>{
    btn.addEventListener("click", ()=>{
        displayMInfo[index].style.display="none";
        btn.style.display="none"
        displayMoreBtn[index].style.display="inline"
    });
});

const selector1 = document.getElementById('selector1');
const selector2 = document.getElementById('selector2');
const compareButton = document.querySelector('#compareBtn');

function updateDropdownOptions() {
    const selected1 = selector1.value;
    const selected2 = selector2.value;

    // Update options in selector1
    Array.from(selector1.options).forEach(option => {
        option.disabled = option.value === selected2 && selected2 !== '';
    });

    // Update options in selector2
    Array.from(selector2.options).forEach(option => {
        option.disabled = option.value === selected1 && selected1 !== '';
    });
}

selector1.addEventListener('change', updateDropdownOptions);
selector2.addEventListener('change', updateDropdownOptions);

compareButton.addEventListener('click', async function () {
    const provider1 = selector1.value;
    const provider2 = selector2.value;
    

    if (provider1 && provider2) {
        try {
            const response = await fetch('http://localhost:3000/internetPlans');
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            const providerDetails = await response.json();
            updateComparison(providerDetails, provider1, provider2);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    } else {
        alert('Please select two different providers to compare.');
    }
});

function updateComparison(providerDetails, provider1, provider2) {
    const card1 = document.querySelector('#card1');
    const card2 = document.querySelector('#card2');

    card1.innerHTML = `
        <div class="compare-images">
            <img src="${providerDetails[provider1].logo}" alt="${provider1}">
        </div>
        <ul>
            <p>Best Offers </p>
            ${providerDetails[provider1].offers
                .map(
                    offer => `<li>${offer.speed}, Price: ${offer.price}</li>`
                )
                .join('')}
        </ul>
        <div class="installation-fee">
            <p>Installation Fee: ${providerDetails[provider1].installationFee}</p>
        </div>
        <div class="compare-ratings">
            <p>Ratings: ${providerDetails[provider1].ratings} stars</p>
        </div>
        <a href="${providerDetails[provider1].link}" target="_blank">
            <button>Shop</button>
        </a>
    `;

    card2.innerHTML = `
        <div class="compare-images">
            <img src="${providerDetails[provider2].logo}" alt="${provider2}">
        </div>
        <ul>
                <p>Best Offers </p>
            ${providerDetails[provider2].offers
                .map(
                    offer => `<li>${offer.speed}, Price: ${offer.price}</li>`
                )
                .join('')}
        </ul>
        <div class="installation-fee">
            <p>Installation Fee: ${providerDetails[provider2].installationFee}</p>
        </div>
        <div class="ratings">
            <p>Ratings: ${providerDetails[provider2].ratings} stars</p>
        </div>
        <a href="${providerDetails[provider2].link}" target="_blank">
            <button>Shop</button>
        </a>
    `;
}
