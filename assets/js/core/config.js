/** Site-wide personal details. Single place to edit contact info. */
export const CONFIG = Object.freeze({
  name: 'Desmond Nadela',
  email: 'ryelnadela@gmail.com',
  phone: '+639453191694',
  whatsappNumber: '639453191694',
  github: 'rayeruuu',
  linkedin: 'https://www.linkedin.com/in/desmond-nadela',
  availability: 'Available for internship / freelance',
  photo: 'assets/images/picture.png',
});

/** @returns {string} A wa.me link carrying a prefilled greeting. */
export function whatsappLink() {
  const digits = CONFIG.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi Desmond! I found your portfolio and would love to connect.",
  );
  return `https://wa.me/${digits}?text=${text}`;
}
