import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faAward,
  faBars,
  faBriefcase,
  faCode,
  faEnvelope,
  faMoon,
  faStream,
  faSun,
  faTimes,
  faUniversity
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { RecoilRoot } from "recoil";
import "./src/styles/global.css";

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
  faCode,
  faStream
);

export const wrapRootElement = ({ element }) => <RecoilRoot>{element}</RecoilRoot>;
