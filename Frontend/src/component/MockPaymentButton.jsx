import { CreditCard } from "lucide-react"
import React, { useState } from "react"

const MockPaymentButton = ({ amount, onSuccess, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // Simulate a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate a successful payment 80% of the time
      if (Math.random() < 0.8) {
        onSuccess({ id: "mock_payment_" + Date.now() })
      } else {
        throw new Error("Payment failed")
      }
    } catch (error) {
      onError(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center w-full"
    >
      {isProcessing ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center">
          <CreditCard className="mr-2" size={18} />
          Pay Rs. {amount.toLocaleString()}
        </span>
      )}
    </button>
  )
}

export default MockPaymentButton

