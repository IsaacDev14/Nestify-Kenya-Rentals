import React, { useState } from "react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    propertyName: string;
    onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, propertyName, onPaymentSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("mpesa");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setProcessing(false);
        onPaymentSuccess();
        onClose();
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.slice(0, 2) + "/" + v.slice(2, 4);
        }
        return v;
    };

    const formatPhoneNumber = (value: string) => {
        const v = value.replace(/\D/g, "");
        if (v.startsWith("254")) {
            return v.slice(0, 12);
        } else if (v.startsWith("0")) {
            return "254" + v.slice(1, 10);
        } else if (v.startsWith("7") || v.startsWith("1")) {
            return "254" + v.slice(0, 9);
        }
        return v.slice(0, 12);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center modal-backdrop animate-fade-in p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{propertyName}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">KSh {amount.toLocaleString()}</p>
                </div>

                {/* Payment Method Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setPaymentMethod("mpesa")}
                        className={`flex-1 py-4 px-6 font-medium transition-colors ${paymentMethod === "mpesa"
                                ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            M-Pesa
                        </div>
                    </button>
                    <button
                        onClick={() => setPaymentMethod("card")}
                        className={`flex-1 py-4 px-6 font-medium transition-colors ${paymentMethod === "card"
                                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Card
                        </div>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {paymentMethod === "mpesa" ? (
                        <>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <svg className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <div className="text-sm text-green-800">
                                        <p className="font-semibold mb-1">How M-Pesa payment works:</p>
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Enter your M-Pesa phone number</li>
                                            <li>You'll receive an STK push on your phone</li>
                                            <li>Enter your M-Pesa PIN to complete</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+254</span>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                                        placeholder="712 345 678"
                                        className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Enter your Safaricom M-Pesa number</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secured by M-Pesa</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                        placeholder="123"
                                        maxLength={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="JOHN DOE"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Your payment information is secure and encrypted</span>
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full ${paymentMethod === "mpesa"
                                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                            } text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {paymentMethod === "mpesa" ? "Sending STK Push..." : "Processing..."}
                            </span>
                        ) : (
                            `Pay KSh ${amount.toLocaleString()} ${paymentMethod === "mpesa" ? "via M-Pesa" : ""}`
                        )}
                    </button>

                    <p className="text-xs text-center text-gray-500">
                        By confirming your payment, you agree to our Terms of Service
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
