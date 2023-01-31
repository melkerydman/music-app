import React, { useRef } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './InputSlider.module.scss';
import { handleClassName } from '../../utilities/helpers';

type Props = {
  value: number;
  setValue: (number) => void;
  minValue: number;
  maxValue: number;
};

const InputSlider: React.FC<Props> = ({
  value,
  setValue,
  minValue,
  maxValue,
}): JSX.Element => {
  // const [value, setValue] = useState(0);
  const sliderRef = useRef(null);

  const handleSliderChange = (e) => {
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
      >
        <div className={styles.slider__track} />
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
