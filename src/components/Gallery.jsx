import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--background-color);
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 3px;
    background-color: var(--primary-color);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  margin: 2rem 0;
  color: var(--primary-color);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1.5rem 0;
  }
`

const GalleryCarousel = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  overflow-x: hidden;
  position: relative;
  padding: 1rem 0;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`

const ImageContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  user-select: none;
`

const ImageCard = styled.div`
  flex: 0 0 auto;
  width: 350px;
  height: 350px;
  margin-right: 20px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  user-select: none;
  
  &:hover {
    transform: scale(1.05);
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`



const Gallery = () => {
  const thenCarouselRef = useRef(null)
  const thenContainerRef = useRef(null)
  const nowCarouselRef = useRef(null)
  const nowContainerRef = useRef(null)
  const [isDraggingThen, setIsDraggingThen] = useState(false)
  const [isDraggingNow, setIsDraggingNow] = useState(false)
  const [startXThen, setStartXThen] = useState(0)
  const [startXNow, setStartXNow] = useState(0)
  const [scrollLeftThen, setScrollLeftThen] = useState(0)
  const [scrollLeftNow, setScrollLeftNow] = useState(0)
  const [thenImages, setThenImages] = useState([])
  const [nowImages, setNowImages] = useState([])
  
  // Load images from Then and Now directories
  useEffect(() => {
    // Load Then images
    const thenImageModules = import.meta.glob('/src/assets/Then/*.jpg')
    
    const loadThenImages = async () => {
      const imagePromises = Object.entries(thenImageModules).map(async ([path, importFn], index) => {
        const module = await importFn()
        return {
          id: index + 1,
          src: module.default,
          // Extract filename from path for alt text
          alt: path.split('/').pop().replace('.jpg', '')
        }
      })
      
      const loadedImages = await Promise.all(imagePromises)
      setThenImages(loadedImages)
    }
    
    // Load Now images
    const nowImageModules = import.meta.glob('/src/assets/Now/*.jpg')
    
    const loadNowImages = async () => {
      const imagePromises = Object.entries(nowImageModules).map(async ([path, importFn], index) => {
        const module = await importFn()
        return {
          id: index + 1,
          src: module.default,
          // Extract filename from path for alt text
          alt: path.split('/').pop().replace('.jpg', '')
        }
      })
      
      const loadedImages = await Promise.all(imagePromises)
      setNowImages(loadedImages)
    }
    
    loadThenImages()
    loadNowImages()
  }, [])

  // Mouse event handlers for Then carousel
  const handleThenMouseDown = (e) => {
    setIsDraggingThen(true)
    setStartXThen(e.pageX - thenContainerRef.current.offsetLeft)
    setScrollLeftThen(thenContainerRef.current.scrollLeft)
  }

  const handleThenMouseMove = (e) => {
    if (!isDraggingThen) return
    e.preventDefault()
    const x = e.pageX - thenContainerRef.current.offsetLeft
    const walk = (x - startXThen) * 2 // Scroll speed multiplier
    thenContainerRef.current.scrollLeft = scrollLeftThen - walk
  }

  const handleThenMouseUp = () => {
    setIsDraggingThen(false)
  }

  const handleThenMouseLeave = () => {
    setIsDraggingThen(false)
  }
  
  // Mouse event handlers for Now carousel
  const handleNowMouseDown = (e) => {
    setIsDraggingNow(true)
    setStartXNow(e.pageX - nowContainerRef.current.offsetLeft)
    setScrollLeftNow(nowContainerRef.current.scrollLeft)
  }

  const handleNowMouseMove = (e) => {
    if (!isDraggingNow) return
    e.preventDefault()
    const x = e.pageX - nowContainerRef.current.offsetLeft
    const walk = (x - startXNow) * 2 // Scroll speed multiplier
    nowContainerRef.current.scrollLeft = scrollLeftNow - walk
  }

  const handleNowMouseUp = () => {
    setIsDraggingNow(false)
  }

  const handleNowMouseLeave = () => {
    setIsDraggingNow(false)
  }

  // Auto-scroll effect for Then carousel
  useEffect(() => {
    const container = thenContainerRef.current
    if (!container) return

    let animationId
    let scrollAmount = 1 // Pixels to scroll per frame

    const scroll = () => {
      if (isDraggingThen) {
        cancelAnimationFrame(animationId)
        return
      }

      container.scrollLeft += scrollAmount
      
      // Reset scroll position when reaching the end
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0
      }
      
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isDraggingThen])

  // Auto-scroll effect for Now carousel
  useEffect(() => {
    const container = nowContainerRef.current
    if (!container) return

    let animationId
    let scrollAmount = 1 // Pixels to scroll per frame

    const scroll = () => {
      if (isDraggingNow) {
        cancelAnimationFrame(animationId)
        return
      }

      container.scrollLeft += scrollAmount
      
      // Reset scroll position when reaching the end
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0
      }
      
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isDraggingNow])

  return (
    <GalleryContainer id="gallery">
      <Title>Gallery</Title>
      
      {/* Then section */}
      <SectionTitle>Then</SectionTitle>
      <GalleryCarousel
        ref={thenContainerRef}
        onMouseDown={handleThenMouseDown}
        onMouseMove={handleThenMouseMove}
        onMouseUp={handleThenMouseUp}
        onMouseLeave={handleThenMouseLeave}
      >
        <ImageContainer ref={thenCarouselRef}>
          {thenImages.map(image => (
            <ImageCard key={image.id}>
              <Image src={image.src} alt={`Then image ${image.id}`} />
            </ImageCard>
          ))}
        </ImageContainer>
      </GalleryCarousel>
      
      {/* Now section */}
      <SectionTitle>Now</SectionTitle>
      <GalleryCarousel
        ref={nowContainerRef}
        onMouseDown={handleNowMouseDown}
        onMouseMove={handleNowMouseMove}
        onMouseUp={handleNowMouseUp}
        onMouseLeave={handleNowMouseLeave}
      >
        <ImageContainer ref={nowCarouselRef}>
          {nowImages.map(image => (
            <ImageCard key={image.id}>
              <Image src={image.src} alt={`Now image ${image.id}`} />
            </ImageCard>
          ))}
        </ImageContainer>
      </GalleryCarousel>
    </GalleryContainer>
  )
}

export default Gallery