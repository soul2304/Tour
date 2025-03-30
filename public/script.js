const signinButton = document.getElementById('signin-button');
const signupButton = document.getElementById('signup-button');
const authSection = document.getElementById('auth-section');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const authSubmit = document.getElementById('auth-submit');
const browseToursTab = document.getElementById('browse-tours-tab');
const contactUsTab = document.getElementById('contact-us-tab');
const userSection = document.getElementById('user-section');
const contactSection = document.getElementById('contact-section');
const tourList = document.getElementById('tour-list');



// Admin credentials
const adminCredentials = {
    email: "admin@gmail.com",
    password: "admin123"
};

// Replace with Render API URL
const API_BASE_URL = 'https://tour-h3gn.onrender.com';

// Toggle authentication section for Sign In
signinButton.addEventListener('click', () => {
    console.log('Sign In button clicked'); // Debug log
    if (authSection.style.display === 'none' || authTitle.textContent !== "Login") {
        authTitle.textContent = "Login";
        authSubmit.textContent = "Login";
        authSection.style.display = 'block';
    } else {
        authSection.style.display = 'none';
    }
});

// Toggle authentication section for Sign Up
signupButton.addEventListener('click', () => {
    console.log('Sign Up button clicked'); // Debug log
    if (authSection.style.display === 'none' || authTitle.textContent !== "Sign Up") {
        authTitle.textContent = "Sign Up";
        authSubmit.textContent = "Sign Up";
        authSection.style.display = 'block';
    } else {
        authSection.style.display = 'none';
    }
});

// Handle form submission
authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Auth form submitted'); // Debug log
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (authSubmit.textContent === "Login") {
        if (email === adminCredentials.email && password === adminCredentials.password) {
            console.log('Admin login successful'); // Debug log
            window.location.href = "admin.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    } else if (authSubmit.textContent === "Sign Up") {
        alert("Sign-up successful! You can now log in.");
        authSection.style.display = 'none';
    }
});

// Toggle visibility of Browse Tours section
browseToursTab.addEventListener('click', async () => {
    console.log('Browse Tours tab clicked'); // Debug log
    userSection.style.display = userSection.style.display === 'none' || userSection.style.display === '' ? 'block' : 'none';
    try {
        const response = await fetch(`${API_BASE_URL}/api/tours`);
        const tours = await response.json();
        tourList.innerHTML = tours.map(tour => `<li>${tour.name} - $${tour.price}</li>`).join('');
    } catch (error) {
        console.error('Error fetching tours:', error);
    }
});

// Toggle visibility of Contact Us section
contactUsTab.addEventListener('click', () => {
    console.log('Contact Us tab clicked'); // Debug log
    contactSection.style.display = contactSection.style.display === 'none' || contactSection.style.display === '' ? 'block' : 'none';
});

// Back button functionality for the admin panel
const backButton = document.getElementById('back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}

// Inspect changes button functionality
const inspectChangesButton = document.getElementById('inspect-changes-button');
if (inspectChangesButton) {
    inspectChangesButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin-changes`);
            const changes = await response.json();
            if (changes.length === 0) {
                alert('No changes made yet.');
            } else {
                const changesList = changes.map(change => `${change.timestamp}: ${change.change}`).join('\n');
                alert(`Admin Changes:\n${changesList}`);
            }
        } catch (error) {
            console.error('Error fetching admin changes:', error);
            alert('Failed to fetch admin changes.');
        }
    });
}

// Save admin changes to MongoDB
const saveAdminChange = async (change) => {
    try {
        await fetch(`${API_BASE_URL}/api/admin-changes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ change })
        });
        console.log('Admin change saved:', change);
    } catch (error) {
        console.error('Error saving admin change:', error);
    }
};

// Example usage of saveAdminChange
// saveAdminChange("Added a new tour: Tour Name");
