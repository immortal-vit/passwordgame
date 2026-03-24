// CharacterSequenceValidator.tsx
export interface SequenceResult {
    isValid: boolean;
    validSequences: number;
}

export class CharacterSequenceValidator {
    static validate(password: string) {
        let isValid = false;

        for (let i = 0; i <= password.length - 4; i++) {
            const slice = password.slice(i, i + 4);

            const hasLower = /[a-z]/.test(slice);
            const hasUpper = /[A-Z]/.test(slice);
            const hasNumber = /\d/.test(slice);
            const hasSpecial = /[!@#$%^&*]/.test(slice);

            // Kontrola, že každý znak ve slice je unikátní
            const chars = slice.split("");
            const allUnique = chars[0] !== chars[1] &&
                chars[0] !== chars[2] &&
                chars[0] !== chars[3] &&
                chars[1] !== chars[2] &&
                chars[1] !== chars[3] &&
                chars[2] !== chars[3];

            if (hasLower && hasUpper && hasNumber && hasSpecial && allUnique) {
                isValid = true;
                break; // stačí jedna sekvence
            }
        }

        return {
            isValid,
        };
    }
}