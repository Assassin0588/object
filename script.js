// =====================footer===================
let toDay = new Date().getFullYear();
document.getElementById("footer").innerHTML = `&copy; ${toDay} All Rights Reserved`;

// =====================output clear=============
let outClear = () => {
    document.getElementById("output").innerHTML = "";
}

// ======================validation regex===============
const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Global user array to store multiple users dynamically
let users = [];

// Helper function to extract and validate form data
function getFormData() {
    let firstName = document.getElementById("firstName").value.trim();
    if (firstName.length < 3 || !firstName) {
        toaste("Please enter a valid first name (at least 3 characters)");
        return null;
    }
    let lastName = document.getElementById("lastName").value.trim();
    if (lastName.length < 3 || !lastName) {
        toaste("Please enter a valid last name (at least 3 characters)");
        return null;
    }
    let mail = document.getElementById("email").value.trim();
    if (!emailTest.test(mail)) {
        toaste("Please enter a valid email address");
        return null;
    }
    let date = document.getElementById("dateTime").value.trim();
    if (!date) {
        toaste("Please select a date & time");
        return null;
    }
    let id = Math.random().toString(36).slice(3, 13);
    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: mail,
        date: date,
        dataCreated: new Date().getTime()
    };
}

// Helper function to clear form inputs after successful user creation
function clearForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dateTime").value = "";
}

// Render responsive dynamic user table
function renderTable() {
    if (users.length === 0) {
        document.getElementById("output").innerHTML = `
            <div class="text-center py-8 text-slate-500 font-medium">
                No users added yet. Fill out the form above and click "Add User".
            </div>
        `;
        return;
    }

    let rowsHtml = users.map((user, index) => `
        <tr class="hover:bg-slate-50 transition border-b border-slate-200">
            <td class="px-4 py-3 font-semibold text-slate-500">${index + 1}</td>
            <td class="px-4 py-3 font-semibold text-slate-800">${user.firstName}</td>
            <td class="px-4 py-3 text-slate-700">${user.lastName}</td>
            <td class="px-4 py-3 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block my-1 border border-emerald-200">${user.id}</td>
            <td class="px-4 py-3 text-slate-600">${user.email}</td>
            <td class="px-4 py-3 text-slate-500 text-xs">${user.date}</td>
        </tr>
    `).join("");

    document.getElementById("output").innerHTML = `
        <div class="w-full overflow-x-auto rounded-lg border border-slate-300 shadow-sm bg-white my-2">
            <table class="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead class="bg-slate-800 text-white text-xs uppercase tracking-wider">
                    <tr>
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">First Name</th>
                        <th class="px-4 py-3">Last Name</th>
                        <th class="px-4 py-3">User ID</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Date</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}

// =======================add user================
function addUser() {
    let newUser = getFormData();
    if (!newUser) return;

    users.push(newUser);
    toasts("User added successfully!");
    console.log("Added User:", newUser);
    console.log("All Users List:", users);
    clearForm();
    renderTable();
}

// =======================show table================
let showTable = () => {
    let firstName = document.getElementById("firstName").value.trim();
    if (firstName) {
        let newUser = getFormData();
        if (newUser) {
            users.push(newUser);
            toasts("User added & table displayed!");
            clearForm();
        }
    } else if (users.length > 0) {
        toasts("Table displayed successfully");
    }
    renderTable();
}

// =======================show user in console=========================
let showUserInConsole = () => {
    let firstName = document.getElementById("firstName").value.trim();
    if (firstName) {
        let newUser = getFormData();
        if (newUser) {
            users.push(newUser);
            clearForm();
        }
    }
    if (users.length === 0) {
        toaste("No users to display in console. Please add a user first.");
        return;
    }
    toasts("Users successfully displayed in console");
    console.log("Users List:", users);
}

// =======================show image=========================
let showImage = () => {
    document.getElementById("output").innerHTML = "<img src='https://i.pinimg.com/736x/b6/7e/9b/b67e9be3bb94b6b84027836dfbc71782.jpg' class='max-w-full h-auto rounded-lg shadow-md'>";
    toasts("Image displayed successfully");
}

// =============================toastify================
let toasts = (msg) => {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #059669, #10b981)",
        },
    }).showToast();
}

let toaste = (msg) => {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #dc2626, #ef4444)",
        },
    }).showToast();
}
