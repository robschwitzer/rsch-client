import style from "./style.module.css";

function Loading() {
  return (
    <div className="flex absolute top-0 right-0 left-0 bottom-0 items-center justify-center">
      <div className={style.ring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;