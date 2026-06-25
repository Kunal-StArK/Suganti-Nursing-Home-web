// Real-time Bill Calculations Matrix
function calculateTotalBill() {
    const patientName = document.getElementById('billPatientName').value || "-------";
    const doctorName = document.getElementById('billDoctorName').value || "-------";
    
    const consultation = parseFloat(document.getElementById('feeConsultation').value) || 0;
    const room = parseFloat(document.getElementById('feeRoom').value) || 0;
    const medicine = parseFloat(document.getElementById('feeMedicine').value) || 0;
    const lab = parseFloat(document.getElementById('feeLab').value) || 0;
    const discountPercent = parseFloat(document.getElementById('feeDiscount').value) || 0;

    const subTotal = consultation + room + medicine + lab;
    const discountAmount = (subTotal * discountPercent) / 100;
    const grandTotal = subTotal - discountAmount;

    // Mapping inputs calculations live to the bill slip DOM
    document.getElementById('lblPatientName').innerText = patientName;
    document.getElementById('lblDoctorName').innerText = doctorName;
    document.getElementById('outConsultation').innerText = consultation.toFixed(2);
    document.getElementById('outRoom').innerText = room.toFixed(2);
    document.getElementById('outMedicine').innerText = medicine.toFixed(2);
    document.getElementById('outLab').innerText = lab.toFixed(2);
    document.getElementById('outDiscount').innerText = `-${discountAmount.toFixed(2)}`;
    document.getElementById('outTotal').innerText = `₹${grandTotal.toFixed(2)}`;
}

// Window actions initialization loader
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toLocaleDateString('en-IN');
    const randomInvoice = Math.floor(10000 + Math.random() * 90000);
    
    const dateEl = document.getElementById('receiptDate');
    const invEl = document.getElementById('receiptInvoiceNo');
    const formEl = document.getElementById('billingCalculatorForm');
    const printBtnEl = document.getElementById('printBtn');

    // Verification check for billing block availability
    if (dateEl && invEl && formEl && printBtnEl) {
        dateEl.innerText = today;
        invEl.innerText = `LC-INV-${randomInvoice}`;
        
        // Active runtime input event listener trigger
        formEl.addEventListener('input', calculateTotalBill);
        
        // Print action click event handler
        printBtnEl.addEventListener('click', () => {
            const nameInput = document.getElementById('billPatientName').value;
            if (!nameInput) {
                alert("⚠️ Please enter a Patient Name before printing!");
                return;
            }
            window.print();
        });
    }
});