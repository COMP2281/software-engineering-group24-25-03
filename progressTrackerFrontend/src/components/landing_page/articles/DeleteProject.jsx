const DeleteProject = () => {
    return (
      <article className="help-article">
        <h2>Deleting a Project</h2>
        <p>This section explains how to delete an existing project.</p>
        <ol>
          <li>Go to your dashboard.</li>
          <li>Find the project you want to delete.</li>
          <li>Click on the project settings.</li>
          <li>Select &quot;Delete Project&quot;.</li>
          <li>Type the name of the project for confirmation.</li>
          <li>The project will be permanently removed.</li>
        </ol>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/T3qH-uY3t-Y"
            title="Deleting a Project Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </article>
    );
  };
  
  export default DeleteProject;
  