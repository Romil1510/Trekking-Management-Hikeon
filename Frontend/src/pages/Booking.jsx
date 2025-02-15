import { Calendar, Clock, MapPin, Mountain, Phone, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrekById } from "../data/allTreks";

const Booking = () => {
  const { trekId } = useParams();
  const navigate = useNavigate();
  const [trek, setTrek] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [persons, setPersons] = useState([{ name: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showMobileVerification, setShowMobileVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const fetchTrek = async () => {
      const trekData = await getTrekById(trekId);
      if (!trekData) {
        navigate("/explore");
      } else {
        setTrek(trekData);
      }
    };
    fetchTrek();
  }, [trekId, navigate]);

  useEffect(() => {
    setPersons(
      Array(numberOfPersons)
        .fill()
        .map((_, i) => persons[i] || { name: "" })
    );
  }, [numberOfPersons]);

  const handlePersonNameChange = (index, name) => {
    const newPersons = [...persons];
    newPersons[index].name = name;
    setPersons(newPersons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMobileVerification(true);
  };

  const handleMobileVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/verify/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Verification code sent to your mobile number!");
      } else {
        throw new Error(data.message || "Failed to send verification code");
      }
    } catch (error) {
      setError(error.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/verify/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber, code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setShowPayment(true);
        setShowMobileVerification(false);
      } else {
        throw new Error(data.message || "Invalid verification code");
      }
    } catch (error) {
      setError(error.message || "Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  const validateCard = () => {
    const cardRegex = /^[0-9]{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardRegex.test(cardNumber.replace(/ /g, ""))) {
      setPaymentError("Invalid card number (use 16 digits)");
      return false;
    }

    if (!expiryRegex.test(expiry)) {
      setPaymentError("Invalid expiry date (MM/YY)");
      return false;
    }

    if (!cvvRegex.test(cvv)) {
      setPaymentError("Invalid CVV (3-4 digits)");
      return false;
    }

    if (!cardholderName.trim()) {
      setPaymentError("Cardholder name is required");
      return false;
    }

    setPaymentError("");
    return true;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateCard()) return;

    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: `/booking/${trekId}` } });
      return;
    }

    try {
      const paymentResult = {
        id: `mock_pay_${Math.random().toString(36).substring(7)}`,
        cardLast4: cardNumber.slice(-4),
      };

      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trekId,
          date: selectedDate,
          numberOfPersons,
          persons: persons.map((p) => p.name),
          paymentId: paymentResult.id,
          mobileNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful! A confirmation SMS has been sent to your mobile number.");
        navigate("/");
      } else {
        throw new Error(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred while booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!trek) return null;

  const totalPrice = trek.price * numberOfPersons;
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 5);
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mt-16">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4">
            {['Details', 'Verification', 'Payment'].map((step, index) => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                  ${(showPayment ? index <= 2 : (showMobileVerification ? index <= 1 : index === 0)) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400'}`}>
                  {index + 1}
                </div>
                <span className={`text-sm ${(showPayment ? index <= 2 : (showMobileVerification ? index <= 1 : index === 0)) 
                  ? 'text-blue-400' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/10">
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600/30 to-purple-600/30">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {trek.name}
            </h1>
            <p className="text-lg text-gray-300 mt-2">Adventure Booking</p>
          </div>

          <div className="p-8">
            {/* Trek Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { icon: MapPin, label: "Location", value: trek.location, color: "text-green-400" },
                { icon: Mountain, label: "Difficulty", value: trek.difficulty, color: "text-red-400" },
                { icon: Clock, label: "Duration", value: trek.duration, color: "text-yellow-400" },
                { icon: Users, label: "Group Size", value: trek.groupSize, color: "text-purple-400" },
              ].map((item, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Form Sections */}
            <div className="space-y-12">
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-700/50 rounded-xl">
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              )}

              {!showMobileVerification && !showPayment && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date Picker */}
                    <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                      <label className="block mb-4">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Calendar className="mr-2" size={20} />
                          Select Date
                        </span>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={minDateString}
                          required
                          className="w-full mt-2 bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="mt-2 text-sm text-gray-400">
                          Available from {new Date(minDateString).toLocaleDateString()}
                        </p>
                      </label>
                    </div>

                    {/* Group Size */}
                    <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                      <label className="block mb-4">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Users className="mr-2" size={20} />
                          Group Size
                        </span>
                        <div className="relative mt-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={numberOfPersons}
                            onChange={(e) => setNumberOfPersons(Number(e.target.value))}
                            required
                            className="w-full bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-6">
                      Participant Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {persons.map((person, index) => (
                        <div key={index}>
                          <label className="block text-sm text-gray-400 mb-2">
                            Participant {index + 1}
                          </label>
                          <input
                            type="text"
                            value={person.name}
                            onChange={(e) => handlePersonNameChange(index, e.target.value)}
                            required
                            placeholder="Full name"
                            className="w-full bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 p-6 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-300">Total Price</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]"
                  >
                    Continue to Verification
                  </button>
                </form>
              )}

              {/* Verification Section */}
              {showMobileVerification && !isVerified && (
                <div className="space-y-8">
                  <form onSubmit={handleMobileVerification} className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                    <label className="block mb-6">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Phone className="mr-2" size={20} />
                        Mobile Verification
                      </span>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        pattern="\+[0-9]{11,14}"
                        required
                        placeholder="+91XXXXXXXXXX"
                        className="w-full mt-2 bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-600/90 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
                    >
                      {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
                    </button>
                  </form>

                  <form onSubmit={handleVerifyCode} className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                    <label className="block mb-6">
                      <span className="text-sm text-gray-400">Verification Code</span>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        placeholder="Enter 6-digit code"
                        className="w-full mt-2 bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading || !verificationCode}
                      className="w-full bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
                    >
                      {isLoading ? 'Verifying...' : 'Confirm Verification'}
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Section */}
              {showPayment && (
                <form onSubmit={handlePaymentSubmit} className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-8">Payment Details</h2>
                    
                    {paymentError && (
                      <div className="mb-6 p-4 bg-red-900/50 rounded-lg">
                        <p className="text-red-300">{paymentError}</p>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Card Preview */}
                      <div className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-10"></div>
                        <div className="relative z-10 space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-xl font-semibold">Card Number</span>
                            <div className="flex space-x-2">
                              <div className="h-8 w-12 bg-white/20 rounded-md"></div>
                              <div className="h-8 w-12 bg-white/20 rounded-md"></div>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                            placeholder="•••• •••• •••• ••••"
                            className="w-full bg-transparent text-2xl font-semibold text-white placeholder-gray-400 focus:outline-none"
                          />
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm text-gray-300">Cardholder Name</span>
                              <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                placeholder="JOHN DOE"
                                className="w-full bg-transparent text-lg text-white placeholder-gray-400 focus:outline-none"
                              />
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-300">Expires</span>
                              <input
                                type="text"
                                value={expiry}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                                    setExpiry(
                                      value
                                        .replace(/\D/g, "")
                                        .replace(/^(\d{2})(\d{2})$/, "$1/$2")
                                        .slice(0, 5)
                                    );
                                  }
                                }}
                                placeholder="MM/YY"
                                className="w-full bg-transparent text-lg text-white text-right placeholder-gray-400 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CVV Input */}
                      <div className="bg-white/5 p-4 rounded-xl">
                        <label className="block text-sm text-gray-400 mb-2">CVV</label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="•••"
                          className="w-full bg-gray-700/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]"
                      >
                        Confirm Payment of ₹{totalPrice.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Booking;