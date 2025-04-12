import whatsappService from './whatsappService.js';
 
 class MessageHandler {
   async handleIncomingMessage(message, senderInfo) {
     if (message?.type === 'text') {
       const incomingMessage= message.text.body.toLowerCase().trim();


       if(this.isGreeting(incomingMessage)){
         await this.sendWelcomeMessage(message.from, message.id,senderInfo)
         await this.sendWelcomeMenu(message.from);
        }else {
         const response = `Echo: ${message.text.body}`;
         await whatsappService.sendMessage(message.from, response, message.id);
      }
       await whatsappService.markAsRead(message.id);
      }else if(message?.type ==='interactive'){
        const option= message?.interactive?.buttom_reply?.tittle.toLowerCase().trim();
        await this.handleMenuOption(message.from,option);
        await whatsappService.markAsRead(message.id);
      }
     }

    isGreeting(message){
      const greetings= ["hola","hello","buenas"];
      return greetings.includes(message);
    }

    getSenderName(senderInfo){
      return senderInfo.profile?.name || senderInfo.wa_id  || "Yohisy Alejandra Revette";
    }
    async sendWelcomeMessage(to,messageId,senderInfo){
      const name= this.getSenderName(senderInfo);
      const welcomeMessage=`Hola ${name}, Bienvenido a nuestro servicio de Inmobiliaria YoYo En que podemos ayudarle hoy?`;
      await whatsappService.sendMessage(to,welcomeMessage,messageId);
    }
    async handleMenuOption(to, option){
      let response;
      switch(option){
        case 'agendar':
          response ='Agendar Cita'
          break
        case 'traspaso':
          response ='Ubicaciones de Traspasos '
          break
        case 'venta':
          response ='Ubicaciones de Alquileres/Ventas'
          break
        default:
          response="Lo siento, no entendi tu seleccion"
      }
      await whatsappService.sendMessage(to,response);
    }
    async sendWelcomeMenu(to){
      const menuMessage = "Elija una Opcion"
      const buttons = [
        {
          type:'reply',reply:{id:'option_1', tittle:'Agendar'}
        },
        {
          type:'reply',reply:{id:'option_2', tittle:'Traspasos'}
        
        },
        {
          type:'reply',reply:{id:'option_3', tittle:'Ventas'}
        
        }
      ];
      await whatsappService.sendInteractiveButtons(to,menuMessage,buttons);
    }
   }
 
 
 export default new MessageHandler();
