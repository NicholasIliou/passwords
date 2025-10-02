// Common passwords list (top 100 most common passwords)
const commonPasswords = [
    '123456', 'password', '12345678', 'qwerty', '123456789', 'letmein', '1234567',
    'football', 'iloveyou', 'admin', 'welcome', 'monkey', 'login', 'abc123',
    'starwars', '123123', 'dragon', 'passw0rd', 'master', 'hello',
    'freedom', 'whatever', 'qazwsx', 'trustno1', '654321', 'jordan23',
    'harley', 'password123', 'secure', 'sunshine', 'shadow', '12345',
    'password1', '123qwe', 'princess', 'azerty', '696969', 'mustang',
    'michael', 'batman', 'trustme', 'superman', 'unknown', 'samsung',
    'jordan', 'asdfgh', 'hunter', 'buster', 'tiger', 'newyork',
    'charlie', 'robert', 'thomas', 'hockey', 'ranger', 'daniel',
    'starwars', 'klaster', '112233', 'george', 'computer', 'michelle',
    'jessica', 'pepper', '1111', 'zxcvbn', '555555', '11111111',
    '131313', 'freedom', '777777', 'pass', 'maggie', '159753',
    'aaaaaa', 'ginger', 'princess', 'joshua', 'cheese', 'amanda',
    'summer', 'love', 'ashley', '6969', 'nicole', 'chelsea', 'biteme',
    'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin',
    'thunder', 'taylor', 'matrix', 'william', 'corvette', 'hello',
    'martin', 'heather', 'secret', 'fucker', 'merlin', 'diamond',
    ' 1234567890', 'gfhjkm', 'hammer', 'silver', '222222', '88888888',
    'anthony', 'justin', 'test', 'bailey', 'q1w2e3r4t5', 'patrick',
    'internet', 'scooter', 'orange', '11111', 'golfer', 'cookie',
    'richard', 'samantha', 'bigdog', 'guitar', 'jackson', 'whatever',
    'mickey', 'chicken', 'sparky', 'snoopy', 'maverick', 'phoenix'
];

// Character sets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: '0Ol1I' // Characters to exclude if option is selected
};

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Password visibility toggle
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password strength checking
function checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
        notCommon: !commonPasswords.includes(password.toLowerCase())
    };
    
    // Length scoring
    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else feedback.push('Use at least 8 characters');
    
    // Character type scoring
    if (criteria.uppercase) score += 15;
    else feedback.push('Add uppercase letters');
    
    if (criteria.lowercase) score += 15;
    else feedback.push('Add lowercase letters');
    
    if (criteria.numbers) score += 15;
    else feedback.push('Add numbers');
    
    if (criteria.special) score += 20;
    else feedback.push('Add special characters');
    
    // Common password penalty
    if (criteria.notCommon) score += 10;
    else {
        score -= 20;
        feedback.push('Avoid common passwords');
    }
    
    // Bonus points for variety and length
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.7) score += 10;
    
    if (password.length >= 16) score += 10;
    
    // Determine strength level
    let strength = 'weak';
    if (score >= 85) strength = 'strong';
    else if (score >= 70) strength = 'good';
    else if (score >= 50) strength = 'fair';
    
    return { score, strength, criteria, feedback };
}

// Update password strength display
function updatePasswordStrength() {
    const password = document.getElementById('passwordInput').value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const breachCheckBtn = document.getElementById('breachCheckBtn');
    
    if (password.length === 0) {
        strengthBar.className = 'strength-fill';
        strengthText.textContent = 'Enter a password to check its strength';
        strengthText.className = 'strength-text';
        breachCheckBtn.disabled = true;
        updateCriteria({});
        hideSuggestions();
        return;
    }
    
    const result = checkPasswordStrength(password);
    
    // Update strength bar
    strengthBar.className = `strength-fill ${result.strength}`;
    strengthBar.parentElement.classList.add('pulse');
    setTimeout(() => strengthBar.parentElement.classList.remove('pulse'), 500);
    
    // Update strength text
    strengthText.textContent = `Password Strength: ${result.strength.charAt(0).toUpperCase() + result.strength.slice(1)} (${result.score}/100)`;
    strengthText.className = `strength-text ${result.strength}`;
    
    // Enable breach check button
    breachCheckBtn.disabled = false;
    
    // Update criteria display
    updateCriteria(result.criteria);
    
    // Show suggestions if needed
    if (result.feedback.length > 0) {
        showSuggestions(result.feedback);
    } else {
        hideSuggestions();
    }
}

// Update criteria display
function updateCriteria(criteria) {
    const criteriaElements = {
        lengthCriteria: criteria.length,
        uppercaseCriteria: criteria.uppercase,
        lowercaseCriteria: criteria.lowercase,
        numberCriteria: criteria.numbers,
        specialCriteria: criteria.special,
        commonCriteria: criteria.notCommon
    };
    
    Object.entries(criteriaElements).forEach(([id, met]) => {
        const element = document.getElementById(id);
        const icon = element.querySelector('i');
        
        if (met) {
            element.classList.add('met');
            element.classList.remove('not-met');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-check');
        } else {
            element.classList.add('not-met');
            element.classList.remove('met');
            icon.classList.remove('fa-check');
            icon.classList.add('fa-times');
        }
    });
}

