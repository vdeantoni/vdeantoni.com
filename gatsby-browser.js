import React from "react";
import "./src/styles/global.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faAward,
  faBars,
  faBriefcase,
  faEnvelope,
  faMoon,
  faSun,
  faTimes,
  faUniversity,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { RecoilRoot } from "recoil";

library.add(
  faFacebook,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faGithub,
  faTwitter,
  faEnvelope,
  faArrowRight,
  faSun,
  faMoon,
  faBars,
  faTimes,
  faBriefcase,
  faUniversity,
  faAward,
  faCode
);

export const wrapRootElement = ({ element }) => <RecoilRoot>{element}</RecoilRoot>;
