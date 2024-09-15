import { Container } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <Container>
        
        
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="./img/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="./img/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="./img/twitter-icon.png" alt="Twitter" />
          </a>
        </div>

        <div className="contact-info">
          <p>Email: info@lessenza.com</p>
          <p>Teléfono: +34 123 456 789</p>
        </div>

       

        <img src="./img/tarjetasfooter.png" alt="Métodos de Pago" />
        <h6>
          Copyright L'ESSENZA - 2024. Todos los derechos reservados.
        </h6>
      </Container>
    </footer>
  )
}

export default Footer
