const EditEmail = () => {
    return (
      <article className="help-article">
        <h2>Editing Your Email</h2>
        <p>This section explains how to update your email address.</p>
        <ol>
          <li>Go to your account settings.</li>
          <li>Click on Profile</li>
          <li>Click &quot;Edit&quot; and enter your new email address.</li>
          <li>Confirm the change by clicking &quot;Save&quot;.</li>
          {/* <li>Check your inbox for a verification email and follow the instructions.</li> */}
        </ol>
        <div className="video-container">
        <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Update_Email.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        </div>
      </article>
    );
  };
  
  export default EditEmail;
  