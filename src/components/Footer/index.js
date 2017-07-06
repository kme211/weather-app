import React from "react";
import "./styles.css";
import Link from "../Link";
import Icon from "../Icon";

const Footer = () => (
  <footer>
    Created by <a href="https://kearieggers.com">Keari Eggers</a> with
    {" "}
    <Link href="https://github.com/facebookincubator/create-react-app" external>
      create-react-app
    </Link>
    . The source is on
    {" "}
    <Link href="https://github.com/kme211/weather-app" external>
      GitHub
    </Link>
    . Arrow icon by Alena Artemova from the
    {" "}
    <Link href="https://thenounproject.com/" external>
      Noun Project
    </Link>
    .
    <div className="footer__icons">
      <Link
        href="https://www.linkedin.com/in/keari"
        className="footer__social-link"
        external
      >
        <Icon className="footer__icon" icon="linked-in" />
      </Link>
      <Link
        href="https://github.com/kme211"
        className="footer__social-link"
        external
      >
        <Icon className="footer__icon" icon="github" />
      </Link>
      <Link
        href="https://codepen.io/kme211/"
        className="footer__social-link"
        external
      >
        <Icon className="footer__icon" icon="codepen" />
      </Link>
      <Link
        href="https://twitter.com/kearieggers"
        className="footer__social-link"
        external
      >
        <Icon className="footer__icon" icon="twitter" />
      </Link>
    </div>
  </footer>
);

export default Footer;
