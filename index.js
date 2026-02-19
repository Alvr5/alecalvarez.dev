const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Función que se dispara al crear un mensaje
exports.notificarNuevoMensaje = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (snap, context) => {
    const mensaje = snap.data();
    const chatId = context.params.chatId;

    // Traer los miembros del chat
    const chatDoc = await db.collection("chats").doc(chatId).get();
    const chat = chatDoc.data();
    const miembros = chat.members || [];

    // Obtener tokens de los miembros (excepto el que envió el mensaje)
    const tokens = [];
    for (const uid of miembros) {
      if (uid === mensaje.userId) continue;
      const userDoc = await db.collection("users").doc(uid).get();
      if (userDoc.exists && userDoc.data().fcmToken) {
        tokens.push(userDoc.data().fcmToken);
      }
    }

    if (tokens.length === 0) return null;

    // Enviar notificación
    return admin.messaging().sendMulticast({
      tokens,
      notification: {
        title: "💬 Nuevo mensaje",
        body: `${mensaje.userEmail}: ${mensaje.text}`,
      },
      data: {
        chatId,
      },
    });
  });
