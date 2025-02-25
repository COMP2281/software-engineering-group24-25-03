const UpdatePassword = () => {
    return (
      <article className="help-article">
        <h2>Updating Your Password</h2>
        <p>This section explains how to change your password.</p>
        <ol>
          <li>Navigate to your account settings.</li>
          <li>Find the &quot;Password&quot; section.</li>
          <li>Enter your current password.</li>
          <li>Enter and confirm your new password.</li>
          <li>Click &quot;Save Changes&quot; to update your password.</li>
        </ol>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/T3qH-uY3t-Y"
            title="Updating Your Password Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </article>
    );
  };
  
  export default UpdatePassword;
  