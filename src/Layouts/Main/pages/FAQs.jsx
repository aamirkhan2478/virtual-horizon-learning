import React, { useState } from "react";
import { Plus, Minus } from "lucide-react"; // Import Lucide icons

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Virtual Horizon Learning?",
      answer:
        "Virtual Horizon Learning is an online education platform designed to deliver personalized, engaging learning experiences through the use of gamified modules, AI-powered quizzes, and real-time feedback.",
    },
    {
      question: "How do I get started with Virtual Horizon?",
      answer:
        "To get started, simply sign up for an account, browse our range of courses, and choose the ones that fit your goals. You can then begin learning at your own pace or join live sessions.",
    },
    {
      question: "Is there a fee for using Virtual Horizon?",
      answer:
        "We offer both free and paid courses, depending on your learning needs. For paid courses, we ensure that our prices are competitive and provide excellent value for the quality of education delivered.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Yes, our platform offers flexible learning options. You can take courses at your own pace, whether through asynchronous learning modules or by attending live sessions.",
    },
    {
      question: "How do I ensure my data is secure?",
      answer:
        "We take data security seriously. Our platform uses industry-standard encryption protocols to protect your personal information and ensure that your data remains private and secure.",
    },
  ];

  return (
    <section className="faqs pb-36 bg-gray-100">
      <div className="container">
        {/* Heading */}
        <div className="heading text-center py-6">
          <h1 className="text-3xl font-semibold text-black">FAQs</h1>
          <span className="text-sm mt-2 block">Frequently Asked Questions</span>
        </div>

        {/* FAQs List */}
        <div className="grid grid-cols-1 gap-5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isActive={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div
      className={`faq-item p-5 border rounded-lg shadow-md bg-white cursor-pointer transition-all duration-300 ${
        isActive ? "bg-blue-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-black">{question}</h4>
        <div className="icon text-blue-500">
          {isActive ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>
      {isActive && <p className="text-sm text-gray-600 mt-3">{answer}</p>}
    </div>
  );
};
