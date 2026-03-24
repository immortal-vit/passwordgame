// PasswordTimeValidator.tsx

export interface TimeResult {
    isValid: boolean;
    timeTaken: number; // v sekundách
}

export const PasswordTimeValidator = {
    validate: (passwordCreatedAt: number | null, now: number): TimeResult => {
        if (!passwordCreatedAt) {
            return { isValid: false, timeTaken: 0 };
        }

        const timeTaken = (now - passwordCreatedAt) / 1000; // převod na sekundy
        const isValid = timeTaken >= 5; // alespoň 5 sekund
        return { isValid, timeTaken };
    }
};