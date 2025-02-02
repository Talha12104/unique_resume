import html2pdf from "html2pdf.js";

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;
const shareSection = document.getElementById('share-section') as HTMLDivElement;
const shareableLinkInput = document.getElementById('shareable-link') as HTMLInputElement;
const copyLinkButton = document.getElementById('copy-link') as HTMLButtonElement;

// Function to display resume
function displayResume(data: any) {
    const { name, email, phone, education, experience, skills, pictureURL } = data;

    const resumeHTML = `
        <h2><b>Resume</b></h2>
        ${pictureURL ? `<img src="${pictureURL}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">` : ''}
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span class="editable" data-field="name">${name}</span></p>
        <p><b>Email:</b> <span class="editable" data-field="email">${email}</span></p>
        <p><b>Phone:</b> <span class="editable" data-field="phone">${phone}</span></p>

        <h3>Education</h3>
        <p class="editable" data-field="education">${education}</p>

        <h3>Experience</h3>
        <p class="editable" data-field="experience">${experience}</p>

        <h3>Skills</h3>
        <p class="editable" data-field="skills">${skills}</p>
    `;

    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
        downloadPDFButton.style.display = 'block'; // Show the download button
        shareSection.style.display = 'block'; // Show the share section
    }
}

// Function to load resume from localStorage
function loadResume(username: string) {
    const resumeData = localStorage.getItem(username);
    if (resumeData) {
        const data = JSON.parse(resumeData);
        displayResume(data);
    } else {
        alert('Resume not found!');
    }
}

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const picture = (document.getElementById('picture') as HTMLInputElement).files?.[0];

    let pictureURL = '';
    if (picture) {
        pictureURL = URL.createObjectURL(picture);
    }

    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
        pictureURL,
    };

    // Save resume data to localStorage
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Display the resume
    displayResume(resumeData);

    // Generate unique URL
    const baseURL = window.location.origin;
    const uniqueURL = `${baseURL}/resume/${username}`;
    shareableLinkInput.value = uniqueURL;

    // Update browser history
    window.history.pushState({ username }, '', uniqueURL);
});

// Copy link to clipboard
copyLinkButton.addEventListener('click', () => {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

// Download as PDF
downloadPDFButton.addEventListener('click', () => {
    const element = document.getElementById('resume-display') as HTMLElement;
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf');
    }
});

// Handle back/forward navigation
window.onpopstate = (event: PopStateEvent) => {
    if (event.state && event.state.username) {
        loadResume(event.state.username);
    }
};

// Check URL on page load
window.onload = () => {
    const path = window.location.pathname.split('/');
    const username = path[path.length - 1];
    if (username) {
        loadResume(username);
    }
};