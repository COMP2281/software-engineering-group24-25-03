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
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/T3qH-uY3t-Y"
          title="Creating a Project Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </article>
  );
};

export default CreateProject;
