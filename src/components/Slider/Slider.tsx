import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Slider.scss";

interface ISlider {
  years: number[] | null;
  handleChangeYear: (value: number | number[]) => void;
}

function Slider({ handleChangeYear, years }: ISlider) {
  if (!years) return null;

  const marks = years.reduce((accum, year) => Object.assign(accum, { [year]: year }), {});
  const minYear = years[0];
  const maxYear = years[years.length - 1];

  return (
    <RcSlider
      className="slider"
      defaultValue={maxYear}
      min={minYear}
      max={maxYear}
      marks={marks}
      onChange={handleChangeYear}
      step={null}
    />
  );
}

export default Slider;
