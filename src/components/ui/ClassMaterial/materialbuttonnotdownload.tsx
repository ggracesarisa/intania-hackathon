import React from 'react'
import Image from 'next/image'

const Materialbuttonnotdownload = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/path-to-your-file.pdf'; // Update this with your actual file path
    link.download = 'my-file.pdf'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button 
      onClick={handleDownload}
      className="w-[142px] h-[142px] rounded-full bg-white border-8 border-grey-300 flex items-center justify-center text-black text-lg font-bold flex-col hover:cursor-pointer hover:scale-105"
    >
      <Image src={'/tree-detail/hoe_animated.png'} alt="ShovelImage"
             width={63} height={63} className="mx-auto"/>
      Slide 2
    </button>
  )
}

export default Materialbuttonnotdownload
