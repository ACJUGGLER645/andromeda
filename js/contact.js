document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const lastname = document.getElementById("lastname").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("http://localhost:8000/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        lastname,
                        email,
                        message,
                    }),
                });

                if (response.ok) {
                    // Mostrar Popup
                    const popup = document.getElementById("success-popup");
                    if (popup) popup.classList.add("show");

                    contactForm.reset();
                } else {
                    throw new Error("Error en el servidor");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al enviar el mensaje. Por favor intenta nuevamente.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

function closePopup() {
    const popup = document.getElementById("success-popup");
    if (popup) popup.classList.remove("show");
}
