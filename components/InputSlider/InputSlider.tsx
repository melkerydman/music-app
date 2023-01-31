import React, { useRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './InputSlider.module.scss';
import { handleClassName } from '../../utilities/helpers';

type Props = {
  value: number;
  setValue: (number) => void;
  minValue: number;
  maxValue: number;
  step: number;
};

const InputSlider: React.FC<Props> = ({
  value,
  setValue,
  minValue,
  maxValue,
  step,
}): JSX.Element => {
  // Use state to track whether the thumb is being dragged
  const [dragging, setDragging] = useState(false);

  // Store the slider reference
  const sliderRef = useRef(null);

  // Store the previous touch position
  const previousTouchX = useRef(0);

  // Handle changes to the slider value by mouse events
  const handleSliderChange = (e) => {
    // Only process events if we are not currently dragging the thumb
    if (!dragging) {
      const slider = sliderRef.current;
      const sliderWidth = slider.offsetWidth;
      const sliderX = slider.getBoundingClientRect().x;
      const mouseX = e.clientX;
      const range = maxValue - minValue;
      const percentage = ((mouseX - sliderX) / sliderWidth) * 100;
      const newValue = minValue + range * (percentage / 100);

      if (newValue >= minValue - 1 && newValue <= maxValue) {
        setValue(Math.ceil(newValue));
      }
    }
  };

  const decrementValue = () => {
    setValue(Math.max(minValue, value - 1));
  };

  const incrementValue = () => {
    setValue(Math.min(maxValue, value + 1));
  };

  const handleThumbKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      decrementValue();
    } else if (e.key === 'ArrowRight') {
      incrementValue();
    }
  };

  // Handle changes to the slider value by touch events
  const handleSliderTouchMove = (e) => {
    // Update the dragging flag
    setDragging(true);

    // Calculate the change in touch position
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - previousTouchX.current;

    // Update the previous touch position
    previousTouchX.current = touchX;

    // Adjust the value based on the change in touch position
    const newValue = value + deltaX / 2;
    if (newValue >= minValue - 1 && newValue <= maxValue) {
      setValue(Math.ceil(newValue));
    }
  };

  // Reset the touch event state when the user lifts their finger
  const handleSliderTouchEnd = () => {
    setDragging(false);
  };

  const trackTicks = [];
  for (let i = minValue; i <= maxValue; i += step) {
    trackTicks.push(
      <div
        key={i}
        className={styles.slider__tick}
        style={{ left: `${((i - minValue) / (maxValue - minValue)) * 100}%` }}
      />
    );
  }

  return (
    <div className={styles.slider__container}>
      <button
        className={handleClassName([
          styles.button,
          styles['button--decrement'],
        ])}
        onClick={decrementValue}
      >
        <RemoveIcon />
      </button>
      <div
        className={styles.slider}
        ref={sliderRef}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        onClick={handleSliderChange}
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            handleSliderChange(e);
          }
        }}
        onTouchStart={(e) => {
          previousTouchX.current = e.touches[0].clientX;
        }}
        onTouchMove={handleSliderTouchMove}
        onTouchEnd={handleSliderTouchEnd}
      >
        <div className={styles.slider__track}>{trackTicks}</div>
        <div
          className={styles.slider__thumb}
          style={{
            left: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
          }}
          tabIndex={0}
          onKeyDown={handleThumbKeyDown}
        />
      </div>
      <button
        className={handleClassName([
          styles.button,
          styles['button--increment'],
        ])}
        onClick={incrementValue}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default InputSlider;

// import React, { useRef, useState } from 'react';

// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// import styles from './InputSlider.module.scss';
// import { handleClassName } from '../../utilities/helpers';

// type Props = {
//   value: number;
//   setValue: (number) => void;
//   minValue: number;
//   maxValue: number;
//   step: number;
// };

// const InputSlider: React.FC<Props> = ({
//   value,
//   setValue,
//   minValue,
//   maxValue,
//   step,
// }): JSX.Element => {
//   // Use state to track whether the thumb is being dragged
//   const [dragging, setDragging] = useState(false);

//   // Store the slider reference
//   const sliderRef = useRef(null);

//   // Store the previous touch position
//   const previousTouchX = useRef(0);

//   // Handle changes to the slider value by mouse events
//   const handleSliderChange = (e) => {
//     // Only process events if we are not currently dragging the thumb
//     if (!dragging) {
//       const slider = sliderRef.current;
//       const sliderWidth = slider.offsetWidth;
//       const sliderX = slider.getBoundingClientRect().x;
//       const mouseX = e.clientX;
//       const range = maxValue - minValue;
//       const percentage = ((mouseX - sliderX) / sliderWidth) * 100;
//       const newValue = minValue + range * (percentage / 100);

//       if (newValue >= minValue - 1 && newValue <= maxValue) {
//         setValue(Math.ceil(newValue));
//       }
//     }
//   };

//   // Decrement the value
//   const decrementValue = () => {
//     setValue(Math.max(minValue, value - 1));
//   };

//   // Increment the value
//   const incrementValue = () => {
//     setValue(Math.min(maxValue, value + 1));
//   };

//   // Handle changes to the slider value by touch events
//   const handleSliderTouchMove = (e) => {
//     // Update the dragging flag
//     setDragging(true);

//     // Calculate the change in touch position
//     const touchX = e.touches[0].clientX;
//     const deltaX = touchX - previousTouchX.current;

//     // Update the previous touch position
//     previousTouchX.current = touchX;

//     // Adjust the value based on the change in touch position
//     const newValue = value + deltaX / 2;
//     if (newValue >= minValue - 1 && newValue <= maxValue) {
//       setValue(Math.ceil(newValue));
//     }
//   };

//   // Reset the touch event state when the user lifts their finger
//   const handleSliderTouchEnd = () => {
//     setDragging(false);
//   };

//   // Handle changes to the slider value by keyboard events
//   const handleThumbKeyDown = (e) => {
//     if (e.key === 'ArrowLeft') {
//       decrementValue();
//       e.preventDefault();
//     } else if (e.key === 'ArrowRight') {
//       incrementValue();
//       e.preventDefault();
//     }
//   };

//   return (
//     <div
//       className={handleClassName([styles.slider, dragging && styles.dragging])}
//       ref={sliderRef}
//       onMouseDown={handleSliderChange}
//       onTouchStart={(e) => {
//         previousTouchX.current = e.touches[0].clientX;
//       }}
//       onTouchMove={handleSliderTouchMove}
//       onTouchEnd={handleSliderTouchEnd}
//       tabIndex={0}
//       onKeyDown={handleThumbKeyDown}
//     >
//       <div className={styles.thumb} />
//       <div className={styles.track}>
//         <div
//           className={styles.fill}
//           style={{
//             width: `${((value - minValue) / (maxValue - minValue)) * 100}% `,
//           }}
//         />
//       </div>
//       <button type="button" onClick={decrementValue} className={styles.button}>
//         <RemoveIcon />
//       </button>
//       <button type="button" onClick={incrementValue} className={styles.button}>
//         <AddIcon />
//       </button>
//     </div>
//   );
// };

// export default InputSlider;
