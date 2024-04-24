const addPromoBtn = document.querySelector(".add-promo"),
    addPromoContainer = document.querySelector(".add-promo-wrapper"),
    addPromoCloseBtn = document.querySelector(".off"),
    addPromoTitle = document.querySelector(".promo-name"),
    addPromoPercentage = document.querySelector(".promoPercentage"),
    addPromoSubmit = document.querySelector(".add-promo-btn"),
    promosContainer = document.querySelector(".promos"),
    modal = document.querySelector(".modal");

    let promosArr = [];

addPromoBtn.addEventListener("click", () => {
    addPromoContainer.classList.toggle("active");
})

addPromoCloseBtn.addEventListener("click", ()=>{
    addPromoContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    //if click outside
    if (e.target != addPromoBtn && !addPromoContainer.contains(e.target)) {
        addPromoContainer.classList.remove("active");
    }
})

addPromoTitle.addEventListener("input", (e) => {
    addPromoTitle.value - addPromoTitle.value.slice(0, 50);
});


function updateEvents() {
    let promos = "";

    promosArr.forEach((promo) => {
            //then show event on document
           // promoObj.promos.forEach((promo) => {
                promos +=
                    `<div class="promo">
                        <div class="title">
                            <i class="fas fa-circle"></i>
                            <h3 class="promo-title">${promo.title}</h3>
                        </div>
                        <div class="promo-info">
                            <div class="promo-percentage">
                                <span>${promo.amount}</span>
                            </div>
                        </div>
                    </div>`;
          // });
        });

    //if nothing found 
    if (promos == "") {
        promos =
            `<div class="no-promotions">
             <h3>No Promotions</h3>
         </div>`;
    }
    promosContainer.innerHTML = promos;
    //save events when new one added
    savePromo();
}


//function to add events
    addPromoSubmit.addEventListener("click", () => {
        const promoTitle = addPromoTitle.value;
        const promoPercent = addPromoPercentage.value;


        if (promoTitle == "" || promoPercent == "") {
            alert("Please fill in all the fields");
            return;
        }

        const newPromo = {
            title: promoTitle,
            amount: promoPercent + "%"
        };
        
        promosArr.push(newPromo);
        //remove active from add event form
        addPromoContainer.classList.remove("active")
        //clear the fileds
        addPromoTitle.value = "";
        addPromoPercentage.value ="";
        
        //show current added event
        updateEvents();
    });

    
    function populatePromoModal(promo) {
        const modalTitle = document.querySelector(".modal-title");
        const modalPercent = document.querySelector(".modal-percentage");
    
        modalTitle.textContent = promo.title;
        modalPercent.textContent = promo.amount;
    
        // Show the modal
        modal.style.display = 'block';
    }
    
    // Update the event listener to call the populatePromoModal function
    promosContainer.addEventListener("click", (e) => {
        console.log(e.target.classList)
        if (e.target.classList.contains("promo")) {
            const promoCode = e.target.querySelector(".promo-title").textContent;
            const promo = promosArr.find(promo => promo.title === promoCode);
            if (promo) {
                
                populatePromoModal(promo);
            }
        }
    });    

    function removeListing() {
        const modalTitle = document.querySelector(".modal-title").textContent;
    
        promosArr = promosArr.filter(promo => promo.title !== modalTitle);
    
        // Update the promos display
        updateEvents();
    
        // Close the modal
        modal.style.display = 'none';
    }    
    

    updateEvents();
    getPromo();