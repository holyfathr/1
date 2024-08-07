import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from './photo-gallery.module.scss';
import Icon from "components/ui/Icon";


const PhotoGallery = ({university}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % university.gallery.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + university.gallery.length) % university.gallery.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if(university.gallery.length > 0){
    return (
      <div className={styles.slider}>
        <div className={styles.mainImage}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.imageContainer}
            >
              <Image
                src={university.gallery[currentIndex].image_link}
                alt={`Slide ${currentIndex}`}
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
              <div className={styles.title}>{university.gallery[currentIndex].description}</div>
            </motion.div>
          </AnimatePresence>
          <button className={styles.prev} onClick={prevSlide}>
              <Icon slug="arrow-right" className={styles.icon} />
          </button>
          <button className={styles.next} onClick={nextSlide}>
              <Icon slug="arrow-right" className={styles.icon} />
          </button>
          <div className={styles.indicators}>
          {university.gallery.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        </div>
        <div className={styles.thumbnails}>
          {university.gallery.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            >
              <Image src={img.image_link} alt={`Thumbnail ${index}`} width={244} height={138} objectFit="cover" />
            </div>
          ))}
        </div>
      </div>
    );
  };  
}

export default PhotoGallery;
