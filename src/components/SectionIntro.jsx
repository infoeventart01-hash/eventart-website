export default function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {text ? <p className="muted">{text}</p> : null}
    </div>
  );
}
