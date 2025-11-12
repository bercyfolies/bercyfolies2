document.addEventListener('DOMContentLoaded', function() {
    const forgotPassword = document.getElementById('forgotPassword');
    const modal = document.getElementById('forgotPasswordModal');
    const sendWhatsApp = document.getElementById('sendWhatsApp');
    const cancelForgot = document.getElementById('cancelForgot');

    // Ouvrir la modale
    forgotPassword.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Fermer la modale
    cancelForgot.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Envoi du mot de passe provisoire (simulation)
    sendWhatsApp.addEventListener('click', function() {
        const phoneNumber = document.getElementById('phoneNumber').value;
        if (phoneNumber) {
            alert(`Un mot de passe provisoire a été envoyé par WhatsApp au numéro : ${phoneNumber}`);
            modal.style.display = 'none';
        } else {
            alert('Veuillez entrer un numéro de téléphone.');
        }
    });
});
