import mailgen from "mailgen"

const sendEmail = async(options) =>{
   const mailGenerator=  new Mailgen({
        theme:"default",
        product:{
            name:"task Manager",
            link:"https://taskmanagelink.com"
        }
    })
    const emailtextual = mailGenerator.generatePlainText(options.mailgenContent)

    const emailHTML = mailGenerator.generate(options.mailgenContent)

    const Transporter = nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port:process.nextTick.MAILTRAP_SMTP_PASS,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS
        }
    })


    const mail = {
        from:"aniketsinghn10@gmail.com",
        to:"aniketsinghn10@gmail.com",
        text:emailtextual,
        html:emailHTML
    }
    try{
        await Transporter.sendMail(mail)
    }catch(error){
        console.error("Email Service Failed silently , make sure you have provided your mailtrap credentials in the .env file"
            
        )
        console.error("Error")
    }
    

}

const emailVerificationMailgenContent = (username , verificationUrl) =>{
    return{
        body:{
            name:username,
            intro: "Welcome To Our Project Management Website ! We Are Excited  to have you on board.",
            action:{
                instructions:"To verify your email please click on this button",
                button:{
                    color:"#22BC66",
                    text:"Verify your email",
                    link :verificationUrl
                },

            },
            outro:
            "Neeed Help , or have questions Dont Message Me"
        }
    }
}

const forgotpasswordMailgenContent = (username , passwordResetUrl) =>{
    return{
        body:{
            name:username,
            intro: "Request To Reset Your Password for Project Management tool",
            action:{
                instructions:"To reset password click on this button",
                button:{
                    color:"#22BC66",
                    text:"Reset password",
                    link :   passwordResetUrl

                },

            },
            outro:
            "Neeed Help , or have questions Dont Message Me"
        }
    }
}