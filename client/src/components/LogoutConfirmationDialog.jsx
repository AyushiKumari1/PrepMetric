import { useEffect, useRef } from "react";
import { LoaderCircle, LogOut, X } from "lucide-react";
import "../styles/logoutDialog.css";

function LogoutConfirmationDialog({ pending, error, triggerRef, onCancel, onConfirm }) {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);
    const pendingRef = useRef(pending);
    const onCancelRef = useRef(onCancel);

    useEffect(() => {
        pendingRef.current = pending;
        onCancelRef.current = onCancel;
    }, [onCancel, pending]);

    useEffect(() => {
        if (pending) dialogRef.current?.focus();
    }, [pending]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        cancelRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !pendingRef.current) {
                event.preventDefault();
                onCancelRef.current();
                requestAnimationFrame(() => {
                    if (triggerRef.current?.isConnected) triggerRef.current.focus();
                });
                return;
            }

            if (event.key !== "Tab") return;
            const focusable = dialogRef.current?.querySelectorAll("button:not(:disabled)");
            if (!focusable?.length) {
                event.preventDefault();
                dialogRef.current?.focus();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [triggerRef]);

    const cancel = () => {
        if (pending) return;
        onCancel();
        requestAnimationFrame(() => {
            if (triggerRef.current?.isConnected) triggerRef.current.focus();
        });
    };

    return (
        <div
            className="logout-dialog-backdrop"
            onMouseDown={(event) => { if (event.target === event.currentTarget) cancel(); }}
        >
            <section
                ref={dialogRef}
                className="logout-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
                aria-busy={pending}
                tabIndex="-1"
            >
                <button type="button" className="logout-dialog-close" onClick={cancel} disabled={pending} aria-label="Close logout confirmation">
                    <X size={17} />
                </button>
                <span className="logout-dialog-icon" aria-hidden="true"><LogOut size={21} /></span>
                <h2 id="logout-dialog-title">Log out?</h2>
                <p id="logout-dialog-description">Are you sure you want to log out of your PrepMetric account?</p>
                {error && <p className="logout-dialog-error" role="alert">{error}</p>}
                <div className="logout-dialog-actions">
                    <button type="button" className="logout-dialog-cancel" onClick={cancel} disabled={pending} ref={cancelRef}>Cancel</button>
                    <button type="button" className="logout-dialog-confirm" onClick={onConfirm} disabled={pending}>
                        {pending ? <><LoaderCircle size={15} className="logout-dialog-spinner" />Logging out…</> : <><LogOut size={15} />Yes, log out</>}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LogoutConfirmationDialog;
