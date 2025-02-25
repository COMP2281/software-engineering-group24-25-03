const ViewPermissions = () => {
    return (
      <article className="help-article">
        <h2>Viewing Your Permissions</h2>
        <p>This section explains how to check your account permissions.</p>
        <ol>
          <li>Go to your account settings.</li>
          <li>Locate the &quot;Permissions&quot; section.</li>
          <li>View the list of permissions assigned to your account.</li>
          <li>If needed, request changes from an administrator.</li>
        </ol>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/T3qH-uY3t-Y"
            title="Viewing Your Permissions Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </article>
    );
  };
  
  export default ViewPermissions;
  