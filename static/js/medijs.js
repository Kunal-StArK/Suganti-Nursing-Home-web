 let medicineItems = [];

        // Loop to render database table rows
        function renderMedicineTable() {
            const tableBody = document.getElementById('medicineTableBody');
            tableBody.innerHTML = '';
            let subTotal = 0;

            medicineItems.forEach((item) => {
                subTotal += item.total;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="text-align: left;">${item.name}</td>
                    <td style="text-align: center;">${item.price.toFixed(2)}</td>
                    <td style="text-align: center;">${item.qty}</td>
                    <td style="text-align: right;">₹${item.total.toFixed(2)}</td>
                    <td class="hide-on-print" style="text-align: center;">
                        <button class="btn-delete" onclick="deleteMedicineItem(${item.id})">❌</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            const taxPercent = parseFloat(document.getElementById('medTax').value) || 0;
            const taxAmount = (subTotal * taxPercent) / 100;
            const grandTotal = subTotal + taxAmount;

            document.getElementById('outSubTotal').innerText = `₹${subTotal.toFixed(2)}`;
            document.getElementById('outTaxAmount').innerText = `₹${taxAmount.toFixed(2)}`;
            document.getElementById('outMedTotal').innerText = `₹${grandTotal.toFixed(2)}`;
        }

        function deleteMedicineItem(id) {
            medicineItems = medicineItems.filter(item => item.id !== id);
            renderMedicineTable();
        }

        // Setup loaders and core events monitoring
        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById('medDate').innerText = new Date().toLocaleDateString('en-IN');
            document.getElementById('medInvoiceNo').innerText = `LC-RX-${Math.floor(10000 + Math.random() * 90000)}`;

            // Patient Name tracking
            document.getElementById('medPatientName').addEventListener('input', (e) => {
                document.getElementById('lblMedPatient').innerText = e.target.value || "-------";
            });

            // Form Submit Trigger Stopper
            const entryForm = document.getElementById('medicineEntryForm');
            entryForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Stifles core page reload action instantly

                const nameEl = document.getElementById('medName');
                const priceEl = document.getElementById('medPrice');
                const qtyEl = document.getElementById('medQty');

                const name = nameEl.value;
                const price = parseFloat(priceEl.value) || 0;
                const qty = parseInt(qtyEl.value) || 1;
                const total = price * qty;

                medicineItems.push({ id: Date.now(), name, price, qty, total });

                // Reset parameters
                nameEl.value = '';
                priceEl.value = '';
                qtyEl.value = '1';

                renderMedicineTable();
            });

            document.getElementById('medTax').addEventListener('input', renderMedicineTable);

            // Print Trigger Action
            document.getElementById('printMedBtn').addEventListener('click', () => {
                const patientName = document.getElementById('medPatientName').value;
                if (!patientName) {
                    alert("⚠️ Please enter Patient Name before printing!");
                    return;
                }
                if (medicineItems.length === 0) {
                    alert("⚠️ Please add at least one medicine to the bill!");
                    return;
                }
                window.print();
            });
        });