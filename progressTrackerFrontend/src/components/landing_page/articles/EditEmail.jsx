const EditEmail = () => {
    return (
      <article className="help-article">
        <h2>Editing Your Email</h2>
        <p>This section explains how to update your email address.</p>
        <ol>
          <li>Go to your account settings.</li>
          <li>Locate the &quot;Email&quot; section.</li>
          <li>Click &quot;Edit&quot; and enter your new email address.</li>
          <li>Confirm the change by clicking &quot;Save&quot;.</li>
          <li>Check your inbox for a verification email and follow the instructions.</li>
        </ol>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/T3qH-uY3t-Y"
            title="Editing Your Email Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </article>
    );
  };
  
  export default EditEmail;
  