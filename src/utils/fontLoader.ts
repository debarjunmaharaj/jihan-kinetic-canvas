
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// Preload the font to avoid loading issues
export const preloadFont = async () => {
  try {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        (font) => {
          resolve(font);
        },
        (progress) => {
          console.log('Font loading progress:', (progress.loaded / progress.total) * 100, '%');
        },
        (error) => {
          console.error('Error loading font:', error);
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error('Font preloading error:', error);
    throw error;
  }
};
