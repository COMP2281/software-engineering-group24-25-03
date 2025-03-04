const ManageTasks = () => {
  return (
    <article className="help-article">
      <h2>Managing Tasks</h2>
      <p>Learn how to efficiently manage tasks within your projects.</p>
      <ol>
        <li>Select the project you wish to manage.</li>
        <li>In the panel, assign staff, change project status and create announcements.</li>
      </ol>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/T3qH-uY3t-Y"
          title="Managing Tasks Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </article>
  );
};

export default ManageTasks;
