import { useState } from "react";
import "./Home.css";

const contactApiUrl =
  import.meta.env.VITE_CONTACT_API_URL || "https://clientwebpage.onrender.com/api/contact";
import Navbar from "../Navbar/Navbar.jsx";

const services = [
  {
    title: "Normal Website",
    text: "Low-cost static pages for shops, portfolios, landing pages, and simple business websites.",
  },
  {
    title: "Frontend + Backend",
    text: "React frontend, backend API, database connection, authentication, forms, and admin features.",
  },
  {
    title: "Deployment Support",
    text: "Domain setup, hosting, production deployment, SSL, and post-launch fixes as a separate service.",
  },
];

const projects = [
  "Business landing page",
  "Registration system",
  "Portfolio website",
  "Admin dashboard",
];

const packages = [
  {
    name: "Normal Website",
    price: "From ₹4,999",
    detail: "Best for one-page websites, personal pages, shops, and basic lead pages.",
  },
  {
    name: "Frontend + Backend",
    price: "From ₹14,999",
    detail: "Best for apps that need login, database, APIs, admin panel, or dynamic content.",
  },
  {
    name: "Deployment",
    price: "Separate Charge",
    detail: "Hosting, domain connection, SSL setup, production deploy, and support billed separately.",
  },
];

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    projectNeed: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.projectNeed) {
      setFormStatus("Please enter your name, email, and project need.");
      return;
    }

    setIsSending(true);
    setFormStatus("Sending your enquiry...");

    try {
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : {
            message:
              "Contact API returned a webpage instead of JSON. Check VITE_CONTACT_API_URL and backend deployment.",
          };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send enquiry.");
      }

      setFormData({
        name: "",
        email: "",
        businessType: "",
        projectNeed: "",
      });
      setFormStatus("Thank you. Your enquiry was sent successfully.");
    } catch (error) {
      setFormStatus(
        error.message ||
          "The message could not be sent right now. Please try again later."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
    <Navbar />
    <main className="home" id="home">
      <section className="hero-section">
        <div className="hero-content">
          <p className="section-tag">Frontend + Backend development</p>
          <h1>Affordable websites that help small businesses get leads.</h1>
          <p className="hero-text">
            I build normal websites at a lower cost, and complete frontend plus
            backend systems for businesses that need databases, login, APIs,
            admin panels, and automation.
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href="#contact">
              Request a Quote
            </a>
            <a className="secondary-btn" href="#pricing">
              View Pricing
            </a>
          </div>

          <div className="trust-row" aria-label="Business highlights">
            <div>
              <strong>Low Cost</strong>
              <span>Normal websites</span>
            </div>
            <div>
              <strong>Full Stack</strong>
              <span>Frontend and backend</span>
            </div>
            <div>
              <strong>Deploy</strong>
              <span>Separate support</span>
            </div>
          </div>
        </div>

        <aside className="lead-card" aria-label="Lead generation preview">
          <div className="lead-card-header">
            <span>New Project Lead</span>
            <strong>Ready</strong>
          </div>
          <div className="lead-preview">
            <p>Website + backend enquiry</p>
            <h2>Turn visitors into customers</h2>
          </div>
          <div className="lead-list">
            <span>Normal website from ₹4,999</span>
            <span>Full stack from ₹14,999</span>
            <span>Deployment charged separately</span>
            <span>Email enquiry support</span>
          </div>
        </aside>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <p className="section-tag">What I create</p>
          <h2>Complete web solutions based on your budget</h2>
        </div>

        <div className="card-grid">
          {services.map((service) => (
            <article className="info-card" key={service.title}>
              <span className="card-line" />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="section-tag">Portfolio direction</p>
          <h2>Project types you can show to clients</h2>
        </div>

        <div className="work-list">
          {projects.map((project) => (
            <div className="work-item" key={project}>
              <span />
              <p>{project}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-heading">
          <p className="section-tag">Simple pricing</p>
          <h2>Clear package pricing for client enquiries</h2>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card" key={item.name}>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="section-tag">Start your website</p>
          <h2>Send your project details and get a low-cost plan.</h2>
          <p>
            The form sends the client details directly to your email through the
            backend contact API. No email app opens for the client.
          </p>
        </div>

        <form className="contact-form" onSubmit={submitEnquiry}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={updateField}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="client@example.com"
              value={formData.email}
              onChange={updateField}
            />
          </label>
          <label>
            Business Type
            <input
              type="text"
              name="businessType"
              placeholder="Shop, service, startup..."
              value={formData.businessType}
              onChange={updateField}
            />
          </label>
          <label>
            Project Need
            <textarea
              name="projectNeed"
              placeholder="Normal website, full backend, deployment, or custom work"
              value={formData.projectNeed}
              onChange={updateField}
            />
          </label>
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Enquiry"}
          </button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>
    </main>
    </>
  );
}

export default Home;
