var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var downloadPDFButton = document.getElementById('download-pdf');
var shareSection = document.getElementById('share-section');
var shareableLinkInput = document.getElementById('shareable-link');
var copyLinkButton = document.getElementById('copy-link');
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var picture = (_a = document.getElementById('picture').files) === null || _a === void 0 ? void 0 : _a[0];
    var pictureURL = '';
    if (picture) {
        pictureURL = URL.createObjectURL(picture);
    }
    var resumeHTML = "\n        <h2><b>Resume</b></h2>\n        ".concat(pictureURL ? "<img src=\"".concat(pictureURL, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\">") : '', "\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span class=\"editable\" data-field=\"name\">").concat(name, "</span></p>\n        <p><b>Email:</b> <span class=\"editable\" data-field=\"email\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span class=\"editable\" data-field=\"phone\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p class=\"editable\" data-field=\"education\">").concat(education, "</p>\n\n        <h3>Experience</h3>\n        <p class=\"editable\" data-field=\"experience\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p class=\"editable\" data-field=\"skills\">").concat(skills, "</p>\n    ");
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
        downloadPDFButton.style.display = 'block'; // Show the download button
        shareSection.style.display = 'block'; // Show the share section
        // Generate unique URL
        var baseURL = window.location.origin;
        var uniqueURL = "".concat(baseURL, "/resume/").concat(username);
        shareableLinkInput.value = uniqueURL;
        // Update browser history
        window.history.pushState({}, '', uniqueURL);
    }
    else {
        console.log('The resume display element is missing');
    }
});
// Copy link to clipboard
copyLinkButton.addEventListener('click', function () {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});
// Download as PDF
downloadPDFButton.addEventListener('click', function () {
    var element = document.getElementById('resume-display');
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf');
    }
});
