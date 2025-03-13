const CreateProject = () => {
  return (
    <article className="help-article">
      <h2>Creating a Project</h2>
      <p>This section explains how to create a new project.</p>
      <ol>
        <li>Open your dashboard</li>
        <li>Select &quot;New Project&quot;</li>
        <li>Fill in the project details in the displayed form.</li>
        <li>Review the information and click &quot;Submit&quot; to create the project.</li>
        <li>The project will now be visible in your dashboard.</li>
      </ol>
      <div className="video-container">
        <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Create_Task.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </article>
  );
};

export default CreateProject;
