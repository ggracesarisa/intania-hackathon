import Image from "next/image";

const Materialbuttonnotdownload = () => {
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
      className="border-grey-300 flex h-[142px] w-[142px] flex-col items-center justify-center rounded-full border-8 bg-white text-lg font-bold text-black hover:scale-105 hover:cursor-pointer"
    >
      <Image
        src={"/tree-detail/hoe_animated.png"}
        alt="ShovelImage"
        width={63}
        height={63}
        className="mx-auto"
      />
      Slide 2
    </button>
  );
};

export default Materialbuttonnotdownload;
