// ==========================================
// 1. GLOBAL INTERACTION LOGIC (ALL PAGES)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("LifeCare Hospital Interactive Script Loaded Successfully!");
    
    // Header Emergency Number Interaction
    const emergencyDiv = document.querySelector('.emergency-contact');
    if (emergencyDiv) {
        emergencyDiv.style.cursor = "pointer";
        emergencyDiv.addEventListener('click', () => {
            alert("🚨 Direct Dialing Emergency Helpline: 108. Ambulances are on standby!");
        });
    }

    // Dynamic Footer Year & Greeting based on Time
    const footerBottom = document.querySelector('.footer-bottom p');
    const hours = new Date().getHours();
    let greeting = "Welcome to LifeCare!";
    if (hours < 12) greeting = "Good Morning! Wishing you good health today.";
    else if (hours < 17) greeting = "Good Afternoon! How can we assist you today?";
    else greeting = "Good Evening! Our emergency services are active 24/7.";
    
    console.log(`Hospital System Status: ${greeting}`);
});


// ==========================================
// 2. HOME PAGE: MODAL APPOINTMENT SYSTEM
// ==========================================

// Function to open Appointment Modal Box
function bookAppointment() {
    // Check if modal already exists, if not create one dynamically
    let modal = document.getElementById('appointmentModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'appointmentModal';
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <h3>🏥 Book Medical Appointment</h3>
                <form id="hospitalForm" onsubmit="handleFormSubmit(event)">
                    <label>Patient Full Name:</label>
                    <input type="text" id="patientName" required placeholder="Enter name...">
                    
                    <label>Select Department:</label>
                    <select id="deptSelect">
                        <option value="Cardiology">Cardiology (Heart Care)</option>
                        <option value="Pediatrics">Pediatrics (Child Care)</option>
                        <option value="General Medicine">General Medicine</option>
                    </select>
                    
                    <label>Preferred Date:</label>
                    <input type="date" id="appointmentDate" required>
                    
                    <button type="submit" class="btn btn-submit">Confirm Booking</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add dynamic quick modal styling
        const style = document.createElement('style');
        style.innerHTML = `
            .custom-modal { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:2000; }
            .modal-content { background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 450px; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
            .close-btn { position: absolute; top: 10px; right: 15px; font-size: 28px; cursor: pointer; color: #aaa; }
            .close-btn:hover { color: black; }
            .modal-content h3 { margin-bottom: 20px; color: #0056b3; }
            .modal-content label { display: block; margin: 10px 0 5px; font-weight: 600; }
            .modal-content input, .modal-content select { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; }
            .btn-submit { width: 100%; background: #28a745; margin-top: 10px; }
        `;
        document.head.appendChild(style);
    }
    
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) modal.style.display = "none";
}

// IS NAYE WALE CODE KO WAHA PAR PASTE KAREIN:
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const dept = document.getElementById('deptSelect').value;
    const dateInput = document.getElementById('appointmentDate').value;
    
    // 1. Real Unique Token Generation Logic
    const deptCode = dept.substring(0, 3).toUpperCase(); 
    const currentYear = new Date().getFullYear(); // 2026
    const randomCounter = Math.floor(100 + Math.random() * 900); 
    
    const realTokenNumber = `LC-${deptCode}-${currentYear}-${randomCounter}`;

    // 2. Date format sahi karne ke liye (DD-MM-YYYY)
    const formattedDate = new Date(dateInput).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // 3. Real Token Display Alert
    alert(
        `🎉 APPOINTMENT CONFIRMED SUCCESSFULLY!\n\n` +
        `----------------------------------------\n` +
        `🎟️ TOKEN NUMBER : ${realTokenNumber}\n` +
        `----------------------------------------\n\n` +
        `👤 Patient Name  : ${name}\n` +
        `🏥 Department    : ${dept}\n` +
        `📅 Date of Visit : ${formattedDate}\n\n` +
        `👉 Please keep this token screen-shot ready at the reception counter.`
    );
    
    closeModal();
}



// ==========================================
// 3. BLOG PAGE: INTERACTIVE LIKES & READING
// ==========================================

// Add interactive interactive buttons inside Blog cards dynamically
if (window.location.pathname.includes('blog.html') || document.getElementById('blog-page')) {
    window.addEventListener('DOMContentLoaded', () => {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach((card, index) => {
            // Remove full card layout navigation click to keep controls specific
            card.removeAttribute('onclick'); 
            
            // Create container for live interaction
            const interactionDiv = document.createElement('div');
            interactionDiv.className = 'blog-interaction';
            interactionDiv.style.marginTop = "15px";
            interactionDiv.style.display = "flex";
            interactionDiv.style.gap = "15px";
            interactionDiv.style.alignItems = "center";
            
            let likeCount = Math.floor(Math.random() * 20) + 5; // Fake start count
            
            interactionDiv.innerHTML = `
                <button class="like-btn" style="padding: 5px 10px; background: #e74c3c; color:white; border:none; border-radius:3px; cursor:pointer;">❤️ Like (<span class="count">${likeCount}</span>)</button>
                <button class="share-btn" style="padding: 5px 10px; background: #3498db; color:white; border:none; border-radius:3px; cursor:pointer;">🔗 Share</button>
            `;
            
            card.appendChild(interactionDiv);
            
            // Like Handler
            const likeBtn = interactionDiv.querySelector('.like-btn');
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops main card clicks
                const countSpan = likeBtn.querySelector('.count');
                likeCount++;
                countSpan.innerText = likeCount;
                likeBtn.style.background = "#c0392b";
            });

            // Share Handler
            const shareBtn = interactionDiv.querySelector('.share-btn');
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`Link copied to clipboard for Article #${index + 1}!`);
            });
        });
    });
}