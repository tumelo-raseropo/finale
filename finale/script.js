document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sheetdb-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrength = document.querySelector('.password-strength');
    const messageDiv = document.getElementById('form-message');

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthIndicator(strength);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            showMessage('Passwords do not match!', 'error');
            return;
        }

        // Submit to SheetDB
        fetch('https://sheetdb.io/api/v1/zhfn2kuo0rdlz', {
            method: 'POST',
            body: new FormData(form),
        })
        .then(response => response.json())
        .then(data => {
            showMessage('Account created successfully!', 'success');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('Error submitting form. Please try again.', 'error');
        });
    });

    // Helper functions
    function calculatePasswordStrength(password) {
        // Simple strength calculation (0-100)
        let strength = 0;
        if (password.length >= 8) strength += 40;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        return Math.min(strength, 100);
    }

    function updateStrengthIndicator(strength) {
        let color;
        if (strength < 40) color = '#f44336';
        else if (strength < 70) color = '#ff9800';
        else color = '#4caf50';
        
        passwordStrength.style.width = strength + '%';
        passwordStrength.style.backgroundColor = color;
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message-${type}`;
        setTimeout(() => {
            messageDiv.className = 'message-hidden';
        }, 5000);
    }
});