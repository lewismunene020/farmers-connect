import React from "react";

const Contact = () => {
  return (
    <>
      <div id="content">
        <div className="container">
          <div className="col-md-12">
            <ul className="breadcrumb">
              <li>
                <a href="index.php">Home</a>
              </li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="col-md-3">{/* <IncludeSidebar /> */}</div>
          <div className="col-md-9">
            <div className="box">
              <div className="box-header">
                <center>
                  <h2>Contact Us</h2>
                  <p className="text-muted">
                    If you have any questions, feel free to contact us.
                  </p>
                </center>
                <form action="contact.php" method="post">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Your E-mail"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Message.."
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      name="submit"
                    >
                      <i className="fa fa-user-md"></i> Send Message
                    </button>
                  </div>
                </form>
                {/* <PHPMailHandling /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
