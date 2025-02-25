const TrackProgress = () => {
  return (
    <article className="help-article">
      <h2>Tracking Progress</h2>
      <p>Follow these steps to monitor and track the progress of your projects.</p>
      <ol>
        <li>Go to the &quot;Progress&quot; section from the main menu.</li>
        <li>Select the project you want to track.</li>
        <li>Review the displayed charts and metrics to assess progress over time.</li>
      </ol>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/T3qH-uY3t-Y"
          title="Tracking Progress Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </article>
  );
};

export default TrackProgress;
