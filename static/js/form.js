document.getElementById('imageUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const previewContainer = document.getElementById('imagePreviewContainer');
        const previewImage = document.getElementById('imagePreview');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            previewContainer.style.display = 'none';
            previewImage.src = '';
        }
    });

    // Form Submission and Validation Logic
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); 

        // Fetching Input Values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const website = document.getElementById('website').value.trim();
        const message = document.getElementById('message').value.trim();

        // Note: 'imageUpload' and 'fileUpload' values are ignored here, skipping validation completely.

        let isValid = true;

        // Name Validation
        if (name === '') {
            showError('nameGroup');
            isValid = false;
        } else {
            hideError('nameGroup');
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailGroup');
            isValid = false;
        } else {
            hideError('emailGroup');
        }

        // Phone Validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            showError('phoneGroup');
            isValid = false;
        } else {
            hideError('phoneGroup');
        }

        // Website Validation (Optional)
        if (website !== '') {
            const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!urlRegex.test(website)) {
                showError('webGroup');
                isValid = false;
            } else {
                hideError('webGroup');
            }
        } else {
            hideError('webGroup');
        }

        // Message Validation
        if (message === '') {
            showError('msgGroup');
            isValid = false;
        } else {
            hideError('msgGroup');
        }

        // Actions if form is valid
        if (isValid) {
            document.getElementById('successMsg').style.display = 'block';
            document.getElementById('contactForm').reset(); // Clears all inputs, including files
            document.getElementById('imagePreviewContainer').style.display = 'none'; // Clear image preview
            
            // Auto hide success alert
            setTimeout(() => {
                document.getElementById('successMsg').style.display = 'none';
            }, 4000);
        }
    });

    // Helper Functions
    function showError(groupId) {
        const group = document.getElementById(groupId);
        group.classList.add('error');
        group.querySelector('.error-message').style.display = 'block';
    }

    function hideError(groupId) {
        const group = document.getElementById(groupId);
        group.classList.remove('error');
        group.querySelector('.error-message').style.display = 'none';
    }