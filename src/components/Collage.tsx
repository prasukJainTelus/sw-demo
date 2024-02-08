import { useState, useEffect } from "react";

import { Image } from "antd";

export default function Collage({ imageURLs }: { imageURLs: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSrc, setActiveSrc] = useState("");

  async function loadImage(url: string) {
    let res = await fetch(url);
    return res.blob();
  }

  async function loadBufferImages(index: number) {
    imageURLs
      .slice(index, Math.min(index + 5, imageURLs.length))
      .forEach((url) => loadImage(url));

    imageURLs.slice(index, Math.max(0, index)).forEach((url) => loadImage(url));

    if (index + 5 < imageURLs.length) {
      fetch(`${imageURLs[index + 5]}-cleanup`);
    } else if (index - 5 > 0) {
      fetch(`${imageURLs[index - 5]}-cleanup`);
    }
  }

  function loadImageIndex(index: number) {
    loadImage(imageURLs[index]).then((blob) => {
      setActiveIndex(index);
      setActiveSrc(URL.createObjectURL(blob));
      loadBufferImages(index);
    });
  }

  useEffect(() => {
    if (activeSrc === "") loadImageIndex(0);
  }, []);
  return (
    <>
      <Image src={activeSrc} preview={false} width={"100%"} height={"100%"} />
      <button
        disabled={activeIndex === 0}
        className="button prev"
        onClick={() => loadImageIndex(activeIndex - 1)}
      >
        Prev
      </button>
      <button
        className="button next"
        disabled={activeIndex === imageURLs.length - 1}
        onClick={() => loadImageIndex(activeIndex + 1)}
      >
        Next
      </button>
    </>
  );
}
