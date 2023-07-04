const CallToAction = () => {
  return (
    <section className="call-to-action">
      <div className="auto-container">
        <div className="outer-box" data-aos="fade-up">
          <div className="content-column">
            <div className="sec-title">
              <h2>Recruiting?</h2>
              <div className="text">
                Advertise your jobs to millions of monthly users and search 15.8
                million
                <br /> CVs in our database.
              </div>
              <a href="#" className="theme-btn btn-style-one bg-blue">
                <span className="btn-title">Start Recruiting Now</span>
              </a>
            </div>
          </div>
          {/* End .content-column */}

          <div
            className="image-column"
            style={{ backgroundImage: " url(https://source.unsplash.com/NMYG69BG_Jg)" }}
          >
            <figure className="image">
              <img src="https://source.unsplash.com/NMYG69BG_Jg" alt="resource" />
            </figure>
          </div>
          {/* End .image-column */}
        </div>
      </div>
    </section>
  );
};