import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../firebase";
import "../styles/pages/Settings.css";

export default function Settings() {
    const user = auth.currentUser;

    const [message, setMessage] = useState("");

    /* Send password reset email */

    const handlePasswordReset = async () => {
        if (!user?.email) return;

        try {
            await sendPasswordResetEmail(auth, user.email);

            setMessage(
                "A password reset email has been sent to your email address."
            );
        } catch (error) {
            console.error(error);
            setMessage(
                "We couldn't send the password reset email. Please try again."
            );
        }
    };

    const handleDeleteAccount = async () => {
        setMessage(
            "Account deletion is not implemented in this demo. Please contact support for assistance."
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="settings-page">

            {/* Settings Header */}

            <section className="settings-header">
                <div className="settings-header-inner">

                    <span className="section-label">
                        Voices in BOLD / Settings
                    </span>

                    <h1>
                        Account
                        <em>settings.</em>
                    </h1>

                    <p>
                        Manage your account and security preferences.
                    </p>

                </div>
            </section>


            {/* Settings Content */}

            <section className="settings-section">

                <div className="settings-card">

                    <div className="settings-card-header">
                        <span className="settings-number">
                            01
                        </span>

                        <div>
                            <h2>Account</h2>
                            <p>
                                Your basic account information.
                            </p>
                        </div>
                    </div>


                    <div className="settings-row">

                        <div>
                            <strong>Email address</strong>
                            <span>{user.email}</span>
                        </div>

                    </div>

                </div>


                <div className="settings-card">

                    <div className="settings-card-header">
                        <span className="settings-number">
                            02
                        </span>

                        <div>
                            <h2>Security</h2>
                            <p>
                                Manage your account security.
                            </p>
                        </div>
                    </div>


                    <div className="settings-row">

                        <div>
                            <strong>Password</strong>
                            <span>
                                Send yourself a password reset email.
                            </span>
                        </div>

                        <button
                            type="button"
                            className="settings-button"
                            onClick={handlePasswordReset}
                        >
                            Reset password
                            <span>↗</span>
                        </button>

                    </div>

                    <div className="settings-row">

                        <div>
                            <strong>Delete Account</strong>
                            <span>
                                Permanently delete your account and all
                                associated data. This action cannot be undone.
                            </span>
                            <strong className="settings-danger">
                                Warning: This action is irreversible. Proceed with caution.
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="settings-button"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                            <span>↗</span>
                        </button>

                    </div>

                    {message && (
                        <p className="settings-message">
                            {message}
                        </p>
                    )}

                </div>

            </section>

        </main>
    );
}