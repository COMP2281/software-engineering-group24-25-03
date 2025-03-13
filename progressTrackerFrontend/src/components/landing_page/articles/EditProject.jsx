const EditProject = () => {
  return (
    <article className="help-article">
      <h2>Editing a Project</h2>
      <p>This section explains how to edit existing projects.</p>
      <ol>
        <li>Go to the admin dashboard.</li>
        <li>Select which project you would like to edit</li>
        <li>Update the project details in the displayed form.</li>
        <li>Review the information and click &quot;Submit&quot; to update the project.</li>
      </ol>
      <div className="video-container">
      <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Edit_Task.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </article>
  );
};

export default EditProject;
