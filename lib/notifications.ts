type ContactNotification = {
  name: string
  email?: string | null
  phone: string
  projectType?: string | null
  budget?: string | null
  timeline?: string | null
  message: string
}

const hasWhatsAppConfig = () =>
  Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.NOTIFICATION_PHONE
  )

const hasTwilioConfig = () =>
  Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM_NUMBER &&
      process.env.NOTIFICATION_PHONE
  )

const formatContactMessage = (contact: ContactNotification) => {
  const rows = [
    'Yeni iletisim formu',
    `Ad: ${contact.name}`,
    contact.email ? `E-posta: ${contact.email}` : null,
    `Telefon: ${contact.phone}`,
    contact.projectType ? `Proje tipi: ${contact.projectType}` : null,
    contact.budget ? `Butce: ${contact.budget}` : null,
    contact.timeline ? `Zaman: ${contact.timeline}` : null,
    '',
    contact.message,
  ]

  return rows.filter((row) => row !== null).join('\n')
}

const sendWhatsAppMessage = async (text: string) => {
  if (!hasWhatsAppConfig()) return

  const response = await fetch(
    `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: process.env.NOTIFICATION_PHONE,
        type: 'text',
        text: {
          preview_url: false,
          body: text,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`WhatsApp bildirimi gonderilemedi: ${response.status}`)
  }
}

const sendSmsMessage = async (text: string) => {
  if (!hasTwilioConfig()) return

  const body = new URLSearchParams({
    From: process.env.TWILIO_FROM_NUMBER as string,
    To: process.env.NOTIFICATION_PHONE as string,
    Body: text,
  })

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }
  )

  if (!response.ok) {
    throw new Error(`SMS bildirimi gonderilemedi: ${response.status}`)
  }
}

export const sendContactNotification = async (contact: ContactNotification) => {
  const text = formatContactMessage(contact)

  try {
    if (process.env.NOTIFICATION_CHANNEL === 'sms') {
      await sendSmsMessage(text)
      return
    }

    await sendWhatsAppMessage(text)
  } catch (error) {
    console.error('Telefon bildirimi gonderilemedi:', error)
  }
}
