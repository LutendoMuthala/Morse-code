function lettersToMorseCode(text) {
    // Handle empty input 
    if (!text || typeof text !== 'string') {
        return '';
    }
    
    // Convert to uppercase for consistency 
    const upperText = text.toUpperCase();
    const morseArray = [];
    
    // Process each character like R2-D2 scanning for threats
    for (let char of upperText) {
        if (char === ' ') {
            // Space becomes separator to maintain word boundaries for clarity
            morseArray.push('/');
        } else if (MORSE_CODE_MAP[char]) {
            // Convert known characters to morse
            morseArray.push(MORSE_CODE_MAP[char]);
        } else {
            // Unknown characters get ignored - R2-D2 filters out noise
            console.warn(` R2-D2 Warning: Unknown character '${char}' ignored`);
        }
    }
    
    // Join with spaces - proper droid formatting
    return morseArray.join(' ');
}

function morseCodeToLetters(morseCode) {
    // Handle empty input - silence in space
    if (!morseCode || typeof morseCode !== 'string') {
        return '';
    }
    
    // Clean up the input - remove extra spaces like a good droid
    const cleanMorse = morseCode.trim();
    if (!cleanMorse) return '';
    
    // Split by word separators (/) first - Imperial messages have structure
    const words = cleanMorse.split(' / ');
    const decodedWords = [];
    
    for (let word of words) {
        if (!word.trim()) continue; // Skip empty words
        
        // Split each word by spaces to get individual morse characters
        const morseChars = word.trim().split(' ');
        const decodedChars = [];
        
        for (let morseChar of morseChars) {
            if (morseChar && REVERSE_MORSE_MAP[morseChar]) {
                decodedChars.push(REVERSE_MORSE_MAP[morseChar]);
            } else if (morseChar) {
                // Unknown morse code - R2-D2 beeps in confusion
                console.warn(`🤖 R2-D2 Confusion: Unknown morse code '${morseChar}'`);
                decodedChars.push('?'); // Placeholder for unknown codes
            }
        }
        
        if (decodedChars.length > 0) {
            decodedWords.push(decodedChars.join(''));
        }
    }
    
    return decodedWords.join(' ');
}
