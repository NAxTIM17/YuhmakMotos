import "./modelWrapper.css";

export default function ModelWrapper({children, bikeName, orientation}) {
  return (
    <>
      <div className={`moto__container--${orientation}`} style={{
        flexDirection: orientation === 'left' ? "row-reverse" : "row"
      }}>
        <h1 className="moto__container--title">{bikeName}</h1>
        <div className="three__canvas">
          {children}
        </div>
        <div className="moto__info"></div>
        <div className={`info__container--${orientation}`}></div>
      </div>
    </>
  );
}
