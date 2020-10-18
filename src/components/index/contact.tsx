import React from 'react'
import IconTwitter from '../../assets/icons/i-twitter';
import IconEnvelope from '../../assets/icons/i-envelope';

const Contact = () => (
  <div id="contact">
    <h2>Contact me for any type of query or discussion!</h2>
    <p>
      <IconEnvelope />
      <a href="mailto:ossi@ossipesonen.fi">ossi@ossipesonen.fi</a>
    </p>
    <p>
      <IconTwitter />
      <a href="https://twitter.com/OssiDev" target="_blank" rel="noopener">@OssiDev</a>
    </p>
  </div>
)

export default Contact;
