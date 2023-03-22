import sgMail from '@sendgrid/mail';
import { APP_HOST_EMAIL, SENDGRID_API } from '../constants';

sgMail.setApiKey(SENDGRID_API);

const sendMail = async (email, subject, text, html) => {
    try{
        const msg = {
            to: email, // Change to your recipient
            from: APP_HOST_EMAIL, // Change to your verified sender
            subject,
            text,
            html,
          };
          
          await sgMail.send(msg);
            console.log("Mail sent");
    }catch (err){
        console.log(err.message);
    }finally{
        return ;
    }
};

export default sendMail;