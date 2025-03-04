const EditProject = () => {
  return (
    <article className="help-article">
      <h2>Editing a Project</h2>
      <p>This section explains how to edit existing projects.</p>
      <ol>
        <li>Open your dashboard</li>
        <li>Select which project you would like to edit</li>
        <li>Update the project details in the displayed form.</li>
        <li>Review the information and click &quot;Submit&quot; to update the project.</li>
      </ol>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/T3qH-uY3t-Y"
          title="Creating a Project Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </article>
  );
};

export default EditProject;
