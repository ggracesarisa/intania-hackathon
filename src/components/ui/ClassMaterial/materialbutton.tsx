import Image from "next/image";

const Materialbutton = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/path-to-your-file.pdf"; // Update this with your actual file path
    link.download = "my-file.pdf"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex h-[142px] w-[142px] flex-col items-center justify-center rounded-full border-8 border-green-400 bg-white text-lg font-bold text-black hover:scale-105 hover:cursor-pointer"
    >
      <Image
        src={"/tree-detail/shovel_animated.png"}
        alt="ShovelImage"
        width={63}
        height={63}
        className="mx-auto"
      />
      Slide 1
    </button>
  );
};

export default Materialbutton;
