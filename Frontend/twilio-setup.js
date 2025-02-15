import twilio from "twilio"

// Twilio configuration
const accountSid = "your_account_sid"
const authToken = "your_auth_token"
const twilioPhoneNumber = "your_twilio_phone_number"

const client = twilio(accountSid, authToken)

// Function to send SMS
async function sendSMS(to, body) {
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    })
    console.log(`SMS sent successfully. SID: ${message.sid}`)
    return message
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw error
  }
}

// Example usage
const recipientNumber = "+1234567890" // Replace with the recipient's phone number
const messageBody = "Hello from Twilio! This is a test message."

sendSMS(recipientNumber, messageBody)
  .then(() => console.log("SMS sent successfully"))
  .catch((error) => console.error("Failed to send SMS:", error))

