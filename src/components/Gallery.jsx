import React, { useRef, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

// Styled Components
const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(45deg, #0a0a0a, #1a1a1a);
  perspective: 1000px;
  overflow: hidden;
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${shine} 3s linear infinite, ${float} 4s ease-in-out infinite;
  will-change: background-position, transform;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  margin: 4rem 0;
  color: #fff;
  position: relative;
  padding: 0.5rem 1rem;
  display: inline-block;
  animation: ${fadeIn} 1s ease-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #ff6b6b);
    background-size: 200% auto;
    transition: width 0.3s ease, background-position 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    background-position: 100% 0;
  }
`

const GalleryCarousel = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  overflow-x: hidden;
  position: relative;
  padding: 3rem 0;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(10,10,10,1), rgba(10,10,10,0));
  }

  &::after {
    right: 0;
    background: linear-gradient(90deg, rgba(10,10,10,0), rgba(10,10,10,1));
  }
`

const ImageContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 0 20px;
  will-change: transform;
`

const ImageCard = styled.div`
  flex: 0 0 auto;
  width: 400px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  will-change: transform, box-shadow;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1;
    border-radius: 20px;
  }

  &:hover {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.4);
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
`

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 80%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;

  ${ImageCard}:hover & {
    opacity: 1;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  position: relative;

  img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  p {
    color: white;
    text-align: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    opacity: 0.8;
  }
`

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const thenContainerRef = useRef(null)
  const nowContainerRef = useRef(null)
  const [thenImages, setThenImages] = useState([])
  const [nowImages, setNowImages] = useState([])
  const isScrollingPaused = useRef(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-scroll with pause
  useEffect(() => {
    const containers = [thenContainerRef.current, nowContainerRef.current]
    let animationFrame

    const animate = () => {
      containers.forEach(container => {
        if (container && !isScrollingPaused.current) {
          container.scrollLeft += 0.5
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0
          }
        }
      })
      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  // Load images with proper static paths
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load Then images
        const thenModules = import.meta.glob('/src/assets/Then/*.{jpg,jpeg,png}')
        const thenLoaded = await Promise.all(
          Object.entries(thenModules).map(async ([path, importer]) => {
            const module = await importer()
            return { 
              src: module.default, 
              alt: path.split('/').pop().replace(/\.[^/.]+$/, '') 
            }
          })
        )
        setThenImages(thenLoaded)

        // Load Now images
        const nowModules = import.meta.glob('/src/assets/Now/*.{jpg,jpeg,png}')
        const nowLoaded = await Promise.all(
          Object.entries(nowModules).map(async ([path, importer]) => {
            const module = await importer()
            return { 
              src: module.default, 
              alt: path.split('/').pop().replace(/\.[^/.]+$/, '') 
            }
          })
        )
        setNowImages(nowLoaded)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadImages()
  }, [])

  // Card interaction handlers
  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * 100
    const y = (e.clientY - rect.top) / rect.height * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
    
    const rotateX = (y - 50) * 0.5
    const rotateY = (x - 50) * -0.5
    e.currentTarget.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateZ(0) rotateX(0) rotateY(0)'
  }

  return (
    <GalleryContainer id="gallery">
      <Title>Evolution Gallery</Title>

      {/* Then Section */}
      <SectionTitle>The Past</SectionTitle>
      <GalleryCarousel 
        ref={thenContainerRef}
        onMouseEnter={() => isScrollingPaused.current = true}
        onMouseLeave={() => isScrollingPaused.current = false}
      >
        <ImageContainer>
          {thenImages.map((image, index) => (
            <ImageCard 
              key={index}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              onClick={() => setSelectedImage(image)}
            >
              <Image src={image.src} alt={image.alt} loading="lazy" />
              <HoverOverlay />
            </ImageCard>
          ))}
        </ImageContainer>
      </GalleryCarousel>

      {/* Now Section */}
      <SectionTitle>The Present</SectionTitle>
      <GalleryCarousel 
        ref={nowContainerRef}
        onMouseEnter={() => isScrollingPaused.current = true}
        onMouseLeave={() => isScrollingPaused.current = false}
      >
        <ImageContainer>
          {nowImages.map((image, index) => (
            <ImageCard 
              key={index}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              onClick={() => setSelectedImage(image)}
            >
              <Image src={image.src} alt={image.alt} loading="lazy" />
              <HoverOverlay />
            </ImageCard>
          ))}
        </ImageContainer>
      </GalleryCarousel>

      {/* Lightbox Modal */}
      {selectedImage && (
        <ModalOverlay onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <p>{selectedImage.alt}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </GalleryContainer>
  )
}

export default Gallery