import { NextRequest, NextResponse } from 'next/server'

const systemPrompt = `Identity & Role:
Sen, Next.js ve Vercel uzmanı, SaaS MVP ve AI Otomasyon geliştiricisi Resul Ersürer'in kişisel web sitesindeki (ersurer.com) yapay zeka asistanısın. Görevin, siteyi ziyaret eden potansiyel müşterilerin, ajansların ve girişimcilerin sorularını yanıtlamak ve onları Resul ile çalışmaya veya ücretsiz bir proje analizi almaya yönlendirmektir.

Resul Ersürer Hakkında Bilgiler:
- Uzmanlık Alanları: Next.js, Vercel, TypeScript, Tailwind CSS, Prisma, PostgreSQL, API Entegrasyonları ve Yapay Zeka (AI) Otomasyonları.
- Sunduğu Hizmetler:
  1. SaaS MVP Geliştirme: Fikirlerin hızlıca çalışan prototiplere dönüştürülmesi.
  2. İşletme Web Siteleri: Vercel üzerinde barındırılan ultra hızlı, SEO uyumlu kurumsal siteler.
  3. Özel Admin Panelleri: İşletmelerin operasyonlarını ve verilerini yönetebileceği yönetim panelleri.
  4. AI ve İş Akışı Otomasyonları: Tekrarlayan işleri otomatize eden akıllı sistemler.
- İş Modeli: Sıfırdan yavaş kod yazmak yerine, elindeki hazır ve optimize edilmiş Next.js SaaS ürün altyapılarını müşterinin sektörüne ve ihtiyacına göre hızlıca özelleştirerek haftalar içinde yayına alıyor. Bu sayede maliyeti düşürüyor ve pazara çıkış süresini (Time-to-Market) kısaltıyor.

Behavioral Guidelines & Tone:
- Dil ve Ton: Türkçe konuş. Profesyonel, cana yakın, çözüm odaklı ve net bir ton kullan. Cümlelerin çok uzun olmasın (chatbot pencereleri dar olduğu için kısa ve okunabilir yanıtlar tercih edilmelidir).
- Ana Hedef: Ziyaretçilerin projelerini anlamak ve onları sayfanın altındaki "Ücretsiz Proje Analizi Al" formuna yönlendirmek ya da iletişim kanallarına teşvik etmektir.
- Bilgi Sınırı: Resul'ün uzmanlığı veya kişisel bilgileri dışındaki genel dünya bilgisi sorularına (örn. "Yemek tarifi ver", "Kuantum fiziği nedir?") kibarca sadece Resul'ün hizmetleriyle ilgili konularda yardımcı olabileceğini söyleyerek yanıt verme ve konuyu tekrar yazılıma/projelere getir.
- Ücretlendirme & Süre: Fiyatlandırma veya proje süreleri hakkında spesifik rakamlar verme. "Projeden projeye değişmekle birlikte, Resul hazır altyapıları kullandığı için geleneksel ajanslara kıyasla çok daha hızlı ve bütçe dostu çözümler sunuyor. Detaylar için bir proje analizi formu doldurabilirsiniz." şeklinde yönlendir.

Örnek Yönlendirme Cümlesi:
"Harika bir proje fikri! Bu fikri Next.js ve Vercel altyapısıyla hızlıca bir SaaS MVP'ye dönüştürebiliriz. Dilerseniz sayfamızdaki 'Ücretsiz Proje Analizi Al' formunu doldurarak Resul'ün sizinle iletişime geçmesini sağlayabilirsiniz."`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages: ChatMessage[] = body.messages || []
    const { sessionId, name, phone } = body

    if (messages.length === 0) {
      return NextResponse.json({ error: 'Mesaj geçmişi boş olamaz' }, { status: 400 })
    }

    let assistantText = ''
    let isDemo = false

    const geminiKey = process.env.GEMINI_API_KEY
    const openAIKey = process.env.OPENAI_API_KEY

    // 1. Try Google Gemini API if key is present
    if (geminiKey) {
      try {
        const contents = messages.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }))

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            assistantText = text
          }
        } else {
          console.error('Gemini API Error Status:', response.status, await response.text())
        }
      } catch (err) {
        console.error('Gemini API Request Error:', err)
      }
    }

    // 2. Try OpenAI API if Gemini is not set or failed, and OpenAI is set
    if (!assistantText && openAIKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAIKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
            ],
            temperature: 0.7,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const text = data.choices?.[0]?.message?.content
          if (text) {
            assistantText = text
          }
        } else {
          console.error('OpenAI API Error Status:', response.status, await response.text())
        }
      } catch (err) {
        console.error('OpenAI API Request Error:', err)
      }
    }

    // 3. Fallback Demo Mode if no API keys are present or they both failed
    if (!assistantText) {
      isDemo = true
      const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || ''

      let demoReply = 'Merhaba! Ben Resul\'ün yapay zeka asistanıyım. Projeleriniz, SaaS MVP fikirleriniz veya web/otomasyon ihtiyaçlarınız hakkında bana soru sorabilirsiniz.'

      if (
        lastUserMessage.includes('merhaba') ||
        lastUserMessage.includes('selam') ||
        lastUserMessage.includes('hey')
      ) {
        demoReply =
          'Selamlar! Resul\'ün kişisel asistanıyım. Next.js, Vercel, SaaS MVP geliştirme ve yapay zeka otomasyonları konularında yardımcı olabilirim. Nasıl bir proje planlıyorsunuz?'
      } else if (
        lastUserMessage.includes('tarif') ||
        lastUserMessage.includes('kuantum') ||
        lastUserMessage.includes('fizik') ||
        lastUserMessage.includes('yemek')
      ) {
        demoReply =
          'Bu konuda size yardımcı olamam. Sadece Resul Ersürer\'in sunduğu Next.js, SaaS MVP geliştirme, özel yönetim panelleri ve AI otomasyon hizmetleri hakkında bilgi verebilirim. Projelerinizle ilgili detayları konuşalım mı?'
      } else if (
        lastUserMessage.includes('fiyat') ||
        lastUserMessage.includes('ücret') ||
        lastUserMessage.includes('maliyet') ||
        lastUserMessage.includes('kaç para') ||
        lastUserMessage.includes('süre') ||
        lastUserMessage.includes('ne kadar sürer')
      ) {
        demoReply =
          'Projeden projeye değişmekle birlikte, Resul hazır altyapıları kullandığı için geleneksel ajanslara kıyasla çok daha hızlı ve bütçe dostu çözümler sunuyor. Detaylar için sayfa sonundaki ücretsiz proje analizi formunu doldurabilirsiniz.'
      } else if (
        lastUserMessage.includes('saas') ||
        lastUserMessage.includes('mvp') ||
        lastUserMessage.includes('proje') ||
        lastUserMessage.includes('fikir') ||
        lastUserMessage.includes('yazılım')
      ) {
        demoReply =
          'Harika bir proje fikri! Bu fikri Next.js ve Vercel altyapısıyla hızlıca bir SaaS MVP\'ye dönüştürebiliriz. Dilerseniz sayfamızdaki "Ücretsiz Proje Analizi Al" formunu doldurarak Resul\'ün sizinle iletişime geçmesini sağlayabilirsiniz.'
      } else if (
        lastUserMessage.includes('otomasyon') ||
        lastUserMessage.includes('ai') ||
        lastUserMessage.includes('yapay zeka')
      ) {
        demoReply =
          'Resul, işletmelerin tekrarlayan iş akışlarını otomatize eden akıllı AI entegrasyonları hazırlıyor. İşinizi nasıl kolaylaştırabileceğimizi görüşmek için sayfa sonundaki iletişim formunu doldurabilirsiniz.'
      } else if (
        lastUserMessage.includes('iletişim') ||
        lastUserMessage.includes('e-posta') ||
        lastUserMessage.includes('telefon') ||
        lastUserMessage.includes('whatsapp')
      ) {
        demoReply =
          'Resul\'e resul.ersurer@icloud.com e-posta adresinden, +90 538 778 17 98 WhatsApp hattından ulaşabilir veya sayfa sonundaki formu doldurarak ücretsiz analiz talebinde bulunabilirsiniz.'
      }

      assistantText = demoReply
    }

    // 4. Save/Update Conversation in Database (if sessionId and DATABASE_URL are set)
    if (sessionId && process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma')
        const assistantResponse: ChatMessage = { role: 'assistant', content: assistantText }
        const messagesWithReply = [...messages, assistantResponse]

        const sessionExists = await prisma.aIChatSession.findUnique({
          where: { id: sessionId },
        })

        if (sessionExists) {
          await prisma.aIChatSession.update({
            where: { id: sessionId },
            data: {
              messages: JSON.stringify(messagesWithReply),
            },
          })
        } else {
          await prisma.aIChatSession.create({
            data: {
              id: sessionId,
              name: name || 'Bilinmeyen Kullanıcı',
              phone: phone || 'Bilinmeyen Telefon',
              messages: JSON.stringify(messagesWithReply),
            },
          })
        }
      } catch (dbError) {
        console.error('Prisma Chat Sync Error:', dbError)
      }
    }

    return NextResponse.json({
      role: 'assistant',
      content: assistantText,
      isDemo,
    })
  } catch (error) {
    console.error('Chat endpoint error:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
}
