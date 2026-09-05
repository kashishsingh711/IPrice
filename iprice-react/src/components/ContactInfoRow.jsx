function ContactInfoRow({ icon, title, text }) {
  return (
    <div>
      <div>{icon}
        <span>
            <h5>{title}</h5>
            <p>{text}</p>
        </span>
      </div>
    </div>
  );
}

export default ContactInfoRow;