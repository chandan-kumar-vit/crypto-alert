import React from 'react'

const About = () => {
    return (
        <div className="container my-5">
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <strong>About Project</strong>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p style={{ textAlign: 'left' }}>
                                <strong>Why to use?</strong><br />
                                This web-app can be helpful for i) getting the current prices and other important details of various crypto-currencies,
                                ii) We can also set an alert for a range of price for the currency of the choice. The user will recieve a notification
                                via mail if the price falls between the range.
                            </p>
                            <p style={{ textAlign: 'left' }}>
                                <strong>Technologies Used</strong><br />
                                Back-end:
                                <ul>
                                    <li>Nodejs</li>
                                    <li>MongoDB</li>
                                    <li>JWT Token for authentication</li>
                                    <li>Bcrypt library for safely storing the sensitive information in DB</li>
                                </ul>
                                Front-end:
                                <ul>
                                    <li>ReactJS</li>
                                    <li>BootStrap for styling</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <strong>About Developer</strong>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p style={{ textAlign: 'left' }}>
                                Hey!
                                First of all thanks for visiting this plateform and especially this page. Let me give my breif introduction, I am
                                Chandan and I am pursuing my B.Tech degree in Computer Science Engineering from Vellore Institute of Technology and
                                currently I am in my final year.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About
