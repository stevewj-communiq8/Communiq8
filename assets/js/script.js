document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Netlify Forms handles the contact form submission automatically.
    // The "data-netlify=true" attribute on the form enables this.
    // A success message will be shown upon submission via a URL parameter.
    
    // Show success message if redirected back from Netlify
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const responseDiv = document.getElementById('form-response');
        if (responseDiv) {
            responseDiv.textContent = 'Thank you for your enquiry! We will be in touch within 24 hours.';
            responseDiv.className = 'success';
            responseDiv.classList.remove('hidden');
        }
    }
});