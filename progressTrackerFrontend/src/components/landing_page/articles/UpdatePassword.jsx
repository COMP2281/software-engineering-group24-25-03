const UpdatePassword = () => {
    return (
      <article className="help-article">
        <h2>Updating Your Password</h2>
        <p>This section explains how to change your password.</p>
        <ol>
          <li>Go to your account settings.</li>
          <li>Click on Security</li>
          <li>Enter your current password</li>
          <li>Enter your new password</li>
          <li>Enter your new password again</li>
          <li>Click &quot;Update Password&quot; to save the changes.</li>
        </ol>
        <div className="video-container">
        <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Update_Password.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        </div>
      </article>
    );
  };
  
  export default UpdatePassword;
  