// 1. Configuración de conexión
const supabaseUrl = 'https://xhsvauqkfdwcpschfahm.supabase.co';
const supabaseKey = 'sb_publishable_jk-hGiPlqZ8pkcIYPihaWw_Gg68VZpX'; // La que empieza por sb_publishable

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Función para enviar mensaje desde el chat del cliente
async function enviarMensajeCliente() {
    const input = document.getElementById('chatInput');
    const mensaje = input.value;

    if (!mensaje) return;

    const { error } = await _supabase
        .from('mensajes')
        .insert([
            { 
                cliente_id: 'ID_UNICO_DEL_CLIENTE', // Puedes usar un email o nombre
                contenido: mensaje, 
                es_admin: false 
            }
        ]);

    if (error) {
        console.error('Error al enviar:', error);
    } else {
        input.value = '';
        console.log('Mensaje enviado con éxito');
    }
}