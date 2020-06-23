/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/tailwind.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faFacebook,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faAngleDoubleUp, faLightbulb } from "@fortawesome/free-solid-svg-icons"

library.add(
  faFacebook,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faGithub,
  faTwitter,
  faEnvelope,
  faAngleDoubleUp,
  faLightbulb
)
