const addTourForm = document.getElementById('add-tour-form');
const feedback = document.getElementById('admin-feedback');
const inspectChangesButton = document.getElementById('inspect-changes-button');
const backButton = document.getElementById('back-button');

// Add Tour Form Submission
addTourForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Add Tour form submitted'); // Debug log
    const tourName = document.getElementById('tour-name').value;
    const tourDescription = document.getElementById('tour-description').value;
    const tourPrice = document.getElementById('tour-price').value;
    const tourImageUrl = document.getElementById('tour-image-url').value;

    try {
        await fetch('http://localhost:5000/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: tourName, description: tourDescription, price: parseFloat(tourPrice), imageUrl: tourImageUrl })
        });
        feedback.textContent = "Tour added successfully!";
        feedback.style.color = "green";
        addTourForm.reset();
    } catch (error) {
        feedback.textContent = `Error: ${error.message}`;
        feedback.style.color = "red";
    }
});

// Inspect Changes Button
inspectChangesButton.addEventListener('click', async () => {
    console.log('Inspect Changes button clicked'); // Debug log
    try {
        const response = await fetch('http://localhost:5000/api/admin-changes');
        const changes = await response.json();
        alert(changes.map(change => `${new Date(change.timestamp).toLocaleString()}: ${change.change}`).join('\n'));
    } catch (error) {
        console.error('Error fetching admin changes:', error);
        alert('Failed to fetch admin changes.');
    }
});

// Back Button
backButton.addEventListener('click', () => {
    console.log('Back button clicked'); // Debug log
    window.location.href = "index.html";
});
