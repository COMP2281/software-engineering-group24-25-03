const ManageTasks = () => {
  return (
    <article className="help-article">
      <h2>Managing Tasks</h2>
      <p>Follow these steps to manage the status of tasks.</p>
      <ol>
        <li>Go to the &quot;Task&quot; Section.</li>
        <li>Select A List.</li>
        <li>Select A Project.</li>
        <li>Create a Task with the plus button or click the status button and select the tasks status.</li>
      </ol>
      <div className="video-container">
      <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Manage_Task.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </article>
  );
};

export default ManageTasks;
