let answers = {};

// URLs des moodboards pour chaque style
const moodboardURLs = {
    'Heritage': 'https://drive.google.com/file/d/1eC9A04YDD0ETT-i9KzhPGsDBDbzdOF-B/view?usp=share_link',
    'Authentique': 'https://drive.google.com/file/d/1RPMQLN_RhoOk50wGQJHZz18KXuPsoy_A/view?usp=share_link',
    'Evasion': 'https://drive.google.com/file/d/1SySU6mXaTmiT3ATmiuow8Vvr0PxrnO_U/view?usp=share_link',
    'Modernisme': 'https://drive.google.com/file/d/1ovR-7LFBqGprWSfNonehHtHM6I528o3H/view?usp=sharing',
    'Memphis': 'https://drive.google.com/file/d/1Nf7xJ-epxFUKnVwdgdnJoOW0t0390WRL/view?usp=share_link',
    'New Antic': 'https://drive.google.com/file/d/1Oh5HSjisAb66sR4Qlngjxu4HF12pJyzw/view?usp=sharing',
    'Scandinave / Wabi Sabi': 'https://drive.google.com/file/d/1x_tVN77TsQZu0db4fUCcN-FLYUtiSIZF/view?usp=share_link',
    'Vintage': 'https://example.com/moodboards/vintage.png',
    'Art déco': 'https://drive.google.com/file/d/15mH0LBOkLesRPbKddUm3Jgnm1bqZtzvH/view?usp=share_link',
    '50’s - 70’s': 'https://drive.google.com/file/d/1WQJPFmGCSoCFksRXXku5w2jIRvIWfDG4/view?usp=sharing'
};

document.addEventListener("DOMContentLoaded", () => {
    const firstStep = document.querySelector(".step.active");
    if (firstStep) {
        firstStep.classList.add("active");
    }
});

function selectOption(stepId, optionId) {
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
        const selectedOption = stepElement.querySelector(`.options img[alt='${optionId}']`);
        if (selectedOption.classList.contains('selected')) {
            selectedOption.classList.remove('selected');
            if (answers[stepId]) {
                answers[stepId] = answers[stepId].filter(opt => opt !== optionId);
            }
        } else {
            selectedOption.classList.add('selected');
            if (!answers[stepId]) {
                answers[stepId] = [];
            }
            answers[stepId].push(optionId);
        }
    }
}

function nextStep(currentStepId, nextStepId) {
    const currentStep = document.getElementById(currentStepId);
    const nextStep = document.getElementById(nextStepId);
    if (currentStep && nextStep) {
        if (answers[currentStepId] && answers[currentStepId].length > 0) {
            currentStep.classList.remove('active');
            currentStep.style.display = 'none';
            nextStep.classList.add('active');
            nextStep.style.display = 'flex';
        } else {
            alert('Veuillez sélectionner au moins une option pour continuer.');
        }
    }
}

function submitForm() {
    const emailElement = document.getElementById('email');
    const moodboardElement = document.getElementById('moodboard');
    const messageElement = document.getElementById('message');
    if (emailElement) {
        const email = emailElement.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            answers['email'] = email;
            messageElement.textContent = '';

            // Logique pour déterminer le moodboard en fonction des réponses
            const moodboard = determineMoodboard(answers);
            moodboardElement.value = moodboard;

            alert('Merci pour vos réponses ! Un moodboard personnalisé vous sera envoyé par e-mail.');
        } else {
            messageElement.textContent = 'Veuillez entrer une adresse email valide.';
        }
    }
}

function determineMoodboard(answers) {
    // Compter les occurrences de chaque style
    const styleCounts = {};
    for (let step in answers) {
        if (step !== 'email') {
            answers[step].forEach(option => {
                if (!styleCounts[option]) {
                    styleCounts[option] = 0;
                }
                styleCounts[option]++;
            });
        }
    }

    // Trouver le style avec le plus grand nombre d'occurrences
    let maxCount = 0;
    let dominantStyle = '';
    for (let style in styleCounts) {
        if (styleCounts[style] > maxCount) {
            maxCount = styleCounts[style];
            dominantStyle = style;
        }
    }

    // Retourner le lien vers le moodboard correspondant au style dominant
    return `Votre style de décoration est : ${dominantStyle}\nVoici votre moodboard : ${moodboardURLs[dominantStyle]}`;
}

document.getElementById('questionnaire').addEventListener('submit', function(event) {
    submitForm();
});
