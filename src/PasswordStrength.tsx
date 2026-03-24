// PasswordStrength.tsx
import { CharacterSequenceValidator } from "./CharacterSequenceValidator";
import { PasswordTimeValidator } from "./PasswordTimeValidator";
import CountryFlagValidator from "./CountryFlagValidator";
import { useEffect, useState, useCallback } from "react";

interface PasswordStrengthProps {
    password: string;
    passwordCreatedAt: number | null;
    now?: number;
}

const PasswordStrength = ({ password, passwordCreatedAt }: PasswordStrengthProps) => {

    const [strengthText, setStrengthText] = useState("");
    const [strengthColor, setStrengthColor] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    // Stav validace zkratky státu – aktualizovaný callbackem z CountryFlagValidator
    const [countryValid, setCountryValid] = useState(false);

    const handleCountryValidation = useCallback((isValid: boolean) => {
        setCountryValid(isValid);
    }, []);

    const evaluatePassword = () => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        const sequenceResult = CharacterSequenceValidator.validate(password);
        const timeResult = PasswordTimeValidator.validate(passwordCreatedAt, Date.now());

        // Skóre nyní obsahuje 7 kritérií (přidána validace státu)
        const score =
            Number(hasMinLength) +
            Number(hasUpperCase) +
            Number(hasNumber) +
            Number(hasSpecialChar) +
            Number(sequenceResult.isValid) +
            Number(timeResult.isValid) +
            Number(countryValid);

        if (score <= 2) {
            return { text: "Slabé", color: "red", score, maxScore: 7 };
        } else if (score <= 4) {
            return { text: "Střední", color: "orange", score, maxScore: 7 };
        } else {
            return { text: "Silné", color: "green", score, maxScore: 7 };
        }
    };

    useEffect(() => {
        const result = evaluatePassword();
        setStrengthText(result.text);
        setStrengthColor(result.color);
        setPasswordStrength(result.text);
    }, [password, passwordCreatedAt, countryValid]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    const result = evaluatePassword();

    return (
        <div>
            <h3 className="nadpis">
                Síla hesla: {strengthText}
            </h3>

            <div className="progress progress-custom-color mb-4">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                        width: `${(result.score / result.maxScore) * 100}%`,
                        backgroundColor: strengthColor
                    }}
                />
            </div>

            <ul className="list-group">
                <li className={`list-group-item list-item-custom ${password.length >= 8 ? "text-success" : "text-danger"}`}>
                    Minimálně 8 znaků
                </li>
                <li className={`list-group-item list-item-custom ${/[A-Z]/.test(password) ? "text-success" : "text-danger"}`}>
                    Obsahuje velké písmeno
                </li>
                <li className={`list-group-item list-item-custom ${/[0-9]/.test(password) ? "text-success" : "text-danger"}`}>
                    Obsahuje číslo
                </li>
                <li className={`list-group-item list-item-custom ${/[!@#$%^&*]/.test(password) ? "text-success" : "text-danger"}`}>
                    Obsahuje speciální znak (!@#$%^&*)
                </li>
                <li className={`list-group-item list-item-custom ${CharacterSequenceValidator.validate(password).isValid ? "text-success" : "text-danger"}`}>
                    Obsahuje sekvenci malý + velký + číslo + speciální
                </li>
                <li className={`list-group-item list-item-custom ${PasswordTimeValidator.validate(passwordCreatedAt, Date.now()).isValid ? "text-success" : "text-danger"}`}>
                    Heslo nebylo zadáno příliš rychle ({PasswordTimeValidator.validate(passwordCreatedAt, Date.now()).timeTaken.toFixed(1)} s)
                </li>

                {/* Nová validace – zkratka státu s vlajkou */}
                <CountryFlagValidator
                    password={password}
                    onValidationChange={handleCountryValidation}
                />
            </ul>
        </div>
    );
};

export default PasswordStrength;