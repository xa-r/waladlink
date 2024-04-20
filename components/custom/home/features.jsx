'use client';
import { motion } from 'framer-motion';
import { Fingerprint, KeyRound, Beer, Send } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Fingerprint className="w-6 h-6" />,
      info: 'Unique',
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      info: 'Secure',
    },
    {
      icon: <Beer className="w-6 h-6" />,
      info: 'Easy',
    },
    {
      icon: <Send className="w-6 h-6" />,
      info: 'Fast',
    },
  ];
  return (
    <div>
      <div className="my-20 mx-14">
        <div className="grid grid-cols-2 md:grid-cols-4 place-items-center w-full gap-24 sm:gap-32 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className='space-y-3'>
              <div className='grid place-items-center'>
                <div className="absolute w-10 h-10 rounded-lg bg-white blur-2xl hover:animate-ping"></div>
                <div className="relative">{feature.icon}</div>
              </div>
              <div className='font-bold font-dmsans'>{feature.info}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}