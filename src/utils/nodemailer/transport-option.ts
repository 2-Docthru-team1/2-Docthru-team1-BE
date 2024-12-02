import { googleMailPass } from '#configs/auth.config.js';

const transportOption = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'forCodeitFS2nd@gmail.com',
    pass: googleMailPass,
  },
};

export default transportOption;
