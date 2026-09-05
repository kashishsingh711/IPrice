function AboutCard({ title, className }) {
  return (
    <div className={`card ${className}`}>
      <div className="layer">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default AboutCard;
