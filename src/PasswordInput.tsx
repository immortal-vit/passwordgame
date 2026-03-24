import { useState } from "react";

interface PasswordInputProps {
    setPassword: (password: string) => void;
    value: string; // ✅ přidáno
}

const PasswordInput = ({ setPassword, value }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Napište sem heslo"
                value={value} // ✅ řízený input
                onChange={handleChange}
                className="form-control text-pole-custom"
            />

            <div className="text-center mt-2">
                <button
                    className="btn btn-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Skrýt" : "Zobrazit"}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;