// Show password improvement suggestions
function showSuggestions(feedback) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = `
        <h3>💡 Suggestions to improve your password:</h3>
        <ul>
            ${feedback.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    suggestionsDiv.style.display = 'block';
}

// Hide suggestions
function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

// Check password against Have I Been Pwned API
async function checkPasswordBreach() {
    const password = document.getElementById('passwordInput').value;
    const breachResult = document.getElementById('breachResult');
    const breachCheckBtn = document.getElementById('breachCheckBtn');
    
    if (!password) return;
    
    // Show loading state
    breachCheckBtn.innerHTML = '<span class="loading"></span> Checking...';
    breachCheckBtn.disabled = true;
    
    try {
        // Hash the password using SHA-1
        const encoder = new TextEncoder();
        const passwordData = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', passwordData);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        
        // Send only first 5 characters of hash to API (k-anonymity)
        const prefix = hashHex.substring(0, 5);
        const suffix = hashHex.substring(5);
        
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        
        if (!response.ok) {
            throw new Error('Network error');
        }
        
        const responseData = await response.text();
        const lines = responseData.split('\n');
        
        let breachCount = 0;
        for (const line of lines) {
            const [hashSuffix, count] = line.split(':');
            if (hashSuffix === suffix) {
                breachCount = parseInt(count);
                break;
            }
        }
        
        if (breachCount > 0) {
            breachResult.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> 
                <strong>Warning!</strong> This password has been found in ${breachCount.toLocaleString()} data breaches. 
                Consider using a different password.
            `;
            breachResult.className = 'breach-result compromised';
        } else {
            breachResult.innerHTML = `
                <i class="fas fa-shield-alt"></i> 
                <strong>Good news!</strong> This password has not been found in any known data breaches.
            `;
            breachResult.className = 'breach-result safe';
        }
        
    } catch (error) {
        breachResult.innerHTML = `
            <i class="fas fa-exclamation-circle"></i> 
            Unable to check password against breach database. Please check your internet connection.
        `;
        breachResult.className = 'breach-result error';
    }
    
    // Reset button
    breachCheckBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Check if Password was Breached';
    breachCheckBtn.disabled = false;
}

// Password generator functions
function updateLengthValue() {
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    lengthValue.textContent = lengthSlider.value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;
    
    // Validation
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        showToast('Please select at least one character type!', 'error');
        return;
    }
    
    // Build character set
    let charset = '';
    if (includeUppercase) charset += charSets.uppercase;
    if (includeLowercase) charset += charSets.lowercase;
    if (includeNumbers) charset += charSets.numbers;
    if (includeSpecial) charset += charSets.special;
    
    // Remove similar characters if requested
    if (excludeSimilar) {
        charset = charset.split('').filter(char => !charSets.similar.includes(char)).join('');
    }
    
    // Generate password
    let password = '';
    
    // Ensure at least one character from each selected type
    const requiredChars = [];
    if (includeUppercase) {
        const chars = excludeSimilar ? 
            charSets.uppercase.split('').filter(char => !charSets.similar.includes(char)) : 
            charSets.uppercase;
        requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    if (includeLowercase) {
        const chars = excludeSimilar ? 
            charSets.lowercase.split('').filter(char => !charSets.similar.includes(char)) : 
            charSets.lowercase;
        requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    if (includeNumbers) {
        const chars = excludeSimilar ? 
            charSets.numbers.split('').filter(char => !charSets.similar.includes(char)) : 
            charSets.numbers;
        requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    if (includeSpecial) {
        requiredChars.push(charSets.special[Math.floor(Math.random() * charSets.special.length)]);
    }
    
    // Fill the rest randomly
    for (let i = requiredChars.length; i < length; i++) {
        requiredChars.push(charset[Math.floor(Math.random() * charset.length)]);
    }
    
    // Shuffle the array
    for (let i = requiredChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]];
    }
    
    password = requiredChars.join('');
    
    // Display generated password
    document.getElementById('generatedPassword').value = password;
    
    // Show strength of generated password
    const strength = checkPasswordStrength(password);
    const strengthDisplay = document.getElementById('generatedStrength');
    strengthDisplay.innerHTML = `
        <strong>Generated Password Strength:</strong> 
        <span class="strength-text ${strength.strength}">
            ${strength.strength.charAt(0).toUpperCase() + strength.strength.slice(1)} (${strength.score}/100)
        </span>
    `;
    
    showToast('Password generated successfully!', 'success');
}

// Copy password to clipboard
async function copyPassword() {
    const passwordInput = document.getElementById('generatedPassword');
    const password = passwordInput.value;
    
    if (!password) {
        showToast('No password to copy!', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(password);
        showToast('Password copied to clipboard!', 'success');
        
        // Visual feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#28a745';
        }, 2000);
        
    } catch (err) {
        // Fallback for older browsers
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        showToast('Password copied to clipboard!', 'success');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Password strength checker
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.addEventListener('input', updatePasswordStrength);
    
    // Clear breach result when password changes
    passwordInput.addEventListener('input', function() {
        document.getElementById('breachResult').innerHTML = '';
    });
    
    // Generator options change
    document.querySelectorAll('#generator input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Clear generated password when options change
            document.getElementById('generatedPassword').value = '';
            document.getElementById('generatedStrength').innerHTML = '';
        });
    });
    
    // Length slider change
    document.getElementById('passwordLength').addEventListener('input', function() {
        // Clear generated password when length changes
        document.getElementById('generatedPassword').value = '';
        document.getElementById('generatedStrength').innerHTML = '';
    });
    
    // Enter key support
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !document.getElementById('breachCheckBtn').disabled) {
            checkPasswordBreach();
        }
    });
    
    // Initialize
    updatePasswordStrength();
});