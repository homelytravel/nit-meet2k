import React, { useRef, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(45deg, #0a0a0a, #1a1a1a);
  text-align: center;
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${shine} 3s linear infinite;
`

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: #fff;
  margin: 2rem 0 1rem;
  border-bottom: 2px solid #4ecdc4;
  padding-bottom: 0.5rem;
`

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding: 2rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ImageCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${props => props.selected ? '0 0 20px 5px #4ecdc4' : '0 5px 20px rgba(0,0,0,0.5)'};
  transform: ${props => props.selected ? 'scale(1.2)' : 'scale(1)'};
  z-index: ${props => props.selected ? 10 : 1};
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  flex-direction: column;
`

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
  overflow: auto;
`

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  transform: scale(${props => props.zoom / 800});
  transition: transform 0.3s ease;
`

const ZoomControls = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(8px);

  button {
    background: #4ecdc4;
    border: none;
    padding: 0.5rem 1rem;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #34a8a3;
    }
  }
`

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(800);
  const [thenImages, setThenImages] = useState([]);
  const [nowImages, setNowImages] = useState([]);
  const thenRef = useRef(null);
  const nowRef = useRef(null);

  useEffect(() => {
    const loadImages = async () => {
      const filterImages = async (modules) => {
        const loaded = await Promise.all(
          Object.entries(modules).map(async ([path, importer]) => {
            const module = await importer();
            const name = path.split('/').pop().replace(/\.[^/.]+$/, '')
            return { src: module.default, alt: name };
          })
        );
        const unique = Array.from(new Map(loaded.map(img => [img.src, img])).values());
        return unique.filter(img => !/(mug|prof|irrelevant)/i.test(img.alt));
      }

      const thenModules = import.meta.glob('/src/assets/Then/*.{jpg,jpeg,png}');
      const nowModules = import.meta.glob('/src/assets/Now/*.{jpg,jpeg,png}');

      setThenImages(await filterImages(thenModules));
      setNowImages(await filterImages(nowModules));
    }
    loadImages();
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      [thenRef, nowRef].forEach(ref => {
        if (ref.current && !ref.current.matches(':hover')) {
          ref.current.scrollLeft += 1;
          if (ref.current.scrollLeft >= ref.current.scrollWidth - ref.current.clientWidth) {
            ref.current.scrollLeft = 0;
          }
        }
      });
    }, 20);
    return () => clearInterval(scrollInterval);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setZoom(800);
  }

  const handleZoom = (type) => {
    setZoom(prev => {
      if (type === 'in') return Math.min(prev + 200, 2000);
      if (type === 'out') return Math.max(prev - 200, 400);
      return 800;
    });
  }

  const handleDoubleClick = () => {
    handleZoom('in');
  }

  return (
    <GalleryContainer id="gallery">
      <Title>Evolution Gallery</Title>

      <SectionTitle>The Past</SectionTitle>
      <Carousel ref={thenRef}>
        {thenImages.map((image, idx) => (
          <ImageCard key={idx} onClick={() => handleImageClick(image)} selected={selectedImage?.src === image.src}>
            <Image src={image.src} alt={image.alt} loading="lazy" />
          </ImageCard>
        ))}
      </Carousel>

      <SectionTitle>The Present</SectionTitle>
      <Carousel ref={nowRef}>
        {nowImages.map((image, idx) => (
          <ImageCard key={idx} onClick={() => handleImageClick(image)} selected={selectedImage?.src === image.src}>
            <Image src={image.src} alt={image.alt} loading="lazy" />
          </ImageCard>
        ))}
      </Carousel>

      {selectedImage && (
        <ModalOverlay onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImage 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              zoom={zoom} 
              onDoubleClick={handleDoubleClick} 
            />
          </ModalContent>
          <ZoomControls>
            <button onClick={() => handleZoom('in')}>Zoom In</button>
            <button onClick={() => handleZoom('out')}>Zoom Out</button>
            <button onClick={() => handleZoom('reset')}>Reset</button>
          </ZoomControls>
        </ModalOverlay>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
