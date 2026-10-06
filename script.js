const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwzUrnjKdj1rh--LqHjBZZBI60xaoZrEuOuy5P4PuljnDnjJN4KZ-6i26S6dvNCt2VU/exec";

const BUSINESS_ID = "cafe001";

let selectedRating = 0;


// =========================
// STAR RATING
// =========================

const stars = document.querySelectorAll(".stars button");
const ratingText = document.getElementById("ratingText");

stars.forEach((star) => {

    star.addEventListener("click", () => {

        selectedRating = Number(star.dataset.rating);

        stars.forEach((item) => {

            const value = Number(item.dataset.rating);

            item.classList.toggle(
                "selected",
                value <= selectedRating
            );

        });

        ratingText.textContent =
            selectedRating === 1
                ? "1 star selected"
                : `${selectedRating} stars selected`;

    });

});


// =========================
// FORM
// =========================

const form = document.getElementById("feedbackForm");

const submitBtn =
    document.getElementById("submitBtn");

const successBox =
    document.getElementById("successBox");

const googleReviewBtn =
    document.getElementById("googleReviewBtn");

const instagramBtn =
    document.getElementById("instagramBtn");


// =========================
// SUBMIT
// =========================

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    // Rating is required
    if (selectedRating === 0) {

        ratingText.textContent =
            "Please select a rating first.";

        return;
    }


    const name =
        document.getElementById("name").value.trim();

    const feedback =
        document.getElementById("feedback").value.trim();


    submitBtn.disabled = true;

    submitBtn.textContent = "Submitting...";


    const data = {

        businessId: BUSINESS_ID,

        rating: selectedRating,

        name: name,

        feedback: feedback

    };


    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify(data)

        });


        if (!response.ok) {
            throw new Error("Submission failed");
        }


        // Hide form
        form.style.display = "none";

        // Hide rating card
        document.querySelector(".rating-card").style.display = "none";


        // =========================
        // SUCCESS MESSAGE
        // =========================

        const successTitle =
            successBox.querySelector("h2");

        const successText =
            successBox.querySelector("p");


        if (selectedRating >= 3) {

            // 3, 4 or 5 stars

            successTitle.textContent =
                "Thank you!";

            successText.textContent =
                "We're glad you had a good experience. Would you like to share it on Google?";

            googleReviewBtn.style.display ="block";

            instagramBtn.style.display ="block";


        } else {

            // 1 or 2 stars

            successTitle.textContent =
                "Thank you for your feedback.";

            successText.textContent =
                "Your honest feedback helps us improve our experience for everyone.";

            googleReviewBtn.style.display ="none";

            instagramBtn.style.display ="none";

        }


        successBox.style.display ="block";


        // Scroll smoothly to success message
        successBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    } catch (error) {

        console.error(error);

        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit Feedback";

        alert(
            "Something went wrong. Please try again."
        );

    }

});