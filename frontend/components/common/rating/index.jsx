import Rating from "@material-ui/lab/Rating";

export default function RatingStar(props) {
  const { value, precision, onChange, ...otherProps } = props;

  return (
    <Rating
      name="rating"
      defaultValue={0}
      value={value || 0}
      precision={precision}
      onChange={onChange}
      {...otherProps}
    />
  );
}
