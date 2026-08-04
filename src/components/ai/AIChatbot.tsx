import React, { useState } from 'react';
import { CLINIC_DATA, FOUNDER_DOCTOR } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import {
  X,
  Send,
  Mic,
  Languages,
  Bot,
  Phone,
  Calendar,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isLanguageSelect?: boolean;
}

const getClinicAssistantReply = (query: string): string => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return 'Please type your question and I will help you with clinic information, services, or appointment support.';
  }

  if (/(urgent|emergency|heavy bleeding|chest pain|breathing|severe pain|medical concern)/.test(normalized)) {
    return 'For urgent or serious symptoms, please contact the clinic immediately or seek emergency medical care right away. If you need guidance on the next step, please call our team on +91 7522900512.';
  }

  if (/(book|appointment|consultation|schedule|visit)/.test(normalized)) {
    return 'You can book a consultation through our appointment flow. The consultation fee is ₹500, and you can pay online or at the clinic. I can also help you choose the right branch and service.';
  }

  if (/(fee|price|cost|payment)/.test(normalized)) {
    return 'The consultation fee is ₹500. You can choose online payment via UPI / GPay or pay at the clinic when you visit.';
  }

  if (/(doctor|umesh|kalekar|founder|experience|profile)/.test(normalized)) {
    return `Dr. Umesh Datta Kalekar is the founder of Astygma Hope Clinic. He brings ${FOUNDER_DOCTOR.experience} of clinical experience and is known for fertility guidance, Ayurveda-based fertility support, Ultra Yoga, and A-Dhyand Meditation.`;
  }

  if (/(branch|timing|hour|open|shirol|kolhapur)/.test(normalized)) {
    return 'Shirol Branch (Main HQ) is open Tuesdays, Thursdays, and Saturdays from 10 AM to 6 PM, and sonography is available there. Kolhapur Branch is open Mondays, Wednesdays, and Fridays from 10 AM to 5 PM.';
  }

  if (/(sonography|ultrasound|scan)/.test(normalized)) {
    return 'Ultrasound and sonography support are available at the Shirol Main HQ on Tuesdays, Thursdays, and Saturdays.';
  }

  if (/(female infertility|male infertility|pregnancy|laboratory|yoga|meditation|sound therapy|ayurvedic|fertility)/.test(normalized)) {
    return 'Astygma Hope Clinic offers fertility evaluation, pregnancy guidance, ultrasound, laboratory testing, diet and lifestyle plans, yoga therapy, meditation, and sound-based holistic care. If you would like, I can help you identify the best service for your situation.';
  }

  if (/(hello|hi|hey|welcome|thanks|thank you)/.test(normalized)) {
    return 'Hello and welcome to Astygma Hope Clinic. I’m here to help you explore our services, understand the visit process, and guide you toward a comfortable consultation booking.';
  }

  return `Thank you for reaching out to Astygma Hope Clinic. I can help you with clinic timings, services, doctor information, sonography, and appointment booking. For personalized medical advice, please book a consultation with our team. If you want, I can guide you to the exact service or branch that fits your needs.`;
};

export const AIChatbot: React.FC<{
  onOpenAppointment: () => void;
  onOpenPortal: () => void;
}> = ({ onOpenAppointment, onOpenPortal }) => {
  const { setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello 👋 I’m your Astygma Hope Clinic assistant. I can help you with services, timings, doctors, and booking support.',
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Please select your preferred language',
      isLanguageSelect: true,
    },
  ]);

  const handleSendQuery = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    const botResponse = getClinicAssistantReply(text);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse,
        },
      ]);
    }, 400);
  };

  const handleSelectLanguage = (langCode: Language, label: string) => {
    setLanguage(langCode);
    handleSendQuery(label);
  };

  const handleQuickAction = (action: 'appointment' | 'call' | 'portal') => {
    if (action === 'appointment') {
      setIsOpen(false);
      onOpenAppointment();
      return;
    }

    if (action === 'call') {
      window.location.href = `tel:${CLINIC_DATA.phone}`;
      return;
    }

    setIsOpen(false);
    onOpenPortal();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group border-2 border-white"
          title="Virtual Clinic Receptionist"
        >
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
        </button>
      )}

      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[540px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white">
          <div className="px-5 py-4 bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif font-bold text-base text-gray-800 dark:text-white">
              Chat with us
            </h3>

            <button
              onClick={() => handleSendQuery('Language Selection')}
              className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center hover:bg-purple-200 transition-colors"
              title="Translate"
            >
              <Languages className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 p-3 rounded-2xl border border-rose-100 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center border-2 border-rose-300 text-2xl shrink-0">
                👩‍⚕️
              </div>
              <div>
                <p className="font-bold text-xs text-rose-950 dark:text-rose-300">Astygma Virtual Receptionist</p>
                <p className="text-[10px] text-gray-500">Shirol & Kolhapur Branch Assistant</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 p-3 border border-rose-100 dark:border-gray-700 shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-semibold text-rose-800 dark:text-rose-300">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Next Steps
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleQuickAction('appointment')}
                  className="flex items-center justify-between rounded-xl bg-rose-50 dark:bg-rose-950/40 px-3 py-2 text-left text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Book consultation
                  </span>
                  <span>₹500</span>
                </button>
                <button
                  onClick={() => handleQuickAction('call')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-left text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call clinic reception
                </button>
                <button
                  onClick={() => handleQuickAction('portal')}
                  className="flex items-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 px-3 py-2 text-left text-[11px] font-semibold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900 hover:bg-purple-100 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Open staff portal
                </button>
              </div>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col space-y-2 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-rose-600 text-white rounded-br-none shadow-md font-medium'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200/60 dark:border-gray-700 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>

                {m.isLanguageSelect && (
                  <div className="w-[85%] bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-rose-100 dark:border-gray-700 shadow-sm space-y-2">
                    <p className="font-semibold text-gray-700 dark:text-gray-300 text-[11px] mb-2">
                      Select your preferred Language:
                    </p>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => handleSelectLanguage('EN', 'English')}
                        className="w-full py-2 px-3 rounded-full border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 transition-colors text-center"
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleSelectLanguage('HI', 'हिन्दी')}
                        className="w-full py-2 px-3 rounded-full border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 transition-colors text-center"
                      >
                        हिन्दी
                      </button>
                      <button
                        onClick={() => handleSelectLanguage('MR', 'मराठी')}
                        className="w-full py-2 px-3 rounded-full border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 transition-colors text-center"
                      >
                        मराठी
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-2 bg-white/80 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAppointment();
              }}
              className="text-[11px] font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              Book Visit (₹500 Fee)
            </button>
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="text-[10px] text-gray-500 font-semibold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-600" /> Call {CLINIC_DATA.phone}
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="p-3 bg-white dark:bg-gray-900 flex items-center gap-2 border-t border-gray-200/60 dark:border-gray-800"
          >
            <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-1.5 border border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="Type your query here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-xs font-medium outline-none text-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => alert('Voice Microphone: Listening for patient query...')}
                className="text-rose-600 hover:text-rose-700 p-1 border-l border-gray-300 dark:border-gray-700 ml-1 pl-2"
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              className="w-10 h-10 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
