document.addEventListener('DOMContentLoaded', function() {
    const forgotPassword = document.getElementById('forgotPassword');
    const modal = document.getElementById('forgotPasswordModal');
    const sendWhatsApp = document.getElementById('sendWhatsApp');
    const cancelForgot = document.getElementById('cancelForgot');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageElement = document.getElementById('message');

    // Ouvrir la modale
    forgotPassword.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Fermer la modale
    cancelForgot.addEventListener('click', function() {
        modal.style.display = 'none';
        messageElement.textContent = '';
    });

    // Envoyer le mot de passe provisoire
    sendWhatsApp.addEventListener('click', async function() {
        const phoneNumber = phoneNumberInput.value.trim();

        if (!phoneNumber) {
            messageElement.textContent = 'Veuillez entrer un numéro de téléphone.';
            messageElement.style.color = 'red';
            return;
        }

        if (!/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
            messageElement.textContent = 'Veuillez entrer un numéro de téléphone valide.';
            messageElement.style.color = 'red';
            return;
        }

        sendWhatsApp.disabled = true;
        sendWhatsApp.textContent = 'Envoi en cours...';

        try {
            const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phoneNumber }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                messageElement.textContent = data.message;
                messageElement.style.color = 'green';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 2000);
            } else {
                messageElement.textContent = data.message;
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error('Erreur:', error);
            messageElement.textContent = 'Erreur lors de l\'envoi de la demande.';
            messageElement.style.color = 'red';
        } finally {
            sendWhatsApp.disabled = false;
            sendWhatsApp.textContent = 'Envoyer';
        }
    });
});

