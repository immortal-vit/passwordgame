import { useState, useEffect, useRef } from "react";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";

function App() {
    const [password, setPassword] = useState("");
    const [passwordCreatedAt, setPasswordCreatedAt] = useState(null);
    const [now, setNow] = useState(Date.now());
    const rafRef = useRef(null);

    useEffect(() => {
        if (passwordCreatedAt) {
            const tick = () => {
                setNow(Date.now());
                rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        } else {
            setNow(Date.now());
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [passwordCreatedAt]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                console.log("Sabotáž:", action, "| heslo před:", prevPassword);
                if (action === 'add') {
                    return prevPassword + "😜";
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000);
        return () => clearInterval(sabotageInterval);
    }, []);

    const handlePasswordChange = (newPassword) => {
        if (newPassword === "") {
            setPasswordCreatedAt(null);
            setPassword("");
            return;
        }
        if (!passwordCreatedAt) {
            setPasswordCreatedAt(Date.now());
        }
        setPassword(newPassword);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12">

                    <h1 className="nadpis">Password Game</h1>

                    <div className="mb-4">
                        <PasswordInput
                            setPassword={handlePasswordChange}
                            value={password} // ✅ TOTO bylo přidáno
                        />
                    </div>

                    <PasswordStrength
                        password={password}
                        passwordCreatedAt={passwordCreatedAt}
                        now={now}
                    />

                </div>
            </div>
        </div>
    );
}

export default App;