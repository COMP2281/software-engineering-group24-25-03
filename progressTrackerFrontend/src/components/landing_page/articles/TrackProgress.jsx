const TrackProgress = () => {
  return (
    <article className="help-article">
      <h2>Tracking Progress</h2>
      <p>Follow these steps to monitor and track the progress of your projects.</p>
      <ol>
        <li>Go to the &quot;Report&quot; Section</li>
        <li>See metrics for different time frames and projects.</li>
        <li>Review the displayed charts and metrics to assess progress over time.</li>
      </ol>
      <div className="video-container">
      <video width="560" height="315" controls>
          <source src="http://127.0.0.1:8000/media/videos/Track_Progress.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </article>
  );
};

export default TrackProgress;
