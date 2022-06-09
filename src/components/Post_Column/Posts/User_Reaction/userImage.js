export default function UserImage(props) {
  return (
    <img
      src={`${props.image}`}
      className="rounded-full h-12 w-12 outline outline-offset-2 outline-2 outline-gray-400"
      alt={"user-image"}
    />
  );
}
