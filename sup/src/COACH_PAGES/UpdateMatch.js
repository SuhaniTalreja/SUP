import Footer from '../PAGES/Footer';
import styled from "styled-components";
import NavBarCoach from './NavBarCoach';

function UpdateMatch() {
  const cards = Array.from({ length: 6 }, (_, i) => ({
    title: `Beginner ${i + 1}`,
    price: "Free",
    desc: "Etiam ac convallis enim, eget euismod dolor.",
    features: ["Aenean quis", "Morbi semper", "Tristique enim nec"],
  }));

  return (
    <StyledPage>
      <div className="home-container">
        {/* Navbar Section */}
        <NavBarCoach />

        {/* Heading */}
        <h1 className="heading">Update Matches</h1>

        {/* Cards Section */}
        <StyledWrapper>
          <div className="cards-container">
            {cards.map((card, index) => (
              <div className="card" key={index}>
                <div className="header">
                  <span className="title">{card.title}</span>
                  <span className="price">{card.price}</span>
                </div>
                <p className="desc">{card.desc}</p>
                <ul className="lists">
                  {card.features.map((feature, i) => (
                    <li className="list" key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="action">
                  Close the registration
                </button>
                <button type="button" className="action">
                  Declare winners
                </button>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <Footer />
        </StyledWrapper>
      </div>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  /* Add repeating doodle background */
  background-image: url("/doodle.jpg"); /* Replace with your correct image path */
  background-repeat: repeat; /* Repeat the image */
  background-size: auto; /* Use the original size of the image */
  background-position: top left; /* Start the repeat from the top left */
  display: flex;
  flex-direction: column;
`;

const StyledWrapper = styled.div`
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;
  }

  .card {
    width: 320px;
    border-radius: 0.25rem;
    background-color: #173b61;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #ffebd0;
  }

  .price {
    font-size: 3.75rem;
    line-height: 1;
    font-weight: 700;
    color: #ffebd0;
  }

  .desc {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.625;
    color: rgba(156, 163, 175, 1);
  }

  .lists {
    margin-bottom: 1.5rem;
    flex: 1 1 0%;
    color: rgba(156, 163, 175, 1);
  }

  .lists .list {
    margin-bottom: 0.5rem;
    display: flex;
    margin-left: 0.5rem;
  }

  .lists .list svg {
    height: 1.5rem;
    width: 1.5rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
    color: #fd8916;
  }

  .action {
    border: none;
    outline: none;
    display: inline-block;
    border-radius: 0.25rem;
    background-color: #fd8916;
    padding: 0.75rem 1.25rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #173b61;
    margin-bottom: 1rem; /* Added space between buttons */
  }
  .action:hover {
    background: #e07712;
  }

  .navbar {
    background-color: #173b61;
    color: #ffffff;
    padding: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .heading {
    display: flex;
    justify-content: center; 
    align-items: center;
    font-size: 2rem;
    margin: 2rem 0;
    color: #173b61;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .cards-container {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    .card {
      width: 70%;
    }

    .heading {
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    .navbar {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%;
      padding: 1rem;
    }

    .title {
      font-size: 1.25rem;
    }

    .price {
      font-size: 2.5rem;
    }

    .action {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .navbar {
      padding: 0.75rem;
    }
  }
`;

export default UpdateMatch;
