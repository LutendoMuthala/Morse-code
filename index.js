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
                console.warn(` R2-D2 Confusion: Unknown morse code '${morseChar}'`);
                decodedChars.push('?'); // Placeholder for unknown codes
            }
        }
        
        if (decodedChars.length > 0) {
            decodedWords.push(decodedChars.join(''));
        }
    }
    
    return decodedWords.join(' ');
}

function morseCodeCLI() {
    console.log(' R2-D2 MORSE CODE TRANSLATOR ACTIVATED');
    console.log('═══════════════════════════════════════════════');
    console.log('Welcome to the Rebel Alliance Communication Center!');
    console.log('');
    console.log('Available Commands:');
    console.log('📤 encode <message> - Convert text to morse code');
    console.log('📥 decode <morse>   - Convert morse code to text');
    console.log('🧪 test            - Run diagnostic tests');
    console.log('❌ exit            - Power down translator');
    console.log('');
    
    // Note: In a real CLI implementation, you'd use readline or similar
    // This is a demonstration of the interface structure
    console.log('💡 Example Usage:');
    console.log('> encode Hello R2-D2!');
    console.log('> decode .... . .-.. .-.. --- / .-. ..--- -....- -.. ..--- -.-.--');
}

// Ensures all systems are operational before critical missions
function runDiagnosticTests() {
    console.log('🔧 R2-D2 DIAGNOSTIC MODE ACTIVATED 🔧');
    console.log('Running system checks...');
    
    const tests = [
        {
            name: 'Basic Encoding Test',
            input: 'HELLO',
            expected: '.... . .-.. .-.. ---',
            func: lettersToMorseCode
        },
        {
            name: 'Basic Decoding Test',
            input: '.... . .-.. .-.. ---',
            expected: 'HELLO',
            func: morseCodeToLetters
        },
        {
            name: 'Obi-Wan Emergency Test',
            input: 'Help me Obi-Wan!',
            expected: '.... . .-.. .--. / -- . / --- -... .. -....- .-- .- -. -.-.--',
            func: lettersToMorseCode
        },
        {
            name: 'Coffee Crisis Test',
            input: '.. / .- -- / .-. ..- -. -. .. -. --. / --- ..- - / --- ..-. / -.-. --- ..-. ..-. . .',
            expected: 'I AM RUNNING OUT OF COFFEE',
            func: morseCodeToLetters
        },
        {
            name: 'Empty Input Test',
            input: '',
            expected: '',
            func: lettersToMorseCode
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    tests.forEach(test => {
        try {
            const result = test.func(test.input);
            if (result === test.expected) {
                console.log(`✅ ${test.name}: PASSED`);
                passed++;
            } else {
                console.log(`❌ ${test.name}: FAILED`);
                console.log(`   Expected: "${test.expected}"`);
                console.log(`   Got:      "${result}"`);
                failed++;
            }
        } catch (error) {
            console.log(`💥 ${test.name}: ERROR - ${error.message}`);
            failed++;
        }
    });
    
    console.log('');
    console.log(` Test Results: ${passed} passed, ${failed} failed`);
    console.log(failed === 0 ? ' ALL SYSTEMS OPERATIONAL! R2-D2 IS READY FOR DUTY!' : '⚠️ Some systems need attention!');
}


console.log(' R2-D2 Morse Translator Demo ');
console.log('═══════════════════════════════════');

// Test the examples 
console.log('📤 ENCODING TESTS:');
console.log(`"Help me Obi-Wan!" → "${lettersToMorseCode('Help me Obi-Wan!')}"`);
console.log(`"I like you" → "${lettersToMorseCode('I like you')}"`);
console.log(`"Darth Vader is Luke's father" → "${lettersToMorseCode('Darth Vader is Luke\'s father')}"`);

console.log('\n DECODING TESTS:');
console.log(`Intercepted message → "${morseCodeToLetters('.... .- ...- . / -.-- --- ..- / ... . . -. / .-. --- -... --- -.. ..--..')}"`);
console.log(`Coffee emergency → "${morseCodeToLetters('.. / .- -- / .-. ..- -. -. .. -. --. / --- ..- - / --- ..-. / -.-. --- ..-. ..-. . .')}"`);

// Run diagnostics
console.log('\n RUNNING DIAGNOSTICS...');
runDiagnosticTests();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lettersToMorseCode,
        morseCodeToLetters,
        runDiagnosticTests,
        morseCodeCLI
    };
}

// available globally for browser use
if (typeof window !== 'undefined') {
    window.R2D2Translator = {
        lettersToMorseCode,
        morseCodeToLetters,
        runDiagnosticTests,
        morseCodeCLI
    };
}

console.log('\n R2-D2 Translator loaded successfully!');
console.log('May the Force be with your secret communications! ');