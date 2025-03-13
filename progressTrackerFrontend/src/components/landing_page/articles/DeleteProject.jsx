const DeleteProject = () => {
    return (
      <article className="help-article">
        <h2>Deleting a Project</h2>
        <p>This section explains how to delete an existing project.</p>
        <ol>
          <li>Go to the admin dashboard.</li>
          <li>Find the project you want to delete.</li>
          <li>Select &quot;Delete Project&quot;.</li>
          <li>The project will be permanently removed.</li>
        </ol>
        <div className="video-container">
        <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Delete_Task.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        </div>
      </article>
    );
  };
  
  export default DeleteProject;
  