'use client';
import { SliderBtnGroup, ProgressSlider, SliderBtn, SliderContent, SliderWrapper } from '@/components/progress-slider';
import Image from 'next/image';

const items = [
  {
    img: '/banner/banner1.jpg', 
    title: 'Expert Trading Education',
    desc: 'Comprehensive courses and live trading sessions designed to transform beginners into professional traders.',
    sliderName: 'education',
  },
  {
    img: '/banner/banner2.jpg', 
    title: 'Advanced Market Analysis',
    desc: 'Master technical and fundamental analysis across stocks, forex, and cryptocurrency markets.',
    sliderName: 'analysis',
  },
  {
    img: '/banner/banner3.jpg', 
    title: 'Personal Mentorship',
    desc: 'One-on-one guidance from experienced traders to accelerate your trading journey and avoid common pitfalls.',
    sliderName: 'mentorship',
  },
  {
    img: '/banner/banner1.jpg', 
    title: 'ISO-Certified Programs',
    desc: 'Internationally recognized certification programs ensuring the highest standards in trading education.',
    sliderName: 'certification',
  },
];

export default function HeroSection() {
  return (
    <div className="relative w-full max-w-[1900px] border mx-auto">
      <ProgressSlider vertical={false} activeSlider='education'>
        <SliderContent>
          {items.map((item, index) => (
            <SliderWrapper key={index} value={item?.sliderName}>
              <div className="relative">
                <Image
                  className='w-full 2xl:h-[600px] h-[450px] object-cover brightness-75'
                  src={item.img}
                  width={1900}
                  height={1080}
                  alt={item.desc}
                  priority={index === 0}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
                  <p className="text-lg md:text-xl max-w-3xl mx-auto">{item.desc}</p>
                </div>
              </div>
            </SliderWrapper>
          ))}
        </SliderContent>

        <SliderBtnGroup className='absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-fit text-white bg-black/60 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4 rounded-lg'>
        {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item?.sliderName}
              className='text-left p-3 border-r border-white/10 hover:bg-white/5 transition-colors'
              progressBarClass='bg-red-600 h-full'
            >
              <h2 className='font-semibold mb-2 text-white text-sm'>{item.title}</h2>
              <p className='text-xs text-gray-400 line-clamp-2 hidden md:flex'>{item.desc}</p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </div>
  );
}